import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Bot trap check: if honeypot is populated, silently acknowledge without saving
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Message dispatched." },
        { status: 200 }
      );
    }

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Subject is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      subject: subject.trim().slice(0, 150),
      message: message.trim().slice(0, 5000),
      created_at: new Date().toISOString(),
      status: "unread",
    };

    // 2. Insert into Supabase if configured
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("messages")
        .insert([sanitizedData]);

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { success: false, error: "Failed to save message to database." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Message successfully transmitted and saved to database!",
        },
        { status: 200 }
      );
    }

    // 3. Fallback / Dev mode if Supabase credentials are not configured yet
    console.info(
      "[Contact API] Received submission in local development mode:",
      sanitizedData
    );
    console.info(
      "[Contact API] To persist permanently into PostgreSQL, add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
    );

    return NextResponse.json(
      {
        success: true,
        isDevFallback: true,
        message: "Message dispatched! Connect your Supabase keys to persist into PostgreSQL.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API route exception:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
