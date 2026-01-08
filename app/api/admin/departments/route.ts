import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin"])

    const body = await request.json()
    const { name, slug, short_description, long_description, contact_email } = body

    const supabase = await createClient()

    const { error } = await supabase.from("departments").insert({
      name,
      slug,
      short_description,
      long_description,
      contact_email,
    })

    if (error) {
      console.error("Error inserting department:", error)
      return NextResponse.json({ error: "Failed to create department" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing department:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


