import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us | Anchor Nikhil Gupta — Event Host & Emcee",
  description:
    "Get in touch with Anchor Nikhil Gupta's team for stage hosting inquiries, wedding celebrations, corporate summits, and Pan-India bookings.",
}

export default function ContactPage() {
  return <ContactContent />
}
