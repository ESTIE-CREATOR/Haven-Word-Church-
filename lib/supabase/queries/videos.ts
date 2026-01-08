import { createClient } from "../server"
import type { Video } from "@/lib/types/database"

export async function getVideos(featured?: boolean) {
  const supabase = await createClient()
  
  let query = supabase
    .from("videos")
    .select("*")
    .order("preached_at", { ascending: false })

  if (featured !== undefined) {
    query = query.eq("featured", featured)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data as Video[]
}

export async function getVideoById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }

  return data as Video
}

export async function getFeaturedVideos(limit: number = 3) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("featured", true)
    .order("preached_at", { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return data as Video[]
}


