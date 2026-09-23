"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronUp } from "lucide-react"
import { contactConfig } from "@/data/contact"

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2 6.505 2 12.008c0 1.956.564 3.784 1.542 5.334L2.1 22.096l4.908-1.408a10.01 10.01 0 0 0 5.023 1.328h.004c5.514 0 10.03-4.505 10.03-10.008 0-5.503-4.516-10.008-10.034-10.008zm5.83 14.152c-.244.685-1.416 1.309-1.956 1.393-.518.08-1.189.116-3.832-.977-3.376-1.397-5.526-4.838-5.695-5.064-.168-.225-1.37-1.821-1.37-3.473 0-1.652.868-2.464 1.176-2.8.309-.337.674-.422.899-.422.225 0 .45.002.646.012.208.01.485-.078.758.577.282.674.958 2.336 1.042 2.507.085.17.142.368.029.593-.114.225-.17.366-.338.563-.17.197-.356.44-.509.591-.17.168-.347.351-.15.688.197.337.876 1.442 1.88 2.335 1.293 1.149 2.383 1.505 2.721 1.674.338.17.536.141.733-.085.197-.225.845-.984 1.07-1.322.225-.337.45-.282.76-.17.309.113 1.956.923 2.293 1.092.337.169.562.253.646.394.084.141.084.816-.16 1.501z" />
    </svg>
  )
}

function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Use verified Instagram URL
  const instagramProfile = contactConfig.socials.find(
    (s) => s.platform === "instagram"
  )
  const instagramUrl =
    instagramProfile?.url || "https://www.instagram.com/anchor_nikhil_gupta/"

  // WhatsApp / inquiry link
  const inquiryUrl = contactConfig.whatsapp.getLink()

  return (
    <aside
      className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
      aria-label="Quick Actions"
    >
      {/* WhatsApp / Instant Inquiry Button */}
      <motion.a
        href={inquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto size-11 sm:size-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="Quick Inquiry on WhatsApp"
        title="Quick Inquiry on WhatsApp"
      >
        <WhatsAppIcon className="size-5 sm:size-6" />
      </motion.a>

      {/* Instagram Direct Link (hidden on small mobile to avoid clutter, visible on sm+) */}
      <motion.a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto hidden sm:flex size-10 sm:size-11 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white shadow-md hover:opacity-95 transition-opacity items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E1306C]"
        aria-label="Visit Anchor Nikhil Gupta on Instagram"
        title="Follow @anchor_nikhil_gupta"
      >
        <InstagramIcon className="size-4 sm:size-5" />
      </motion.a>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="pointer-events-auto size-10 sm:size-11 rounded-full bg-[#FDFCF9] text-burgundy border border-burgundy/25 shadow-md hover:bg-burgundy hover:text-white hover:border-burgundy transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
            aria-label="Scroll back to top"
            title="Back to Top"
          >
            <ChevronUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  )
}
