import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { teamSchema } from "@/lib/validations/team"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const teamId = await params.id
    const id = Number.parseInt(teamId, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 })
    }

    const team = await prisma.team_master.findUnique({
      where: { team_master_id: id },
      include: {
        _count: {
          select: { athlete_teams: true },
        },
      },
    })

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 })
    }

    // Format the team to match the expected structure
    const formattedTeam = {
      id: team.team_master_id,
      name: team.team_name || "N/A",
      usav_code: team.organization_code || "N/A",
      age: team.age,
      rank: team.rank ? Number.parseInt(team.rank) : null,
      division: team.division || "N/A",
      _count: team._count,
      club_id: team.club_master_id,
      created_at: team.date_modified.toISOString(),
    }

    return NextResponse.json(formattedTeam)
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const teamId = await params.id
    const id = Number.parseInt(teamId, 10)
    const data = await request.json()

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 })
    }

    try {
      const validatedData = teamSchema.parse(data)

      const team = await prisma.team_master.findUnique({
        where: { team_master_id: id },
      })

      if (!team) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 })
      }

      // Convert the data to match the database schema
      const teamData = {
        team_name: validatedData.name,
        organization_code: validatedData.usav_code,
        division: validatedData.division,
        age: validatedData.age,
        rank: validatedData.rank ? validatedData.rank.toString() : null,
      }

      const updatedTeam = await prisma.team_master.update({
        where: { team_master_id: id },
        data: teamData,
      })

      // Format the response to match the expected structure
      const formattedTeam = {
        id: updatedTeam.team_master_id,
        name: updatedTeam.team_name || "N/A",
        usav_code: updatedTeam.organization_code || "N/A",
        age: updatedTeam.age,
        rank: updatedTeam.rank ? Number.parseInt(updatedTeam.rank) : null,
        division: updatedTeam.division || "N/A",
        club_id: updatedTeam.club_master_id,
        created_at: updatedTeam.date_modified.toISOString(),
      }

      return NextResponse.json(formattedTeam)
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating team:", error)
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const teamId = await params.id
    const id = Number.parseInt(teamId, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 })
    }

    const team = await prisma.team_master.findUnique({
      where: { team_master_id: id },
    })

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 })
    }

    await prisma.team_master.delete({
      where: { team_master_id: id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting team:", error)
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 })
  }
}
