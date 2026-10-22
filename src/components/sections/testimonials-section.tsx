"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react"
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Film,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  writtenTestimonialsData,
  WrittenTestimonial,
} from "@/data/testimonials"
import { cinematicEase } from "@/lib/animations"
import type { Variants } from "motion/react"

// Auto-advance interval: 5.5 seconds (within the 5–6 seconds requirement)
const AUTOPLAY_INTERVAL_MS = 5500
// Resume delay after user interaction ceases: 5.5 seconds
const RESUME_DELAY_MS = 5500

export function TestimonialsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-60px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<"left" | "right">("right")
  const [isHovered, setIsHovered] = React.useState(false)
  const [isInteracting, setIsInteracting] = React.useState(false)

  const total = writtenTestimonialsData.length
  const resumeTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const rotationTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Clear timers safely on unmount
  React.useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
      if (rotationTimerRef.current) clearTimeout(rotationTimerRef.current)
    }
  }, [])

  // Advance to next testimonial with continuous wrap-around loop
  const handleNext = React.useCallback(() => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  // Move to previous testimonial with continuous wrap-around loop
  const handlePrev = React.useCallback(() => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Mark user interaction and pause autoplay, then resume after short delay (5.5s)
  const markInteraction = React.useCallback(() => {
    setIsInteracting(true)
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, RESUME_DELAY_MS)
  }, [])

  // Manual Next click (resets rotation timer)
  const onManualNext = () => {
    handleNext()
    markInteraction()
  }

  // Manual Prev click (resets rotation timer)
  const onManualPrev = () => {
    handlePrev()
    markInteraction()
  }

  // Direct dot click (resets rotation timer)
  const onSelectIndex = (idx: number) => {
    if (idx === currentIndex) return
    setDirection(idx > currentIndex ? "right" : "left")
    setCurrentIndex(idx)
    markInteraction()
  }

  // Automatic rotation: schedules next slide every 5.5s when in view and not paused by user
  React.useEffect(() => {
    if (!isInView || isHovered || isInteracting) {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current)
        rotationTimerRef.current = null
      }
      return
    }

    rotationTimerRef.current = setTimeout(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current)
        rotationTimerRef.current = null
      }
    }
  }, [currentIndex, isInView, isHovered, isInteracting, handleNext])

  // Mobile Touch Swipe Handlers
  const touchStartX = React.useRef<number | null>(null)
  const touchStartY = React.useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    markInteraction()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const diffX = touchStartX.current - touchEndX
      const diffY = touchStartY.current - touchEndY

      // Horizontal swipe detection (>40px and dominant over vertical scroll)
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }
    }
    touchStartX.current = null
    touchStartY.current = null
    markInteraction()
  }

  const currentItem: WrittenTestimonial = writtenTestimonialsData[currentIndex]

  // Slide / fade animation variants
  const slideVariants: Variants = {
    enter: (dir: "left" | "right") => ({
      x: prefersReducedMotion ? 0 : dir === "right" ? 18 : -18,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.45,
        ease: cinematicEase,
      },
    },
    exit: (dir: "left" | "right") => ({
      x: prefersReducedMotion ? 0 : dir === "right" ? -18 : 18,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.28,
        ease: cinematicEase,
      },
    }),
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full bg-[#FDFCF9] py-18 sm:py-24 lg:py-28 overflow-hidden border-b border-neutral-200/60"
    >
      <div className="container-hero relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
            TESTIMONIALS
          </p>

          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]"
          >
            Words That Stay With You
          </h2>

          <div
            className="h-[3px] w-14 bg-gold mx-auto mt-3.5 mb-4 rounded-full"
            aria-hidden="true"
          />

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Genuine words, shared energy, and cherished memories from the couples,
            families, and organizers who trusted the stage with Nikhil.
          </p>
        </div>

        {/* ================================================================ */}
        {/* TWO-COLUMN TESTIMONIAL COMPOSITION                               */}
        {/* ================================================================ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            markInteraction()
          }}
          onClick={markInteraction}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => {
            setIsHovered(false)
            markInteraction()
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* LEFT COLUMN: Nikhil Photo (DSC_1625.JPG) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-900">
              <Image
                src="/images/PROFILE/DSC_1625.JPG"
                alt="Anchor Nikhil Gupta holding the microphone, engaging the audience"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover object-top"
                priority
              />

              {/* Subtle bottom gradient overlay for depth */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Discreet badge signature */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide">
                  <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
                  <span>Anchor Nikhil Gupta</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Written Testimonial Message & Navigation */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]">
            {/* Top Quote Icon Accent */}
            <div className="mb-4">
              <Quote className="size-10 sm:size-12 text-gold/70" aria-hidden="true" />
            </div>

            {/* Testimonial Message Transition Container */}
            <div className="relative flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Quote text */}
                  <blockquote className="font-display italic text-lg sm:text-xl lg:text-2xl text-neutral-800 leading-relaxed font-normal whitespace-pre-line">
                    &ldquo;{currentItem.message}&rdquo;
                  </blockquote>

                  {/* Author - Name ONLY */}
                  <div className="pt-2 border-t border-neutral-200/80">
                    <p className="font-sans font-bold text-base sm:text-lg uppercase tracking-wider text-neutral-900">
                      — {currentItem.name}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls Bar */}
            <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center justify-between">
              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onManualPrev}
                  className="size-11 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200 flex items-center justify-center shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onManualNext}
                  className="size-11 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200 flex items-center justify-center shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>

                {/* Counter indicator */}
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 ml-2">
                  0{currentIndex + 1} / 0{total}
                </span>
              </div>

              {/* Direct Jump Indicators */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
                {writtenTestimonialsData.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={currentIndex === idx}
                    aria-label={`Go to testimonial ${idx + 1} from ${item.name}`}
                    onClick={() => onSelectIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy cursor-pointer ${
                      currentIndex === idx
                        ? "w-7 bg-burgundy"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting CTA Banner: View On-Camera Video Testimonials */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-neutral-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="size-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
              <Film className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">
                Want to see live reactions?
              </p>
              <p className="text-xs text-neutral-500">
                Watch unscripted on-camera video reviews recorded right after weddings and summits.
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-neutral-300 text-neutral-800 hover:bg-burgundy hover:text-white hover:border-burgundy rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
          >
            <Link href="/testimonials">
              <span>Explore Client Reviews</span>
              <ArrowRight className="size-3.5 ml-1.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
