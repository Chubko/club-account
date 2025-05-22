import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clubId = await params.id
    const id = Number.parseInt(clubId, 10)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid club ID" }, { status: 400 })
    }

    // const club = await prisma.club_master.findUnique({
    //   where: { club_master_id: id },
    // })
    const [club] = await prisma.$queryRaw`
      SELECT * FROM club_master WHERE club_master_id = ${id}
    `
    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 })
    }

    // Format the data similar to how the PHP code does it
    const formattedClub = {
      id: club.club_master_id,
      name: club.club_name || "N/A",
      usav_region: club.region_code || "N/A",
      usav_code: club.club_code || "N/A",
      address: club.address1 || "N/A",
      address2: club.address2 || "N/A",
      city: club.city || "N/A",
      state: club.state || "N/A",
      zip: club.zip || "N/A",
      website: club.url || "N/A",
      office_phone: club.office_phone || "N/A",
      other_phone: club.other_phone || "N/A",
      fax: club.fax || "N/A",
      email: club.email || "N/A",
      sport_gender: club.sports_id ? `${club.sports_id}` : "N/A",
      coord_first: club.coordinator_first || "N/A",
      coord_last: club.coordinator_last || "N/A",
      coord_email: club.coordinator_email || "N/A",
      coord_phone: club.coordinator_phone || "N/A",
    }
    console.log('club 33333', formattedClub)
    return NextResponse.json(formattedClub)
  } catch (error) {
    console.error("Error fetching club profile:", error)
    return NextResponse.json({ error: "Failed to fetch club profile" }, { status: 500 })
  }
}
