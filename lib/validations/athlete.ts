import { z } from "zod"

export const athleteSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  height: z.string().optional(),
  position: z.string().optional(),
  grad_year: z.number().int().optional(),
  uniform_number: z.string().optional(),
  scholarship: z.boolean().optional(),
  club_id: z.number().int().positive(),
  team_ids: z.array(z.number().int().positive()).optional(),
})

export type AthleteInput = z.infer<typeof athleteSchema>
