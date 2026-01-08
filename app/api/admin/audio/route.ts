import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin", "media"])

    const body = await request.json()
    const { title, speaker, date, audio_url, slug, featured } = body

    const supabase = await createClient()

    const { error } = await supabase.from("audio").insert({
      title,
      speaker,
      date,
      audio_url: audio_url || null,
      slug,
      featured: featured || false,
    })

    if (error) {
      console.error("Error inserting audio:", error)
      return NextResponse.json({ error: "Failed to create audio message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing audio:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


