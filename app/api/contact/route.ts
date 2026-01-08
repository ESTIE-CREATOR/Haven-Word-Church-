import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Store contact form submission (you can create a contact_submissions table if needed)
    // For now, just return success
    // In production, you might want to send an email or store in database

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


