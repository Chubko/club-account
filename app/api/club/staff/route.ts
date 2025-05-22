import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { staffSchema } from "@/lib/validations/staff"

export async function GET(request: NextRequest) {
  try {
    // Get club_id from query params or default to 1
    const clubId = request.nextUrl.searchParams.get("club_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("club_id")!)
      : 1

    const teamId = request.nextUrl.searchParams.get("team_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("team_id")!)
      : undefined

    const staffQuery: any = {
      where: {
        club_id: clubId,
      },
      orderBy: { last_name: "asc" },
    }

    if (teamId) {
      staffQuery.where.team_id = teamId
    }

    const staff = await prisma.club_staff_master.findMany(staffQuery)

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    try {
      const validatedData = staffSchema.parse(data)

      const newStaff = await prisma.club_staff_master.create({
        data: validatedData,
      })

      return NextResponse.json(newStaff, { status: 201 })
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating staff member:", error)
    return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 })
  }
}
