"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import {
  videoItemsData,
  videoCategoriesData,
  VideoCategoryConfig,
} from "@/data/videos"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"

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

interface CategoryCardProps {
  category: VideoCategoryConfig
  itemCount: number
}

function CategoryCard({ category, itemCount }: CategoryCardProps) {
  return (
    <motion.div variants={fadeInUp} className="w-full">
      <Link
        href={`/videos/${category.slug}`}
        aria-label={`Explore ${category.label} videos`}
        className="group relative flex flex-col justify-end aspect-[9/16] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-white/15 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 hover:border-gold/50 cursor-pointer block"
        style={{ aspectRatio: "9 / 16" }}
      >
        {/* Background Video Preview — muted, looping, autoplay */}
        <video
          src={category.previewVideo}
          poster={category.previewImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          aria-hidden="true"
        />

        {/* Dark Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 pointer-events-none" />

        {/* Video Count Pill Badge */}
        <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-black/60 backdrop-blur-xs border border-white/20 shadow-sm">
            <span>{itemCount} {itemCount === 1 ? "Video" : "Videos"}</span>
          </span>
        </div>

        {/* Card Content Overlay */}
        <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
            {category.label}
          </h3>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans mt-1 mb-2.5 line-clamp-2">
            {category.subtitle}
          </p>

          {/* Explore Link */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-hover transition-colors gap-1.5">
              <span>EXPLORE</span>
              <ArrowRight className="size-3.5 text-gold transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ReelsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  const animateState = prefersReducedMotion || isInView ? "visible" : "hidden"

  return (
    <section
      id="videos"
      aria-labelledby="reels-heading"
      className="relative w-full bg-[#4E0A16] border-b border-white/10 py-16 sm:py-20 lg:py-24 overflow-hidden text-white"
    >
      {/* Background Glow Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10">
        {/* Section Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-gold uppercase mb-2">
            VIDEOS
          </p>

          <h2
            id="reels-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
          >
            The Energy, On Camera
          </h2>

          <div
            className="h-[3px] w-14 bg-gold mx-auto mt-3.5 mb-4 rounded-full"
            aria-hidden="true"
          />


        </div>

        {/* 4 Category Cards: 1-col mobile, 2-col tablet, 4-col desktop in 9:16 vertical aspect ratio */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={animateState}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-5 xl:gap-6 max-w-[320px] sm:max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto mb-14"
        >
          {videoCategoriesData.map((category) => {
            const count = videoItemsData.filter((v) => v.category === category.id).length
            return (
              <CategoryCard
                key={category.id}
                category={category}
                itemCount={count}
              />
            )
          })}
        </motion.div>

        {/* Social Media Follow Bar */}
        <div className="text-center max-w-xl mx-auto p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-xl mb-10">
          <p className="font-sans text-xs font-bold tracking-[0.2em] text-gold uppercase mb-3">
            FOLLOW THE JOURNEY
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-semibold">
            {/* Instagram Profile */}
            <a
              href="https://www.instagram.com/anchor_nikhil_gupta/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 shadow-md"
            >
              <InstagramIcon className="size-4 text-gold" />
              <span>Follow @anchor_nikhil_gupta</span>
            </a>

            {/* YouTube Profile */}
            <a
              href="https://www.youtube.com/@19nikhilgupta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 shadow-md"
            >
              <YoutubeIcon className="size-4 text-gold" />
              <span>Subscribe @19nikhilgupta</span>
            </a>
          </div>
        </div>

        {/* Section Closing Action CTA: EXPLORE GALLERY */}
        <div className="text-center">
          <Button
            asChild
            variant="bookNow"
            size="lg"
            className="rounded-lg px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-lg hover:shadow-xl"
          >
            <Link href="/gallery/all">
              EXPLORE GALLERY
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
