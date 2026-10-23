import {
  Program,
  Registration,
  Payment,
  CapacityHold,
  ScheduleItem,
  Announcement,
  FAQItem,
  RegistrationStatus,
} from "@/types";
import {
  MOCK_PROGRAMS,
  MOCK_SCHEDULE,
  MOCK_ANNOUNCEMENTS,
  MOCK_FAQS,
} from "@/data/events.mock";
import { FEST_CONFIG } from "@/config/fest.config";

/**
 * ============================================================================
 * ABSTRACTED FRONTEND API LAYER (/lib/api)
 * ============================================================================
 * Clean interface abstraction. All UI components call this API layer.
 * When Supabase (PostgreSQL + Edge Functions) is connected in the next phase,
 * replace the simulated implementation below with Supabase SDK calls
 * without modifying any UI component!
 * ============================================================================
 */

// Simulated network latency helper
const delay = (ms: number = 180) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Local state caches (in-memory with client-side localStorage fallback)
const getStoredRegistrations = (): Registration[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("astra_registrations");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveRegistration = (reg: Registration) => {
  if (typeof window === "undefined") return;
  try {
    const list = getStoredRegistrations();
    list.unshift(reg);
    localStorage.setItem("astra_registrations", JSON.stringify(list));
  } catch {
    // Ignore storage quota errors
  }
};

export interface CreateRegistrationInput {
  programId: string;
  participantName: string;
  phone: string;
  email: string;
  collegeName: string;
  department: string;
  year: string;
  teamSize: number;
  members: { name: string; phone?: string; email?: string }[];
  idempotencyKey: string;
}

export interface SubmitPaymentInput {
  registrationId: string;
  referenceId: string;
  amount: number;
  upiRef: string;
}

export const api = {
  /**
   * Fetch all festival programs with optional category filter & keyword search
   */
  async getPrograms(filters?: {
    category?: string;
    search?: string;
  }): Promise<Program[]> {
    await delay(120);
    let list = [...MOCK_PROGRAMS];

    if (filters?.category && filters.category !== "All") {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters?.search && filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q)
      );
    }

    return list;
  },

  /**
   * Fetch a single program by its URL-friendly slug
   */
  async getProgramBySlug(slug: string): Promise<Program | null> {
    await delay(120);
    const item = MOCK_PROGRAMS.find((p) => p.slug === slug);
    return item || null;
  },

  /**
   * Fetch festival timeline schedule
   */
  async getSchedule(): Promise<ScheduleItem[]> {
    await delay(100);
    return MOCK_SCHEDULE;
  },

  /**
   * Create a 10-minute temporary seat capacity hold
   */
  async createCapacityHold(programId: string): Promise<CapacityHold> {
    await delay(150);
    const prog = MOCK_PROGRAMS.find((p) => p.id === programId);
    if (!prog) throw new Error("Program not found");

    if (prog.seatsStatus === "Full") {
      throw new Error("Sorry, seats for this event are fully booked.");
    }

    const durationSeconds = FEST_CONFIG.registration.holdDurationSeconds;
    const expiresAt = Date.now() + durationSeconds * 1000;
    const holdToken = `HOLD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const holdData: CapacityHold = {
      holdToken,
      programId,
      expiresAt,
      durationSeconds,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem(`hold_${programId}`, JSON.stringify(holdData));
    }

    return holdData;
  },

  /**
   * Release an expired or abandoned capacity hold
   */
  async releaseCapacityHold(holdToken: string): Promise<boolean> {
    await delay(80);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`hold_${holdToken}`);
    }
    return true;
  },

  /**
   * Submit registration details (with idempotency checking)
   */
  async createRegistration(
    input: CreateRegistrationInput
  ): Promise<Registration> {
    await delay(250);

    const prog = MOCK_PROGRAMS.find((p) => p.id === input.programId);
    if (!prog) throw new Error("Invalid program selected");

    // Idempotency check: prevent double submits
    const existing = getStoredRegistrations().find(
      (r) => r.idempotencyKey === input.idempotencyKey
    );
    if (existing) {
      return existing;
    }

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `ASTRA-${refNum}`;

    const registration: Registration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      referenceId,
      programId: prog.id,
      programName: prog.name,
      participantName: input.participantName,
      phone: input.phone,
      email: input.email,
      collegeName: input.collegeName,
      department: input.department,
      year: input.year,
      teamSize: input.teamSize,
      members: input.members,
      status: "Pending",
      createdAt: new Date().toISOString(),
      idempotencyKey: input.idempotencyKey,
    };

    saveRegistration(registration);
    return registration;
  },

  /**
   * Query registration pass status by Reference ID + phone number
   */
  async getRegistrationStatus(
    referenceId: string,
    phone: string
  ): Promise<Registration | null> {
    await delay(200);

    const cleanRef = referenceId.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, "").slice(-10);

    const localList = getStoredRegistrations();
    const found = localList.find(
      (r) =>
        r.referenceId.toUpperCase() === cleanRef &&
        r.phone.replace(/\D/g, "").slice(-10) === cleanPhone
    );

    if (found) return found;

    // Fallback demo lookup for testing: If reference matches pattern ASTRA-XXXX, return sample mock pass
    if (cleanRef.startsWith("ASTRA-") && cleanPhone.length === 10) {
      return {
        id: "mock_demo_pass",
        referenceId: cleanRef,
        programId: "prog-01",
        programName: "Scavenger Hunt",
        participantName: "Registered Candidate",
        phone: cleanPhone,
        email: "candidate@example.com",
        collegeName: "Don Bosco College",
        department: "Computer Applications",
        year: "3rd Year",
        teamSize: 3,
        members: [
          { name: "Team Member 1", phone: "9876543210" },
          { name: "Team Member 2", phone: "9876543211" },
        ],
        upiRef: "982736152431",
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        idempotencyKey: "demo_key",
      };
    }

    return null;
  },

  /**
   * Submit payment reference (UTR) for verification
   */
  async submitPayment(input: SubmitPaymentInput): Promise<Payment> {
    await delay(200);

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      registrationId: input.registrationId,
      referenceId: input.referenceId,
      amount: input.amount,
      upiId: FEST_CONFIG.payment.upiId,
      upiRef: input.upiRef,
      status: "Pending Verification",
      submittedAt: new Date().toISOString(),
    };

    // Update local registration record status
    if (typeof window !== "undefined") {
      try {
        const list = getStoredRegistrations();
        const updated = list.map((r) =>
          r.referenceId === input.referenceId
            ? { ...r, upiRef: input.upiRef, status: "Pending" as RegistrationStatus }
            : r
        );
        localStorage.setItem("astra_registrations", JSON.stringify(updated));
      } catch {
        // Safe fallback
      }
    }

    return payment;
  },

  /**
   * Fetch announcements ticker items
   */
  async getAnnouncements(): Promise<Announcement[]> {
    await delay(80);
    return MOCK_ANNOUNCEMENTS;
  },

  /**
   * Fetch FAQs
   */
  async getFAQs(): Promise<FAQItem[]> {
    await delay(80);
    return MOCK_FAQS;
  },
};
