import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // Create a club
  const club = await prisma.club.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "212 Volleyball",
      usavRegion: "NORTH TEXAS (NT)",
      usavCode: "212VB",
      address: "2600 Alameda",
      city: "Fort Worth",
      state: "Texas",
      zip: "76116",
      website: "www.212degreesvb.com",
      officePhone: "(817) 243-5767",
      email: "212degreesvb@gmail.com",
      sportGender: "Women's Volleyball",
    },
  })

  // Create teams
  const team1 = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "212.18.1",
      usavCode: "G18212VB/NT",
      age: 18,
      clubId: club.id,
    },
  })

  const team2 = await prisma.team.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "212.17.1",
      usavCode: "G17212VB/NT",
      age: 17,
      clubId: club.id,
    },
  })

  const team3 = await prisma.team.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "212.17.2",
      usavCode: "G17212VB/NT",
      age: 17,
      rank: 2,
      clubId: club.id,
    },
  })

  // Create athletes
  const athlete1 = await prisma.athlete.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      height: "5'10\"",
      position: "Outside Hitter",
      gradYear: 2024,
      clubId: club.id,
    },
  })

  const athlete2 = await prisma.athlete.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: "Emily",
      lastName: "Williams",
      email: "emily.w@example.com",
      phone: "(555) 234-5678",
      height: "5'8\"",
      position: "Setter",
      gradYear: 2025,
      clubId: club.id,
    },
  })

  // Assign athletes to teams
  await prisma.athleteTeam.upsert({
    where: { athleteId_teamId: { athleteId: athlete1.id, teamId: team1.id } },
    update: {},
    create: {
      athleteId: athlete1.id,
      teamId: team1.id,
    },
  })

  await prisma.athleteTeam.upsert({
    where: { athleteId_teamId: { athleteId: athlete2.id, teamId: team2.id } },
    update: {},
    create: {
      athleteId: athlete2.id,
      teamId: team2.id,
    },
  })

  // Create staff members
  await prisma.staff.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: "Frances",
      lastName: "Davies",
      email: "davies.frances.r@gmail.com",
      phone: "(817) 219-7464",
      role: "Head Coach",
      teamId: team1.id,
      clubId: club.id,
    },
  })

  await prisma.staff.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: "Christian",
      lastName: "Griffin",
      email: "christiangriffin@gmail.com",
      phone: "(682) 309-7462",
      role: "Assistant Coach",
      teamId: team1.id,
      clubId: club.id,
    },
  })

  // Create tournaments
  const tournament1 = await prisma.tournament.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Spring Championship",
      startDate: new Date("2025-05-15"),
      endDate: new Date("2025-05-17"),
      location: "Dallas Convention Center",
      description: "Annual spring championship tournament",
    },
  })

  // Register teams for tournaments
  await prisma.teamTournament.upsert({
    where: { teamId_tournamentId: { teamId: team1.id, tournamentId: tournament1.id } },
    update: {},
    create: {
      teamId: team1.id,
      tournamentId: tournament1.id,
    },
  })

  // Create colleges
  const college1 = await prisma.college.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "University of Texas",
      division: "Division I",
      state: "TX",
    },
  })

  const college2 = await prisma.college.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Texas A&M",
      division: "Division I",
      state: "TX",
    },
  })

  // Register colleges for tournaments
  await prisma.collegeTournament.upsert({
    where: { collegeId_tournamentId: { collegeId: college1.id, tournamentId: tournament1.id } },
    update: {},
    create: {
      collegeId: college1.id,
      tournamentId: tournament1.id,
    },
  })

  await prisma.collegeTournament.upsert({
    where: { collegeId_tournamentId: { collegeId: college2.id, tournamentId: tournament1.id } },
    update: {},
    create: {
      collegeId: college2.id,
      tournamentId: tournament1.id,
    },
  })

  // Create a user
  await prisma.user.upsert({
    where: { email: "luda.chubko@gmail.com" },
    update: {},
    create: {
      firstName: "Luda",
      lastName: "Chubko",
      email: "luda.chubko@gmail.com",
      password: "$2a$10$GQf8SKWEIWCYmZjWvG4kIO9qh8zPRdVFHD5UGC.MUfV3nKbVPzEeG", // hashed "password123"
      username: "luda.chubko@gmail.com",
    },
  })

  console.log("Database has been seeded!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
