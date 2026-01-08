import { createClient } from "../server"
import type { Testimony } from "@/lib/types/database"

export async function getTestimonies() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("testimonies")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return data as Testimony[]
}


