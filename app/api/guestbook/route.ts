import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

/* ═══════ Rate-Limit Store (in-memory, resets on cold start) ═══════ */
const recentIps = new Map<string, number>()
const RATE_LIMIT_MS = 5 * 60 * 1000 // 5 minutes

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim()
}

/* ═══════ GET — Fetch latest 50 entries ═══════ */
export async function GET() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Guestbook GET error:", error)
    const emsg = error instanceof Error ? error.message : String(error)
    const estack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries", details: emsg, stack: estack },
      { status: 500 }
    )
  }
}

/* ═══════ POST — Create a new entry ═══════ */
export async function POST(request: NextRequest) {
  try {
    /* ── Rate limiting ── */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"

    const lastSignedAt = recentIps.get(ip)
    if (lastSignedAt && Date.now() - lastSignedAt < RATE_LIMIT_MS) {
      const remainingSec = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSignedAt)) / 1000)
      return NextResponse.json(
        {
          error: `Please wait ${remainingSec}s before signing again.`,
        },
        { status: 429 }
      )
    }

    /* ── Parse & validate body ── */
    const body = (await request.json()) as { name?: string; message?: string }
    const name = sanitize(String(body.name ?? ""))
    const message = sanitize(String(body.message ?? ""))

    if (name.length < 2 || name.length > 30) {
      return NextResponse.json({ error: "Name must be between 2 and 30 characters." }, { status: 400 })
    }
    if (message.length < 2 || message.length > 200) {
      return NextResponse.json({ error: "Message must be between 2 and 200 characters." }, { status: 400 })
    }

    /* ── Create entry ── */
    const entry = await prisma.guestbookEntry.create({
      data: { name, message },
    })

    recentIps.set(ip, Date.now())

    // Cleanup old rate-limit entries every 100 writes
    if (recentIps.size > 100) {
      const now = Date.now()
      Array.from(recentIps.entries()).forEach(([key, ts]) => {
        if (now - ts > RATE_LIMIT_MS) recentIps.delete(key)
      })
    }

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error("Guestbook POST error:", error)
    const emsg = error instanceof Error ? error.message : String(error)
    const estack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      { error: "Failed to save your entry. Please try again.", details: emsg, stack: estack },
      { status: 500 }
    )
  }
}
