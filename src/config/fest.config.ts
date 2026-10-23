/**
 * ASTRA 2K27 - Central Festival Configuration
 * NOTE: Values marked with TODO are placeholders pending final confirmation from the organizing committee.
 */

export const FEST_CONFIG = {
  name: "ASTRA 2K27",
  edition: "2027",
  tagline: "National Inter-College Youth Conclave",
  college: {
    name: "Don Bosco College",
    campus: "Mampetta",
    address: "Mampetta, Mukkam, Kozhikode, Kerala, India - 673602",
    coordinates: {
      lat: "11.2588° N",
      lng: "75.7804° E",
    },
  },
  // TODO: [ORGANIZERS CONFIRMATION NEEDED] Final fest date & schedule timestamp
  festDate: "2027-02-20T09:00:00+05:30",
  durationDays: 1, // Single day mega fest

  // Primary Student Coordinator & Tech Lead
  leadCoordinator: {
    name: "Anandu EP",
    role: "Head Student Coordinator & Tech Lead",
    phone: "8075480258",
    whatsappUrl: "https://wa.me/918075480258?text=Hi%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202027",
  },

  // TODO: [ORGANIZERS CONFIRMATION NEEDED] Final official college UPI VPA & Merchant Name
  payment: {
    upiId: "8075480258@upi", // Placeholder
    payeeName: "ASTRA 2027 DON BOSCO",
    currency: "INR",
  },

  // Capacity Hold parameters
  registration: {
    holdDurationSeconds: 600, // 10-minute hold window for seats
  },

  socials: {
    instagram: "https://instagram.com/astrafest",
    whatsapp: "https://wa.me/918075480258",
    website: "https://astrafest.live",
  },
};
