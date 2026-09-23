import { z } from "zod"

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name (at least 2 characters)" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Please enter a valid phone number (at least 10 digits)" })
    .regex(/^[0-9+\s\-()]{10,16}$/, {
      message: "Please enter a valid phone number format",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  eventType: z
    .string()
    .min(1, { message: "Please select an event type" }),
  eventDate: z
    .string()
    .min(1, { message: "Please select your planned event date" })
    .refine(
      (val) => {
        if (!val) return false
        const selected = new Date(val)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return !isNaN(selected.getTime()) && selected >= today
      },
      { message: "Event date must be today or in the future" }
    ),
  eventLocation: z
    .string()
    .trim()
    .min(2, { message: "Please specify the event city, venue, or destination" }),
  guestCount: z.string().optional(),
  additionalDetails: z.string().trim().optional(),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>
