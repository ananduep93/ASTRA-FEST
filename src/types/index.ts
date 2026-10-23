export type EventCategory =
  | "Stage & Runway"
  | "Tech & Gaming"
  | "Media & Arts"
  | "Management";

export type SeatStatus = "Open" | "Filling fast" | "Full";

export type RegistrationStatus = "Pending" | "Confirmed" | "Rejected" | "Expired";

export interface CoordinatorContact {
  name: string;
  role: string;
  phone?: string;
}

export interface Program {
  id: string;
  slug: string;
  number: string;
  name: string;
  subTitle: string;
  category: EventCategory;
  tagline: string;
  description: string;
  rules: string[];
  eligibility: string;
  fee: number; // In INR (0 = free / to be announced)
  feeLabel: string; // e.g. "₹150 / Team" or "Revealing Soon"
  prize: string;
  capacity: number;
  registeredCount: number;
  seatsStatus: SeatStatus;
  date: string;
  timeSlot: string;
  venue: string;
  image: string;
  badge: string;
  minTeamSize: number;
  maxTeamSize: number;
  coordinators: CoordinatorContact[];
}

export interface College {
  id: string;
  name: string;
  district: string;
  state: string;
}

export interface RegistrationMember {
  name: string;
  phone?: string;
  email?: string;
}

export interface Registration {
  id: string;
  referenceId: string; // e.g. "ASTRA-8492"
  programId: string;
  programName: string;
  participantName: string;
  phone: string;
  email: string;
  collegeName: string;
  department: string;
  year: string;
  teamSize: number;
  members: RegistrationMember[];
  upiRef?: string;
  status: RegistrationStatus;
  createdAt: string;
  idempotencyKey: string;
}

export interface Payment {
  id: string;
  registrationId: string;
  referenceId: string;
  amount: number;
  upiId: string;
  upiRef: string;
  status: "Pending Verification" | "Verified" | "Rejected";
  submittedAt: string;
}

export interface CapacityHold {
  holdToken: string;
  programId: string;
  expiresAt: number; // Unix timestamp in ms
  durationSeconds: number;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  badge: string;
  isImportant?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ScheduleItem {
  id: string;
  programId: string;
  programName: string;
  category: EventCategory;
  venue: string;
  startTime: string; // 24-hr format "HH:mm"
  endTime: string; // 24-hr format "HH:mm"
  displayTime: string;
  stageName: string;
}
