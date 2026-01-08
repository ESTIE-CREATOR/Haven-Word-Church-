import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin"])

    const body = await request.json()
    const {
      name,
      slug,
      country,
      city,
      category,
      address,
      postcode,
      lat,
      lng,
      contact_email,
      contact_phone,
      pastor_name,
      description,
      service_times,
    } = body

    const supabase = await createClient()

    const { error } = await supabase.from("branches").insert({
      name,
      slug,
      country,
      city,
      category,
      address,
      postcode,
      lat,
      lng,
      contact_email,
      contact_phone,
      pastor_name,
      description,
      service_times,
    })

    if (error) {
      console.error("Error inserting branch:", error)
      return NextResponse.json({ error: "Failed to create branch" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing branch:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


