export type AdminRole = "super_admin" | "admin" | "operator" | "viewer";

export interface Admin {
  id: string;
  auth_id: string | null;
  email: string;
  full_name: string;
  role: AdminRole;
  avatar_url: string | null;
  phone: string | null;
  department: string | null;
  is_active: boolean;
  last_login_at: string | null;
  login_count: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityLogEntry {
  id: string;
  admin_id: string | null;
  admin_name: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  entity_label: string | null;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}
