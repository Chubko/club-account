import { z } from "zod"

export const clubSchema = z.object({
  name: z.string().min(1, "Club name is required"),
  usav_region: z.string().optional(),
  usav_code: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  office_phone: z.string().optional(),
  other_phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  sport_gender: z.string().optional(),
  coord_first: z.string().optional(),
  coord_last: z.string().optional(),
  coord_email: z.string().email("Invalid coordinator email").optional().or(z.literal("")),
  coord_phone: z.string().optional(),
  logo_url: z.string().optional(),
})

export type ClubInput = z.infer<typeof clubSchema>
