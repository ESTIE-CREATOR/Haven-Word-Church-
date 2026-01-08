import { createClient } from "../server"
import type { Branch } from "@/lib/types/database"

export async function getBranches() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    throw error
  }

  return data as Branch[]
}

export async function getBranchBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("branches")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    throw error
  }

  return data as Branch
}


