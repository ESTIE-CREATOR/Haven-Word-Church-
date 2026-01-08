import { createClient } from "../server"
import type { Audio } from "@/lib/types/database"

export async function getAudioMessages(featured?: boolean) {
  const supabase = await createClient()
  
  let query = supabase
    .from("audio")
    .select("*")
    .order("date", { ascending: false })

  if (featured !== undefined) {
    query = query.eq("featured", featured)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data as Audio[]
}

export async function getAudioBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("audio")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    throw error
  }

  return data as Audio
}

export async function getFeaturedAudio(limit: number = 3) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("audio")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return data as Audio[]
}


