import { redirect } from "next/navigation"
import { requireAuth } from "@/lib/supabase/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { headers } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the pathname from headers (set by middleware)
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  
  // If we're on the login page, skip auth check and don't render sidebar
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return <>{children}</>
  }

  // For all other admin routes, require authentication
  try {
    await requireAuth()
  } catch {
    redirect("/admin/login")
  }

  // If authenticated, render the full admin layout with sidebar
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}


