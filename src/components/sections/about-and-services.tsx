"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Mic, Briefcase, GraduationCap, Video, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const services: ServiceItem[] = [
  {
    icon: Mic,
    title: "Event Hosting",
    description: "Weddings, Sangeet, Private Parties & Social Events",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Conferences, Seminars, Product Launches & Award Shows",
  },
  {
    icon: GraduationCap,
    title: "College & Cultural Fests",
    description: "College Fests, Cultural Programs, Talent Hunts & More",
  },
  {
    icon: Video,
    title: "Video Presentations",
    description: "YouTube Videos, Reels, Brand Shoots & Other Collabs",
  },
]

export function AboutAndServices() {
  return (
    <section
      id="about"
      className="relative w-full bg-burgundy-section text-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle Background Glow Accent */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ==================================================== */}
          {/* LEFT SIDE: ABOUT ME (Profile Photo + Editorial Bio) */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7">
            
            {/* Framed Profile Portrait */}
            <div className="relative shrink-0 group">
              {/* Subtle Dot Matrix Pattern behind left edge */}
              <div
                className="absolute -left-3 -top-3 w-20 h-24 bg-dot-pattern opacity-25 pointer-events-none"
                aria-hidden="true"
              />

              {/* Portrait Frame */}
              <div className="relative w-44 sm:w-48 md:w-52 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900/40 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/nikhil-hero.jpg"
                  alt="Nikhil Gupta — Professional Anchor"
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Luminous Inner Border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />
              </div>
            </div>

            {/* About Text Content */}
            <div className="flex-1 text-center sm:text-left flex flex-col justify-between">
              {/* Eyebrow */}
              <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase mb-1.5">
                ABOUT ME
              </p>

              {/* Main Heading */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight tracking-tight">
                More Than Just <br className="hidden sm:inline" />
                an Anchor
              </h2>

              {/* Concise Supporting Description based on client source info */}
              <p className="text-neutral-200/90 text-xs sm:text-[13px] leading-relaxed mt-3 max-w-sm font-sans">
                A confident communicator with a journalism and media background,
                bringing stage presence, charisma, and storytelling to diverse audiences.
                From high-energy destination weddings to prestigious corporate summits,
                I make every event memorable.
              </p>

              {/* Editorial Signature */}
              <div className="my-2 sm:my-3">
                <span className="font-script text-2xl sm:text-3xl text-gold/95 select-none tracking-wide">
                  Nikhil Gupta
                </span>
              </div>

              {/* CTA Button linking to /about */}
              <div className="pt-1">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-lg px-4 py-2 text-xs font-medium tracking-wide gap-2 transition-colors"
                >
                  <Link href="/about">
                    <span>Know More About Me</span>
                    <User className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT SIDE: WHAT I DO (Large White Rounded Container) */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl text-neutral-900 border border-neutral-100">
              
              {/* Heading */}
              <div className="text-center mb-7 sm:mb-8">
                <h3 className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-neutral-900 uppercase">
                  WHAT I DO
                </h3>
                {/* Gold Accent Line */}
                <div
                  className="h-[2.5px] w-10 bg-gold mx-auto mt-2 rounded-full"
                  aria-hidden="true"
                />
              </div>

              {/* 4 Service Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-3 items-start lg:divide-x lg:divide-neutral-200/80">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.title}
                      className={`flex flex-col items-center text-center px-2 sm:px-3 ${
                        index !== 0 ? "lg:pl-4 xl:pl-5" : ""
                      }`}
                    >
                      {/* Service Icon in soft circular backdrop */}
                      <div className="size-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mb-3.5 transition-transform duration-200 hover:scale-110 shadow-2xs">
                        <Icon className="size-5 text-burgundy" aria-hidden="true" />
                      </div>

                      {/* Category Title */}
                      <h4 className="font-sans text-sm font-bold text-neutral-900 leading-snug tracking-tight">
                        {service.title}
                      </h4>

                      {/* Short Description */}
                      <p className="text-[12px] text-neutral-500 leading-relaxed mt-1.5 font-sans">
                        {service.description}
                      </p>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
