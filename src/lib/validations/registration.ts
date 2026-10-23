import { z } from "zod";

// Indian 10-digit phone regex (starts with 6, 7, 8, or 9)
export const indianPhoneRegex = /^[6-9]\d{9}$/;

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Member name must be at least 2 characters").max(60),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || indianPhoneRegex.test(val.replace(/\s+/g, "")),
      "Invalid 10-digit Indian mobile number"
    ),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "Invalid email address"
    ),
});

export const registrationFormSchema = z.object({
  programId: z.string().min(1, "Please select an arena"),
  participantName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .regex(
      indianPhoneRegex,
      "Enter a valid 10-digit Indian mobile number (e.g., 9876543210)"
    ),
  email: z.string().email("Enter a valid email address"),
  collegeName: z
    .string()
    .min(3, "College name must be at least 3 characters")
    .max(120),
  department: z
    .string()
    .min(2, "Department name must be at least 2 characters")
    .max(60),
  year: z.string().min(1, "Please select your year of study"),
  teamMembers: z.array(teamMemberSchema),
  // Security honeypot field (hidden from real users, bots fill it out)
  fax_hp: z.string().max(0, "Bot submission detected").optional(),
  agreeRules: z
    .boolean()
    .refine((val) => val === true, "You must agree to fest rules and guidelines"),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
