import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { athleteSchema } from "@/lib/validations/athlete"

export async function GET(request: NextRequest) {
  try {
    // Get club_id from query params or default to 1
    const clubId = request.nextUrl.searchParams.get("club_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("club_id")!)
      : 1

    const teamId = request.nextUrl.searchParams.get("team_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("team_id")!)
      : undefined

    let athletes

    if (teamId) {
      // Get athletes for a specific team
      athletes = await prisma.athlete_master.findMany({
        where: {
          club_id: clubId,
          teams: {
            some: {
              team_id: teamId,
            },
          },
        },
        include: {
          teams: {
            include: {
              team: true,
            },
          },
        },
        orderBy: { last_name: "asc" },
      })
    } else {
      // Get all athletes for the club
      athletes = await prisma.athlete_master.findMany({
        where: {
          club_id: clubId,
        },
        include: {
          teams: {
            include: {
              team: true,
            },
          },
        },
        orderBy: { last_name: "asc" },
      })
    }

    return NextResponse.json(athletes)
  } catch (error) {
    console.error("Error fetching athletes:", error)
    return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    try {
      const validatedData = athleteSchema.parse(data)
      const { team_ids, ...athleteData } = validatedData

      // Create the athlete
      const newAthlete = await prisma.athlete_master.create({
        data: athleteData,
      })

      // Assign to teams if provided
      if (team_ids && team_ids.length > 0) {
        const teamConnections = team_ids.map((teamId) => ({
          team_id: teamId,
          athlete_id: newAthlete.id,
        }))

        await prisma.athlete_team.createMany({
          data: teamConnections,
        })
      }

      return NextResponse.json(newAthlete, { status: 201 })
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating athlete:", error)
    return NextResponse.json({ error: "Failed to create athlete" }, { status: 500 })
  }
}
