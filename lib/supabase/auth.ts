import { createClient } from "./server"
import type { UserRole } from "@/lib/types/database"

export async function getUserRole(): Promise<UserRole | null> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single()

  if (error || !data) {
    return null
  }

  return data.role as UserRole
}

export async function requireAuth() {
  const supabase = await createClient()
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("Unauthorized")
  }

  return user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const role = await getUserRole()
  
  if (!role || !allowedRoles.includes(role)) {
    throw new Error("Forbidden")
  }

  return role
}


