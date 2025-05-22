import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { athleteSchema } from "@/lib/validations/athlete"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 })
    }

    const athlete = await prisma.athlete_master.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            team: true,
          },
        },
      },
    })

    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
    }

    return NextResponse.json(athlete)
  } catch (error) {
    console.error("Error fetching athlete:", error)
    return NextResponse.json({ error: "Failed to fetch athlete" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 })
    }

    const data = await request.json()

    try {
      const validatedData = athleteSchema.parse(data)
      const { team_ids, ...athleteData } = validatedData

      const athlete = await prisma.athlete_master.findUnique({
        where: { id },
      })

      if (!athlete) {
        return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
      }

      // Update athlete data
      const updatedAthlete = await prisma.athlete_master.update({
        where: { id },
        data: athleteData,
      })

      // Update team assignments if provided
      if (team_ids) {
        // Remove existing team assignments
        await prisma.athlete_team.deleteMany({
          where: { athlete_id: id },
        })

        // Add new team assignments
        if (team_ids.length > 0) {
          const teamConnections = team_ids.map((teamId) => ({
            team_id: teamId,
            athlete_id: id,
          }))

          await prisma.athlete_team.createMany({
            data: teamConnections,
          })
        }
      }

      return NextResponse.json(updatedAthlete)
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating athlete:", error)
    return NextResponse.json({ error: "Failed to update athlete" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid athlete ID" }, { status: 400 })
    }

    const athlete = await prisma.athlete_master.findUnique({
      where: { id },
    })

    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 })
    }

    // Delete related records first
    await prisma.athlete_team.deleteMany({
      where: { athlete_id: id },
    })

    await prisma.team_roster.deleteMany({
      where: { athlete_id: id },
    })

    await prisma.athlete_roster.deleteMany({
      where: { athlete_id: id },
    })

    // Then delete the athlete
    await prisma.athlete_master.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Athlete deleted successfully" })
  } catch (error) {
    console.error("Error deleting athlete:", error)
    return NextResponse.json({ error: "Failed to delete athlete" }, { status: 500 })
  }
}
