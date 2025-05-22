import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { teamSchema } from "@/lib/validations/team"

export async function GET(request: NextRequest) {
  try {
    // Get club_id from query params or default to 1
    const clubId = request.nextUrl.searchParams.get("club_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("club_id")!)
      : 1
    console.log('11111 clubId', clubId)
    const teams = await prisma.$queryRaw`
      SELECT * FROM team_master WHERE club_master_id = ${clubId}
    `
    // const teams = await prisma.team_master.findMany({
    //   where: {
    //     club_master_id: clubId,
    //   },
    //   include: {
    //     _count: {
    //       select: { athlete_teams: true },
    //     },
    //   },
    //   orderBy: { team_name: "asc" },
    // })
    console.log('teams', teams)
    // Format the teams to match the expected structure
    const formattedTeams = teams.map((team) => ({
      id: team.team_master_id,
      name: team.team_name || "N/A",
      division: team.division,
      usav_code: team.organization_code || "N/A",
      age: team.age,
      rank: team.rank ? Number.parseInt(team.rank) : null,
      _count: team._count,
      club_id: team.club_master_id,
      created_at: team.date_modified.toISOString(),
    }))

    return NextResponse.json(formattedTeams)
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    try {
      const validatedData = teamSchema.parse(data)

      // Convert the data to match the database schema
      const teamData = {
        team_name: validatedData.name,
        organization_code: validatedData.usav_code,
        division: validatedData.division,
        age: validatedData.age,
        rank: validatedData.rank ? validatedData.rank.toString() : null,
        club_master_id: validatedData.club_id,
        date_created: Math.floor(Date.now() / 1000), // Unix timestamp
        sports_id: 2, // Default sports_id
      }

      const newTeam = await prisma.team_master.create({
        data: teamData,
      })

      // Format the response to match the expected structure
      const formattedTeam = {
        id: newTeam.team_master_id,
        name: newTeam.team_name || "N/A",
        usav_code: newTeam.organization_code || "N/A",
        age: newTeam.age,
        rank: newTeam.rank ? Number.parseInt(newTeam.rank) : null,
        club_id: newTeam.club_master_id,
        created_at: newTeam.date_modified.toISOString(),
      }

      return NextResponse.json(formattedTeam, { status: 201 })
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating team:", error)
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
  }
}
