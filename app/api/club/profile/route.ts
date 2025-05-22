import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { clubSchema } from "@/lib/validations/club"

export async function GET(request: NextRequest) {
  try {
    // Get club_id from query params or default to 1
    const clubId = request.nextUrl.searchParams.get("club_id")
      ? Number.parseInt(request.nextUrl.searchParams.get("club_id")!)
      : 1

    const club = await prisma.club_master.findUnique({
      where: { club_master_id: clubId },
    })

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

    return NextResponse.json(formattedClub)
  } catch (error) {
    console.error("Error fetching club profile:", error)
    return NextResponse.json({ error: "Failed to fetch club profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const clubId = data.id || 1 // Default to club ID 1 if not provided

    try {
      const validatedData = clubSchema.parse(data)
      console.log('validatedData', validatedData)
      const club = await prisma.club_master.findUnique({
        where: { club_master_id: clubId },
      })
      console.log('club put', club)
      if (!club) {
        return NextResponse.json({ error: "Club not found" }, { status: 404 })
      }

      // Convert the data to match the database schema
      const clubData = {
        club_name: validatedData.name,
        region_code: validatedData.usav_region,
        club_code: validatedData.usav_code,
        address1: validatedData.address,
        address2: validatedData.address2,
        city: validatedData.city,
        state: validatedData.state,
        zip: validatedData.zip,
        url: validatedData.website,
        office_phone: validatedData.office_phone,
        other_phone: validatedData.other_phone,
        fax: validatedData.fax,
        email: validatedData.email,
        coordinator_first: validatedData.coord_first,
        coordinator_last: validatedData.coord_last,
        coordinator_email: validatedData.coord_email,
        coordinator_phone: validatedData.coord_phone,
      }
      console.log('clubData', clubData)
      const updatedClub = await prisma.club_master.update({
        where: { club_master_id: clubId },
        data: clubData,
      })
      console.log('updatedClub', updatedClub)
      // Format the response to match the expected structure
      const formattedClub = {
        id: updatedClub.club_master_id,
        name: updatedClub.club_name || "N/A",
        usav_region: updatedClub.region_code || "N/A",
        usav_code: updatedClub.club_code || "N/A",
        address: updatedClub.address1 || "N/A",
        address2: updatedClub.address2 || "N/A",
        city: updatedClub.city || "N/A",
        state: updatedClub.state || "N/A",
        zip: updatedClub.zip || "N/A",
        website: updatedClub.url || "N/A",
        office_phone: updatedClub.office_phone || "N/A",
        other_phone: updatedClub.other_phone || "N/A",
        fax: updatedClub.fax || "N/A",
        email: updatedClub.email || "N/A",
        sport_gender: updatedClub.sports_id ? `${updatedClub.sports_id}` : "N/A",
        coord_first: updatedClub.coordinator_first || "N/A",
        coord_last: updatedClub.coordinator_last || "N/A",
        coord_email: updatedClub.coordinator_email || "N/A",
        coord_phone: updatedClub.coordinator_phone || "N/A",
      }

      return NextResponse.json(formattedClub)
    } catch (validationError: any) {
      console.log('validationError', validationError)
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating club profile:", error)
    return NextResponse.json({ error: "Failed to update club profile" }, { status: 500 })
  }
}
