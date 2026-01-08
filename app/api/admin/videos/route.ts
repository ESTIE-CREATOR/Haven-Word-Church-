import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin", "media"])

    const body = await request.json()
    const { title, preacher, preached_at, youtube_url, youtube_video_id, thumbnail_url, featured } = body

    const supabase = await createClient()

    const { error } = await supabase.from("videos").insert({
      title,
      preacher,
      preached_at,
      youtube_url,
      youtube_video_id,
      thumbnail_url,
      featured: featured || false,
    })

    if (error) {
      console.error("Error inserting video:", error)
      return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing video:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}


