import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lastName = searchParams.get("lastName")
    const teamId = searchParams.get("teamId") ? Number.parseInt(searchParams.get("teamId")!) : undefined
    const gradYear = searchParams.get("gradYear") ? Number.parseInt(searchParams.get("gradYear")!) : undefined
    const clubId = searchParams.get("clubId") ? Number.parseInt(searchParams.get("clubId")!) : 1

    const whereClause: any = {
      club_id: clubId,
    }

    if (lastName) {
      whereClause.last_name = {
        contains: lastName,
      }
    }

    if (gradYear) {
      whereClause.grad_year = gradYear
    }

    let athletes

    if (teamId) {
      athletes = await prisma.athlete_master.findMany({
        where: {
          ...whereClause,
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
      athletes = await prisma.athlete_master.findMany({
        where: whereClause,
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
    console.error("Error searching athletes:", error)
    return NextResponse.json({ error: "Failed to search athletes" }, { status: 500 })
  }
}
