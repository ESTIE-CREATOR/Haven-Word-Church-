import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, body: testimonyBody } = body

    const supabase = await createClient()

    const { error } = await supabase.from("testimonies").insert({
      name,
      title: title || null,
      body: testimonyBody,
      status: "pending",
    })

    if (error) {
      console.error("Error inserting testimony:", error)
      return NextResponse.json({ error: "Failed to submit testimony" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing testimony:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


