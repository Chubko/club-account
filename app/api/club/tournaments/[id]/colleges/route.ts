import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid tournament ID" }, { status: 400 })
    }

    const collegeAttendees = await prisma.tournament_attending.findMany({
      where: {
        tournament_id: id,
        college_id: {
          not: null,
        },
      },
      include: {
        college: true,
      },
    })

    if (!collegeAttendees) {
      return NextResponse.json({ error: "No colleges found for this tournament" }, { status: 404 })
    }

    const colleges = collegeAttendees.map((attendee) => attendee.college).filter(Boolean)

    return NextResponse.json(colleges)
  } catch (error) {
    console.error("Error fetching colleges for tournament:", error)
    return NextResponse.json({ error: "Failed to fetch colleges for tournament" }, { status: 500 })
  }
}
