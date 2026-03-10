import { supabase } from "./supabase";

export interface Profile {
  id: string;
  name: string;
  goal: string;
  income_range: string;
  bank_connected: boolean;
  onboarding_complete: boolean;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function upsertProfile(
  profile: Partial<Profile> & { id: string }
) {
  await supabase.from("profiles").upsert(profile);
}
