import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await requireRole(["admin"])

    const supabase = await createClient()
    const { error } = await supabase
      .from("testimonies")
      .update({ status: "approved", updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to approve testimony" }, { status: 500 })
    }

    return NextResponse.redirect(new URL("/admin/testimonies", request.url))
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

