# University Athlete Club Management System

A comprehensive management system for volleyball clubs to manage their profiles, teams, athletes, staff, and tournaments.

## Features

- Club Profile Management
- Team Management
- Athlete Management
- Staff Management
- Tournament Management
- College Attendance Tracking

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Validation**: Zod
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js 16+
- MySQL 8+

### Installation

1. Clone the repository
   \`\`\`bash
   git clone https://github.com/yourusername/ua-club-management.git
   cd ua-club-management
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables
   Create a `.env` file in the root directory with the following content:
   \`\`\`
   DATABASE_URL="mysql://root:12345@localhost:3306/univer30_athletes"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   UPLOAD_DIR="./public/uploads"
   \`\`\`

4. Generate Prisma client
   \`\`\`bash
   npx prisma generate
   \`\`\`

5. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

## API Documentation

### Club Profile

- `GET /api/club/profile` - Get club profile
- `PUT /api/club/profile` - Update club profile

### Teams

- `GET /api/club/teams` - List all teams
- `GET /api/club/teams/{id}` - Get specific team
- `POST /api/club/teams` - Create new team
- `PUT /api/club/teams/{id}` - Update team
- `DELETE /api/club/teams/{id}` - Delete team

### Athletes

- `GET /api/club/athletes` - List all athletes
- `GET /api/club/athletes/{id}` - Get specific athlete
- `POST /api/club/athletes` - Add new athlete
- `PUT /api/club/athletes/{id}` - Update athlete
- `DELETE /api/club/athletes/{id}` - Remove athlete
- `GET /api/club/athletes/search` - Search athletes with filters

### Staff

- `GET /api/club/staff` - List all staff
- `GET /api/club/staff/{id}` - Get specific staff member
- `POST /api/club/staff` - Add new staff
- `PUT /api/club/staff/{id}` - Update staff
- `DELETE /api/club/staff/{id}` - Remove staff

### Tournaments

- `GET /api/club/tournaments` - List tournaments
- `GET /api/club/tournaments/{id}` - Get tournament details
- `GET /api/club/tournaments/{id}/colleges` - List colleges attending tournament
- `POST /api/club/tournaments/{id}/register` - Register team for tournament

### File Upload

- `POST /api/upload` - Upload a file (multipart/form-data)

## Database Schema

The backend is designed to work with the existing database schema, which includes the following key tables:

- club_master
- team_master
- athlete_master
- athlete_team
- club_staff_master
- tournament
- tournament_attending
- college

## License

This project is licensed under the MIT License.
