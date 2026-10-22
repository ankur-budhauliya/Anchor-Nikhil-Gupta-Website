"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"
import { cinematicEase } from "@/lib/animations"
import { Navbar } from "@/components/layout/navbar"
import {
  writtenTestimonialsData,
  videoTestimonialsData,
  testimonialVideoItems,
  VideoTestimonialItem,
  WrittenTestimonial,
} from "@/data/testimonials"
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Quote,
  Film,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoLightbox } from "@/components/ui/video-lightbox"

const AUTOPLAY_INTERVAL_MS = 5500
const RESUME_DELAY_MS = 5500

export default function TestimonialsPage() {
  const prefersReducedMotion = useReducedMotion() ?? false

  // Written Testimonial Carousel State
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<"left" | "right">("right")
  const [isHovered, setIsHovered] = React.useState(false)
  const [isInteracting, setIsInteracting] = React.useState(false)

  const totalWritten = writtenTestimonialsData.length
  const resumeTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const rotationTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Clear timers safely on unmount
  React.useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
      if (rotationTimerRef.current) clearTimeout(rotationTimerRef.current)
    }
  }, [])

  const handleNextWritten = React.useCallback(() => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % totalWritten)
  }, [totalWritten])

  const handlePrevWritten = React.useCallback(() => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + totalWritten) % totalWritten)
  }, [totalWritten])

  const markInteraction = React.useCallback(() => {
    setIsInteracting(true)
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, RESUME_DELAY_MS)
  }, [])

  const onManualNext = () => {
    handleNextWritten()
    markInteraction()
  }

  const onManualPrev = () => {
    handlePrevWritten()
    markInteraction()
  }

  const onSelectIndex = (idx: number) => {
    if (idx === currentIndex) return
    setDirection(idx > currentIndex ? "right" : "left")
    setCurrentIndex(idx)
    markInteraction()
  }

  // 5.5s autoplay rotation
  React.useEffect(() => {
    if (isHovered || isInteracting) {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current)
        rotationTimerRef.current = null
      }
      return
    }

    rotationTimerRef.current = setTimeout(() => {
      handleNextWritten()
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current)
        rotationTimerRef.current = null
      }
    }
  }, [currentIndex, isHovered, isInteracting, handleNextWritten])

  // Touch Swipe Handlers
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

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          handleNextWritten()
        } else {
          handlePrevWritten()
        }
      }
    }
    touchStartX.current = null
    touchStartY.current = null
    markInteraction()
  }

  const currentWritten: WrittenTestimonial = writtenTestimonialsData[currentIndex]

  // Video Lightbox State
  const [videoLightboxOpen, setVideoLightboxOpen] = React.useState(false)
  const [videoIndex, setVideoIndex] = React.useState(0)

  const handleOpenVideo = (index: number) => {
    setVideoIndex(index)
    setVideoLightboxOpen(true)
  }

  const slideVariants: Variants = {
    enter: (dir: "left" | "right") => ({
      x: prefersReducedMotion ? 0 : dir === "right" ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: cinematicEase,
      },
    },
    exit: (dir: "left" | "right") => ({
      x: prefersReducedMotion ? 0 : dir === "right" ? -24 : 24,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.25,
        ease: cinematicEase,
      },
    }),
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Back to Home Navigation */}
          <div className="mb-8">
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
              CLIENT EXPERIENCES &amp; REVIEWS
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Voices of Trust &amp; Unforgettable Celebrations
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 rounded-full" />
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SECTION 1: TWO-COLUMN WRITTEN TESTIMONIAL COMPOSITION          */}
          {/* -------------------------------------------------------------- */}
          <div className="mb-20 sm:mb-24">
              <div
                className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-6 sm:p-10 lg:p-12"
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left: Nikhil Photo (DSC_1625.JPG) */}
                  <div className="lg:col-span-5 w-full">
                    <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900">
                      <Image
                        src="/images/PROFILE/DSC_1625.JPG"
                        alt="Anchor Nikhil Gupta holding microphone"
                        fill
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        className="object-cover object-top"
                        priority
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                          <span className="size-2 rounded-full bg-gold" />
                          <span>Anchor Nikhil Gupta</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Written Testimonial Message Carousel */}
                  <div className="lg:col-span-7 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="size-4 text-gold shrink-0" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-burgundy">
                          Client Gratitude &amp; Review
                        </span>
                      </div>
                      <Quote className="size-9 sm:size-11 text-gold/70 mb-4" />
                    </div>

                    <div className="relative flex-1 flex flex-col justify-center my-2">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={currentWritten.id}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="space-y-4"
                        >
                          <blockquote className="font-display italic text-lg sm:text-xl lg:text-2xl text-neutral-800 leading-relaxed font-normal whitespace-pre-line">
                            &ldquo;{currentWritten.message}&rdquo;
                          </blockquote>
                          {/* Author - Name ONLY */}
                          <div className="pt-3 border-t border-neutral-200">
                            <p className="font-sans font-bold text-base sm:text-lg uppercase tracking-wider text-neutral-900">
                              — {currentWritten.name}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Controls Bar */}
                    <div className="mt-6 pt-5 border-t border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={onManualPrev}
                          className="size-10 rounded-full border border-neutral-300 bg-neutral-50 text-neutral-800 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all flex items-center justify-center shadow-xs cursor-pointer"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={onManualNext}
                          className="size-10 rounded-full border border-neutral-300 bg-neutral-50 text-neutral-800 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all flex items-center justify-center shadow-xs cursor-pointer"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 ml-2">
                          0{currentIndex + 1} / 0{totalWritten}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5" role="tablist">
                        {writtenTestimonialsData.map((item, idx) => (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={currentIndex === idx}
                            aria-label={`Go to testimonial ${idx + 1}`}
                            onClick={() => onSelectIndex(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              currentIndex === idx
                                ? "w-6 bg-burgundy"
                                : "w-2 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* -------------------------------------------------------------- */}
          {/* SECTION 2: VIDEO TESTIMONIALS GRID                             */}
          {/* -------------------------------------------------------------- */}
          <div className="mb-20 sm:mb-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200/80 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Film className="size-4 text-gold shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-burgundy">
                      Real Stage &amp; Event Reactions
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                    On-Camera Client Reactions
                  </h2>
                </div>
                <span className="text-xs font-semibold text-neutral-500 font-sans">
                  Tap any card to watch the full video
                </span>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {videoTestimonialsData.map((item: VideoTestimonialItem, idx: number) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenVideo(idx)}
                    className="group relative flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer aspect-[9/14]"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleOpenVideo(idx)
                      }
                    }}
                    aria-label={`Play ${item.title}`}
                  >
                    {/* Media Thumbnail Container */}
                    <div className="absolute inset-0 w-full h-full bg-neutral-950">
                      <video
                        src={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/85 transition-colors" />
                    </div>

                    {/* Top Context Tag */}
                    <div className="relative z-10 p-5 flex items-center justify-between">
                      {item.eventContext ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/15">
                          {item.eventContext}
                        </span>
                      ) : <span />}

                      <span className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold border border-white/20 group-hover:bg-burgundy transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="relative z-10 flex-1 flex items-center justify-center">
                      <div className="size-14 sm:size-16 rounded-full bg-gold/90 text-neutral-950 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                        <Play className="size-5 fill-neutral-950 ml-0.5 text-neutral-950" />
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="relative z-10 p-5 text-white pointer-events-none">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug drop-shadow-md">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs text-neutral-300 mt-1 font-sans line-clamp-1">
                          {item.subtitle}
                        </p>
                      )}
                      <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-gold font-semibold tracking-wider uppercase">
                        <span>WATCH REACTION</span>
                        <ArrowRight className="size-3.5 text-gold transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* -------------------------------------------------------------- */}
          {/* BOTTOM BOOKING CTA BANNER                                      */}
          {/* -------------------------------------------------------------- */}
          <div className="rounded-3xl bg-burgundy-section text-white p-8 sm:p-12 lg:p-14 text-center relative overflow-hidden shadow-2xl border border-gold/30">
            <div
              className="absolute -top-24 -right-24 size-64 rounded-full bg-gold/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 size-64 rounded-full bg-burgundy/40 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-gold uppercase mb-2 inline-block">
                ELEVATE YOUR EVENT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Ready to Make Your Celebration Unforgettable?
              </h2>
              <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed mb-8 max-w-lg mx-auto">
                Secure your date with Anchor Nikhil Gupta for weddings, sangeet nights, corporate summits, and milestone parties.
              </p>
              <Button
                asChild
                variant="bookNow"
                size="xl"
                className="rounded-xl px-9 py-4 text-sm sm:text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl"
              >
                <Link href="/book-now">
                  <Calendar className="size-4 mr-2" />
                  Book Anchor Nikhil Gupta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Video Lightbox Modal */}
      <VideoLightbox
        videos={testimonialVideoItems}
        currentIndex={videoIndex}
        isOpen={videoLightboxOpen}
        onClose={() => setVideoLightboxOpen(false)}
        onNavigate={(idx) => setVideoIndex(idx)}
      />
    </div>
  )
}
