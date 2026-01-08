import { NextRequest, NextResponse } from "next/server"
import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await requireRole(["admin", "media"])

    const supabase = await createClient()
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await requireRole(["admin", "media"])

    const body = await request.json()
    const { title, preacher, preached_at, youtube_url, youtube_video_id, thumbnail_url, featured } = body

    const supabase = await createClient()
    const { error } = await supabase
      .from("videos")
      .update({
        title,
        preacher,
        preached_at,
        youtube_url,
        youtube_video_id,
        thumbnail_url,
        featured: featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating video:", error)
      return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await requireRole(["admin", "media"])

    const supabase = await createClient()
    const { error } = await supabase.from("videos").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

