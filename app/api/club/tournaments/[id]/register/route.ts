import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { tournamentRegistrationSchema } from "@/lib/validations/tournament"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tournamentId = Number.parseInt(params.id)

    if (isNaN(tournamentId)) {
      return NextResponse.json({ error: "Invalid tournament ID" }, { status: 400 })
    }

    const data = await request.json()
    data.tournament_id = tournamentId

    try {
      const validatedData = tournamentRegistrationSchema.parse(data)

      // Check if tournament exists
      const tournament = await prisma.tournament.findUnique({
        where: { id: tournamentId },
      })

      if (!tournament) {
        return NextResponse.json({ error: "Tournament not found" }, { status: 404 })
      }

      // Check if team exists
      const team = await prisma.team_master.findUnique({
        where: { id: validatedData.team_id },
      })

      if (!team) {
        return NextResponse.json({ error: "Team not found" }, { status: 404 })
      }

      // Check if already registered
      const existingRegistration = await prisma.tournament_attending.findFirst({
        where: {
          team_id: validatedData.team_id,
          tournament_id: tournamentId,
          college_id: null,
        },
      })

      if (existingRegistration) {
        return NextResponse.json({ error: "Team is already registered for this tournament" }, { status: 400 })
      }

      // Register team for tournament
      const registration = await prisma.tournament_attending.create({
        data: {
          team_id: validatedData.team_id,
          tournament_id: tournamentId,
        },
      })

      return NextResponse.json(registration, { status: 201 })
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error registering team for tournament:", error)
    return NextResponse.json({ error: "Failed to register team for tournament" }, { status: 500 })
  }
}
