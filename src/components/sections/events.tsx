"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import { eventCategoriesData, EventCategory } from "@/data/events"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  category: EventCategory
  index: number
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col h-full rounded-2xl bg-white border border-neutral-200/80 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group"
    >
      {/* Category Photography Header */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
        <Image
          src={category.image}
          alt={`Nikhil Gupta — ${category.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Luminous Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90" />

        {/* Top Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-gold bg-burgundy/90 backdrop-blur-xs border border-gold/30 shadow-md">
            <Sparkles className="size-3 text-gold" aria-hidden="true" />
            <span>Category 0{category.slug === "wedding-events" ? 1 : category.slug === "special-occasions" ? 2 : 3}</span>
          </span>
        </div>

        {/* Image Text Overlay (Title & Subtitle) */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-xs">
            {category.title}
          </h3>
          <p className="font-sans text-xs text-gold/90 font-medium tracking-wide mt-0.5">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col justify-between flex-1 p-6 sm:p-7 bg-white">
        <div>
          {/* Category Short Description */}
          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
            {category.description}
          </p>

          {/* Event Types Elegant Tag Chips */}
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-2.5 font-sans">
              Types of Events
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {category.eventTypes.map((eventType) => (
                <span
                  key={eventType}
                  className="px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-md bg-neutral-100 text-neutral-800 hover:bg-burgundy/10 hover:text-burgundy border border-neutral-200/70 transition-colors"
                >
                  {eventType}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Action Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <Link
            href={`/events#${category.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition-colors group-hover:translate-x-1 duration-200 gap-1.5"
          >
            <span>Explore {category.title}</span>
            <ArrowRight className="size-3.5 text-burgundy transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Events() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  const animateState = prefersReducedMotion || isInView ? "visible" : "hidden"

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="relative w-full bg-[#FDFCF9] py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-neutral-200/60"
    >
      {/* Decorative Subtle Background Flourish */}
      <div
        className="absolute top-12 left-0 w-32 h-44 bg-dot-pattern opacity-25 pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10">
        {/* Section Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
            EVENTS
          </p>

          {/* Main Editorial Heading */}
          <h2
            id="events-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]"
          >
            Where Every Event Comes Alive
          </h2>

          {/* Gold Accent Line */}
          <div
            className="h-[3px] w-14 bg-gold mx-auto mt-3.5 mb-4 rounded-full"
            aria-hidden="true"
          />

          {/* Concise Supporting Description */}
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            From high-energy destination weddings and grand celebrations to prestigious corporate summits
            and cultural fests, Nikhil Gupta brings charisma, elegance, and unforgettable stage presence.
          </p>
        </div>

        {/* 3 Primary Category Cards Grid */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={animateState}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch"
        >
          {eventCategoriesData.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </motion.div>

        {/* Section Closing Banner CTA */}
        <div className="mt-14 sm:mt-16 lg:mt-20 text-center bg-burgundy-section rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 size-72 bg-white/[0.05] rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center justify-center size-12 rounded-full bg-white/10 text-gold mb-4">
              <Calendar className="size-6 text-gold" aria-hidden="true" />
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Ready to Make Your Event Unforgettable?
            </h3>

            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed mb-6 font-sans max-w-lg">
              Check availability for your date and let&apos;s create an extraordinary stage experience together.
            </p>

            <Button
              asChild
              variant="bookNow"
              size="lg"
              className="rounded-lg px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-lg hover:shadow-xl"
            >
              <Link href="/book-now">
                BOOK YOUR EVENT
                <ArrowRight className="size-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
