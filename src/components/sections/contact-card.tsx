"use client"

import * as React from "react"
import {
  MessageSquare,
  MapPin,
  Sparkles,
  CalendarCheck,
} from "lucide-react"
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

export function ContactCard() {
  const socialIcon = (platform: string) => {
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
        return <Sparkles className="size-4" />
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 4-Step Booking Guide */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <span className="font-sans text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-2 inline-block">
          THE BOOKING JOURNEY
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-5">
          How It Works
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3.5">
            <span className="shrink-0 size-7 rounded-full bg-burgundy/10 text-burgundy font-sans text-xs font-bold flex items-center justify-center mt-0.5">
              01
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900 font-sans">
                Submit Your Event Details
              </p>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-0.5">
                Share your planned date, city/venue, celebration type, and estimated audience size.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="shrink-0 size-7 rounded-full bg-burgundy/10 text-burgundy font-sans text-xs font-bold flex items-center justify-center mt-0.5">
              02
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900 font-sans">
                Calendar Availability Check
              </p>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-0.5">
                Our team reviews Nikhil&apos;s live itinerary to ensure your selected date is available.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="shrink-0 size-7 rounded-full bg-burgundy/10 text-burgundy font-sans text-xs font-bold flex items-center justify-center mt-0.5">
              03
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900 font-sans">
                Tailored Commercials &amp; Flow
              </p>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-0.5">
                Receive a transparent, personalized quotation reflecting your event&apos;s scale, venue, and hosting duration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="shrink-0 size-7 rounded-full bg-burgundy text-white font-sans text-xs font-bold flex items-center justify-center mt-0.5 shadow-xs">
              04
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900 font-sans">
                Formal Date Confirmation
              </p>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed mt-0.5">
                Commercial terms finalized, token processed, and your date is formally reserved on the calendar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact & WhatsApp */}
      <div className="rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-white to-neutral-50/60 p-6 sm:p-8 shadow-xs">
        <span className="font-sans text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-1.5 inline-block">
          DIRECT CHANNELS
        </span>
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-3 tracking-tight">
          Prefer Instant Chat?
        </h3>
        <p className="text-neutral-600 text-xs sm:text-sm font-sans leading-relaxed mb-5">
          Reach out directly with your event date, city, and event type for rapid coordination with our team.
        </p>

        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-white py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
        >
          <a
            href={contactConfig.whatsapp.getLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="size-4 mr-2 text-gold" />
            <span>Chat on WhatsApp</span>
          </a>
        </Button>
      </div>

      {/* Verified Social Profiles */}
      <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <span className="font-sans text-xs font-bold tracking-[0.25em] text-neutral-500 uppercase mb-2 inline-block">
          OFFICIAL CHANNELS
        </span>
        <h4 className="font-display text-lg font-bold text-neutral-900 mb-4 tracking-tight">
          Connect &amp; Follow
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {contactConfig.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200/70 hover:border-burgundy/40 hover:bg-neutral-50/80 transition-all text-neutral-800 group"
            >
              <span className="text-burgundy group-hover:text-burgundy-hover transition-colors">
                {socialIcon(social.platform)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-900 truncate">
                  {social.label}
                </p>
                <p className="text-[11px] text-neutral-500 truncate font-sans">
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/70 text-center">
          <Sparkles className="size-5 text-gold mx-auto mb-1.5" />
          <p className="text-xs font-bold text-neutral-900 font-sans">50% Fresh Content</p>
          <p className="text-[11px] text-neutral-500 font-sans mt-0.5">Bespoke games &amp; banter</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/70 text-center">
          <MapPin className="size-5 text-gold mx-auto mb-1.5" />
          <p className="text-xs font-bold text-neutral-900 font-sans">Pan-India Travel</p>
          <p className="text-[11px] text-neutral-500 font-sans mt-0.5">Available across cities</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/70 text-center">
          <CalendarCheck className="size-5 text-gold mx-auto mb-1.5" />
          <p className="text-xs font-bold text-neutral-900 font-sans">First-Come Calendar</p>
          <p className="text-[11px] text-neutral-500 font-sans mt-0.5">Early booking advised</p>
        </div>
      </div>
    </div>
  )
}
