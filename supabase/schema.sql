-- ============================================
-- EDP COURIER — COMPLETE DATABASE SCHEMA
-- Run this entire block in your Supabase SQL Editor
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ENUMERATIONS

CREATE TYPE shipment_status AS ENUM (
  'shipment_created',
  'package_collected',
  'received_at_origin_facility',
  'quality_inspection',
  'sorting_facility',
  'awaiting_dispatch',
  'departed_origin_hub',
  'in_transit',
  'international_transit',
  'customs_clearance',
  'arrived_at_destination_country',
  'destination_processing_center',
  'out_for_delivery',
  'delivery_attempted',
  'delivered_successfully',
  'returned_to_sender',
  'shipment_closed'
);

CREATE TYPE package_type AS ENUM (
  'document', 'parcel', 'fragile', 'freight',
  'pallet', 'oversized', 'liquid', 'perishable',
  'electronics', 'medical'
);

CREATE TYPE shipping_method AS ENUM (
  'economy', 'standard', 'express',
  'overnight', 'same_day', 'freight', 'charter'
);

CREATE TYPE priority_level AS ENUM (
  'low', 'normal', 'high', 'critical', 'emergency'
);

CREATE TYPE admin_role AS ENUM (
  'super_admin', 'admin', 'operator', 'viewer'
);

CREATE TYPE payment_status AS ENUM (
  'unpaid', 'pending', 'paid', 'refunded', 'waived'
);

-- ADMINS TABLE

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'operator',
  avatar_url TEXT,
  phone TEXT,
  department TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRACKING SEQUENCE COUNTER

CREATE TABLE tracking_sequence_counter (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER,
  last_sequence BIGINT NOT NULL DEFAULT 0
);

INSERT INTO tracking_sequence_counter (id, year, last_sequence)
VALUES (1, 2026, 0)
ON CONFLICT DO NOTHING;

-- TRACKING ID GENERATOR FUNCTION

CREATE OR REPLACE FUNCTION generate_tracking_id()
RETURNS TEXT AS $$
DECLARE
  current_year INTEGER := EXTRACT(YEAR FROM NOW())::INTEGER;
  next_seq BIGINT;
BEGIN
  INSERT INTO tracking_sequence_counter (id, year, last_sequence)
  VALUES (1, current_year, 1)
  ON CONFLICT (id) DO UPDATE
    SET
      last_sequence = CASE
        WHEN tracking_sequence_counter.year = current_year
        THEN tracking_sequence_counter.last_sequence + 1
        ELSE 1
      END,
      year = current_year
  RETURNING last_sequence INTO next_seq;
  RETURN 'EDP-' || current_year::TEXT || '-' || LPAD(next_seq::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- SHIPMENTS TABLE

CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_id TEXT UNIQUE NOT NULL DEFAULT '',
  sender_name TEXT NOT NULL,
  sender_phone TEXT,
  sender_email TEXT,
  sender_address TEXT,
  sender_postal_code TEXT,
  origin_country TEXT NOT NULL,
  origin_country_code TEXT,
  origin_state TEXT,
  origin_city TEXT,
  receiver_name TEXT NOT NULL,
  receiver_phone TEXT,
  receiver_email TEXT,
  receiver_address TEXT,
  receiver_postal_code TEXT,
  destination_country TEXT NOT NULL,
  destination_country_code TEXT,
  destination_state TEXT,
  destination_city TEXT,
  package_type package_type NOT NULL DEFAULT 'parcel',
  package_description TEXT,
  weight_kg NUMERIC(10,3),
  length_cm NUMERIC(8,2),
  width_cm NUMERIC(8,2),
  height_cm NUMERIC(8,2),
  declared_value NUMERIC(12,2),
  currency TEXT DEFAULT 'USD',
  item_count INTEGER DEFAULT 1,
  shipping_method shipping_method NOT NULL DEFAULT 'standard',
  priority_level priority_level NOT NULL DEFAULT 'normal',
  insurance_enabled BOOLEAN DEFAULT FALSE,
  insurance_value NUMERIC(12,2),
  payment_status payment_status DEFAULT 'unpaid',
  shipping_fee NUMERIC(10,2),
  current_location TEXT,
  current_latitude NUMERIC(10,7),
  current_longitude NUMERIC(10,7),
  current_status shipment_status NOT NULL DEFAULT 'shipment_created',
  expected_delivery_date DATE,
  actual_delivery_date TIMESTAMPTZ,
  delivery_signature TEXT,
  delivery_photo_url TEXT,
  special_instructions TEXT,
  internal_notes TEXT,
  public_notes TEXT,
  created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  last_updated_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUTO-ASSIGN TRACKING ID TRIGGER

CREATE OR REPLACE FUNCTION trg_fn_assign_tracking_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tracking_id := generate_tracking_id();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_assign_tracking_id
BEFORE INSERT ON shipments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_assign_tracking_id();

-- AUTO-UPDATE updated_at TRIGGER

CREATE OR REPLACE FUNCTION trg_fn_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_shipments_timestamp
BEFORE UPDATE ON shipments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_update_timestamp();

-- SHIPMENT TIMELINE TABLE

CREATE TABLE shipment_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status shipment_status NOT NULL,
  location TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  note TEXT,
  internal_note TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUTO-CREATE FIRST TIMELINE EVENT ON SHIPMENT INSERT

CREATE OR REPLACE FUNCTION trg_fn_initial_timeline()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO shipment_timeline (
    shipment_id, status, location, note, is_public, created_by
  ) VALUES (
    NEW.id,
    'shipment_created',
    COALESCE(NEW.origin_city, '') ||
    CASE WHEN NEW.origin_city IS NOT NULL AND NEW.origin_country IS NOT NULL
    THEN ', ' ELSE '' END ||
    COALESCE(NEW.origin_country, ''),
    'Shipment has been created and registered in the EDP Courier system. Your tracking number is ' || NEW.tracking_id || '.',
    TRUE,
    NEW.created_by
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_initial_timeline
AFTER INSERT ON shipments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_initial_timeline();

-- AUTO-LOG STATUS CHANGES TO TIMELINE

CREATE OR REPLACE FUNCTION trg_fn_log_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.current_status IS DISTINCT FROM NEW.current_status THEN
    INSERT INTO shipment_timeline (
      shipment_id, status, location, latitude, longitude,
      note, is_public, created_by
    ) VALUES (
      NEW.id,
      NEW.current_status,
      NEW.current_location,
      NEW.current_latitude,
      NEW.current_longitude,
      NEW.public_notes,
      TRUE,
      NEW.last_updated_by
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_status_change
AFTER UPDATE ON shipments
FOR EACH ROW
EXECUTE FUNCTION trg_fn_log_status_change();

-- ACTIVITY LOGS TABLE

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  admin_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  entity_label TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRACKING SESSIONS TABLE

CREATE TABLE tracking_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_id TEXT NOT NULL,
  ip_address TEXT,
  country_code TEXT,
  user_agent TEXT,
  language TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PERFORMANCE INDEXES

CREATE UNIQUE INDEX idx_shipments_tracking_id ON shipments(tracking_id);
CREATE INDEX idx_shipments_status ON shipments(current_status);
CREATE INDEX idx_shipments_created_at ON shipments(created_at DESC);
CREATE INDEX idx_shipments_receiver ON shipments USING gin (receiver_name gin_trgm_ops);
CREATE INDEX idx_shipments_sender ON shipments USING gin (sender_name gin_trgm_ops);
CREATE INDEX idx_shipments_dest_country ON shipments(destination_country_code);
CREATE INDEX idx_timeline_shipment ON shipment_timeline(shipment_id, created_at DESC);
CREATE INDEX idx_timeline_public ON shipment_timeline(is_public);
CREATE INDEX idx_activity_admin ON activity_logs(admin_id, created_at DESC);
CREATE INDEX idx_tracking_sessions ON tracking_sessions(tracking_id);

-- ROW LEVEL SECURITY

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_shipments" ON shipments
  FOR SELECT USING (TRUE);

CREATE POLICY "public_read_timeline" ON shipment_timeline
  FOR SELECT USING (is_public = TRUE);

CREATE POLICY "admin_all_shipments" ON shipments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE auth_id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "admin_all_timeline" ON shipment_timeline
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE auth_id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "admin_read_own_profile" ON admins
  FOR SELECT USING (
    auth_id = auth.uid()
    OR EXISTS (SELECT 1 FROM admins WHERE auth_id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "admin_update_own_profile" ON admins
  FOR UPDATE USING (auth_id = auth.uid());

CREATE POLICY "admin_read_activity" ON activity_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE auth_id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "public_insert_tracking_sessions" ON tracking_sessions
  FOR INSERT WITH CHECK (TRUE);

-- MATERIALIZED VIEW FOR DASHBOARD STATS

CREATE MATERIALIZED VIEW dashboard_stats AS
SELECT
  COUNT(*) AS total_shipments,
  COUNT(*) FILTER (
    WHERE current_status NOT IN ('delivered_successfully','shipment_closed','returned_to_sender')
  ) AS active_shipments,
  COUNT(*) FILTER (WHERE current_status = 'delivered_successfully') AS total_delivered,
  COUNT(*) FILTER (WHERE current_status = 'out_for_delivery') AS out_for_delivery,
  COUNT(*) FILTER (WHERE current_status IN ('shipment_created','package_collected')) AS pending,
  COUNT(*) FILTER (WHERE current_status = 'returned_to_sender') AS returned,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') AS created_today,
  COUNT(*) FILTER (
    WHERE current_status = 'delivered_successfully'
    AND actual_delivery_date >= NOW() - INTERVAL '24 hours'
  ) AS delivered_today,
  COUNT(DISTINCT destination_country_code) AS countries_served,
  ROUND(
    COUNT(*) FILTER (WHERE current_status = 'delivered_successfully') * 100.0
    / NULLIF(COUNT(*), 0), 1
  ) AS delivery_success_rate
FROM shipments;

CREATE UNIQUE INDEX ON dashboard_stats ((1));

CREATE OR REPLACE FUNCTION refresh_dashboard_stats()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_refresh_stats
AFTER INSERT OR UPDATE OR DELETE ON shipments
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_dashboard_stats();

-- After running this SQL, go to Supabase Authentication settings,
-- disable public signups, and create your first admin user manually
-- through the Supabase Auth dashboard. Then insert their record into
-- the admins table like this:
-- INSERT INTO admins (auth_id, email, full_name, role)
-- VALUES ('paste-the-auth-user-uuid-here', 'admin@yourdomain.com', 'Your Name', 'super_admin');
