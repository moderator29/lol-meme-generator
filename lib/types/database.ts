import type { Shipment, ShipmentTimelineEvent, DashboardStats } from "./shipment";
import type { Admin, ActivityLogEntry } from "./admin";

// Mapped types flatten interfaces into plain object types so they
// structurally satisfy postgrest-js's Record<string, unknown> constraint.
type Flatten<T> = { [K in keyof T]: T[K] };

type TableDef<Row, Insert, Update> = {
  Row: Flatten<Row>;
  Insert: Flatten<Insert>;
  Update: Flatten<Update>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      shipments: TableDef<
        Shipment,
        Partial<Shipment> & Pick<Shipment, "sender_name" | "receiver_name" | "origin_country" | "destination_country">,
        Partial<Shipment>
      >;
      shipment_timeline: TableDef<
        ShipmentTimelineEvent,
        Partial<ShipmentTimelineEvent> & Pick<ShipmentTimelineEvent, "shipment_id" | "status">,
        Partial<ShipmentTimelineEvent>
      >;
      admins: TableDef<
        Admin,
        Partial<Admin> & Pick<Admin, "email" | "full_name">,
        Partial<Admin>
      >;
      activity_logs: TableDef<
        ActivityLogEntry,
        Partial<ActivityLogEntry> & Pick<ActivityLogEntry, "action">,
        Partial<ActivityLogEntry>
      >;
      tracking_sessions: TableDef<
        {
          id: string;
          tracking_id: string;
          ip_address: string | null;
          country_code: string | null;
          user_agent: string | null;
          language: string | null;
          created_at: string;
        },
        {
          tracking_id: string;
          ip_address?: string | null;
          country_code?: string | null;
          user_agent?: string | null;
          language?: string | null;
        },
        Partial<{
          tracking_id: string;
          ip_address: string | null;
          country_code: string | null;
          user_agent: string | null;
          language: string | null;
        }>
      >;
    };
    Views: {
      dashboard_stats: {
        Row: Flatten<DashboardStats>;
        Relationships: [];
      };
    };
    Functions: {
      generate_tracking_id: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
