"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { BookingForm } from "@/components/sections/booking-form"
import { ContactCard } from "@/components/sections/contact-card"
import { ArrowLeft, Sparkles, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookNowPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 lg:py-18">
        <div className="container-hero">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition-colors gap-2"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Intro Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
              BOOKING &amp; AVAILABILITY
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Let&apos;s Make Your Event Unforgettable
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Share your celebration details below to check calendar availability and discuss
              customized pricing with Anchor Nikhil Gupta&apos;s management team.
            </p>

            {/* Credibility pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Sparkles className="size-3.5 text-gold" />
              <span>Weddings • Corporate Summits • Milestone Celebrations</span>
            </div>
          </div>

          {/* Two-Column Grid: Guide on Left, Form on Right (on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Contact & Booking Journey (Desktop Left, Mobile Second) */}
            <div className="order-2 lg:order-1 lg:col-span-5">
              <ContactCard />
            </div>

            {/* Right Column: Booking Form (Desktop Right, Mobile First) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <BookingForm />
            </div>
          </div>

          {/* FAQ Navigation Banner */}
          <div className="mt-16 sm:mt-20 max-w-6xl mx-auto rounded-2xl bg-neutral-100/90 border border-neutral-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy shrink-0">
                <HelpCircle className="size-5" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900">
                  Have questions about pricing, travel, or customization?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-0.5">
                  Check our detailed Frequently Asked Questions for quick answers.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-white shrink-0"
            >
              <Link href="/faq">
                <span>View FAQs</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
