import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contactConfig } from "@/data/contact"

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function FacebookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <InstagramIcon className="size-4" />
      case "youtube":
        return <YoutubeIcon className="size-4" />
      case "facebook":
        return <FacebookIcon className="size-4" />
      case "linkedin":
        return <LinkedinIcon className="size-4" />
      default:
        return <ArrowUpRight className="size-4" />
    }
  }

  return (
    <footer
      className="relative w-full bg-[#3D0A11] text-[#FDFCF9] border-t border-[#D4AF37]/25 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle atmospheric radial lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(212,175,55,0.07),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10 pt-16 sm:pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & Identity Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1 -m-1"
              aria-label="Nikhil Gupta — Home"
            >
              <div className="relative size-12 sm:size-14 shrink-0 rounded-full overflow-hidden bg-white/5 p-1 border border-gold/30 group-hover:border-gold transition-colors">
                <Image
                  src="/images/logo.png"
                  alt="Nikhil Gupta Logo"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-white">
                  NIKHIL GUPTA
                </h2>
                <p className="text-gold text-xs sm:text-sm tracking-[0.22em] font-semibold uppercase">
                  ANCHOR • EMCEE • ENTERTAINER
                </p>
              </div>
            </Link>

            {/* Approved Brand Tagline */}
            <div className="pt-2 border-l-2 border-gold/80 pl-3.5 my-2">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/90">
                THE EXPERIENCE BEHIND THE ENERGY
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed max-w-sm pt-1">
              Hosting luxury weddings, high-octane corporate summits, college fests, and milestone celebrations across India.
            </p>
          </div>

          {/* Navigation Links Column (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90 mb-4">
              Navigation
            </h3>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
                {footerNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-300 hover:text-gold transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect / Social Channels Column (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90 mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm">
              {contactConfig.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-neutral-300 hover:text-gold transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-xs"
                    aria-label={`Visit Anchor Nikhil Gupta on ${social.label}`}
                  >
                    <span className="text-gold/80 group-hover:text-gold transition-colors">
                      {getSocialIcon(social.platform)}
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Book An Event CTA Column (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90 mb-2">
                Book An Event
              </h3>
              <p className="text-xs text-neutral-300/80 leading-relaxed">
                Check calendar availability and stage hosting requirements for your date.
              </p>
            </div>

            <Button
              asChild
              variant="bookNow"
              size="default"
              className="w-full justify-center rounded-lg px-4 py-2.5 text-xs font-bold tracking-wider uppercase shadow-md"
            >
              <Link href="/book-now">
                <Calendar className="size-3.5 mr-1.5" aria-hidden="true" />
                BOOK NOW
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            © {currentYear} Nikhil Gupta. All rights reserved.
          </p>
          <p className="font-display italic text-neutral-300/70 tracking-wide text-xs">
            The Stage Belongs To The Moment.
          </p>
        </div>
      </div>
    </footer>
  )
}
