"use server";

import { createClient } from "@/lib/supabase/server";
import type { LoginInput } from "@/lib/utils/validators";

export async function loginAdmin(input: LoginInput) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) return { success: false as const, message: error.message };
  return { success: true as const, session: data.session };
}

export async function logoutAdmin() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getCurrentAdminEmail(): Promise<string | null> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.email ?? null;
}
