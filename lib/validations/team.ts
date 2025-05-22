import { z } from "zod"

export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  usav_code: z.string().optional(),
  division: z.string().optional(),
  age: z.number().int().min(8, "Age must be at least 8").max(18, "Age must be at most 18"),
  rank: z.number().int().min(1).optional(),
  club_id: z.number().int().positive(),
})

export type TeamInput = z.infer<typeof teamSchema>
