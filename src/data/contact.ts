export interface SocialProfile {
  platform: "instagram" | "youtube" | "facebook" | "linkedin"
  label: string
  handle: string
  url: string
}

export interface ContactConfig {
  name: string
  role: string
  // Flagged until client confirms which phone/email is official
  phone: {
    display: string
    value: string
    isVerified: boolean
  }
  email: {
    display: string
    value: string
    isVerified: boolean
  }
  whatsapp: {
    number: string
    isVerified: boolean
    defaultMessage: string
    getLink: () => string
  }
  socials: SocialProfile[]
  tagline: string
  panIndiaNote: string
  policies: {
    pricing: string
    availability: string
    response: string
  }
  getWhatsAppInquiryLink: (name?: string, contactInfo?: string, userMessage?: string) => string
}

export const contactConfig: ContactConfig = {
  name: "Anchor Nikhil Gupta",
  role: "Professional Event Host & Emcee",
  phone: {
    display: "Available upon inquiry",
    value: "",
    isVerified: false,
  },
  email: {
    display: "Available upon inquiry",
    value: "",
    isVerified: false,
  },
  whatsapp: {
    number: "919170165570",
    isVerified: true,
    defaultMessage:
      "Hii Anchor Nikhil 👋🏼\n\nI would like to enquire about your availability for an upcoming event.",
    getLink: () => {
      const message = encodeURIComponent(contactConfig.whatsapp.defaultMessage)
      return `https://wa.me/919170165570?text=${message}`
    },
  },
  socials: [
    {
      platform: "instagram",
      label: "Instagram",
      handle: "@anchor_nikhil_gupta",
      url: "https://www.instagram.com/anchor_nikhil_gupta/",
    },
    {
      platform: "youtube",
      label: "YouTube",
      handle: "@19nikhilgupta",
      url: "https://www.youtube.com/@19nikhilgupta",
    },
    {
      platform: "facebook",
      label: "Facebook",
      handle: "Anchor Nikhil Gupta",
      url: "https://www.facebook.com/search/top?q=anchor%20nikhil%20gupta",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      handle: "Nikhil Gupta",
      url: "https://www.linkedin.com/in/nikhilgupta19/",
    },
  ],
  tagline: "THE EXPERIENCE BEHIND THE ENERGY",
  panIndiaNote: "Available for events across India.",
  policies: {
    pricing:
      "Commercial quotes are customized based on event scale, venue location, expected audience size, and stage hosting duration. No generic one-size-fits-all packages.",
    availability:
      "Dates are blocked strictly on a first-come, first-served basis. Auspicious muhurats and weekend dates reserve several months ahead.",
    response:
      "Our team reviews every submitted inquiry promptly to verify calendar availability and discuss stage flow.",
  },
  getWhatsAppInquiryLink: (name?: string, contactInfo?: string, userMessage?: string) => {
    let text = "Hii Anchor Nikhil 👋🏼\n\n"
    if (name) text += `Your Name: ${name}\n\n`
    if (contactInfo) text += `WhatsApp Number: ${contactInfo}\n\n`
    if (userMessage) {
      text += `${userMessage}`
    } else {
      text += `I would like to check your availability and discuss hosting for an upcoming event.`
    }
    return `https://wa.me/919170165570?text=${encodeURIComponent(text)}`
  },
}

export interface WhatsAppEnquiryParams {
  name: string
  whatsappNumber: string
  eventType: string
  eventDates: string
  venue: string
}

export function buildWhatsAppEnquiryUrl(params: WhatsAppEnquiryParams): string {
  const message = `Hii Anchor Nikhil 👋🏼\n\nYour Name: ${params.name}\n\nWhatsApp Number: ${params.whatsappNumber}\n\nEvent Type: ${params.eventType}\n\nEvent Date: ${params.eventDates}\n\nVenue Name / Address: ${params.venue}`
  return `https://wa.me/919170165570?text=${encodeURIComponent(message)}`
}

export interface WhatsAppBookingParams {
  fullName: string
  phone: string
  email: string
  eventType: string
  eventDate: string
  eventLocation: string
  guestCount?: string
  additionalDetails?: string
}

export function formatBookingDate(dateStr: string): string {
  if (!dateStr) return "Not specified"
  try {
    const [year, month, day] = dateStr.split("-").map(Number)
    if (year && month && day) {
      const date = new Date(year, month - 1, day)
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      }
    }
    return dateStr
  } catch {
    return dateStr
  }
}

export function buildWhatsAppBookingMessage(params: WhatsAppBookingParams): string {
  const formattedDate = formatBookingDate(params.eventDate)
  const audience = params.guestCount?.trim() ? params.guestCount.trim() : "Not specified"
  const notes = params.additionalDetails?.trim() ? params.additionalDetails.trim() : "None"

  return [
    "New Booking Inquiry — Nikhil Gupta",
    "",
    `Name: ${params.fullName.trim()}`,
    `Phone: ${params.phone.trim()}`,
    `Email: ${params.email.trim()}`,
    `Event Type: ${params.eventType.trim()}`,
    `Event Date: ${formattedDate}`,
    `Location: ${params.eventLocation.trim()}`,
    `Expected Audience: ${audience}`,
    `Additional Notes: ${notes}`,
    "",
    "Please confirm availability and provide the next steps.",
  ].join("\n")
}

export function buildWhatsAppBookingUrl(params: WhatsAppBookingParams): string {
  const message = buildWhatsAppBookingMessage(params)
  const phone = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || contactConfig.whatsapp.number
  ).replace(/\D/g, "")
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}


