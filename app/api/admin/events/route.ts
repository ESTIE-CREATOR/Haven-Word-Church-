import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin"])

    const body = await request.json()
    const { title, slug, start_date_time, end_date_time, location_name, address, description, google_cal_url } = body

    const supabase = await createClient()

    const { error } = await supabase.from("events").insert({
      title,
      slug,
      start_date_time,
      end_date_time,
      location_name,
      address,
      description,
      google_cal_url,
    })

    if (error) {
      console.error("Error inserting event:", error)
      return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing event:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


