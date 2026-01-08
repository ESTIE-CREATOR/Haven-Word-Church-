import { createClient } from "../server"
import type { Event } from "@/lib/types/database"

export async function getEvents() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_date_time", new Date().toISOString())
    .order("start_date_time", { ascending: true })

  if (error) {
    throw error
  }

  return data as Event[]
}

export async function getEventBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    throw error
  }

  return data as Event
}


