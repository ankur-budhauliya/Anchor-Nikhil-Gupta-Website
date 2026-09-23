"use client"

import * as React from "react"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { videoItemsData, videoCategoriesData, VideoCategoryConfig } from "@/data/videos"
import { ArrowLeft, ArrowRight, Film } from "lucide-react"

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

function CategoryCard({ category, itemCount }: { category: VideoCategoryConfig; itemCount: number }) {
  return (
    <Link
      href={`/videos/${category.slug}`}
      aria-label={`Explore ${category.label} videos`}
      className="group relative flex flex-col justify-end aspect-[9/16] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-burgundy/40"
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

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 pointer-events-none" />

      {/* Video Count Pill Badge */}
      <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-black/60 backdrop-blur-xs border border-white/20 shadow-sm">
          <span>{itemCount} {itemCount === 1 ? "Video" : "Videos"}</span>
        </span>
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
          {category.label}
        </h2>

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
  )
}

export default function VideosPage() {
  const totalVideosCount = React.useMemo(() => {
    return videoItemsData.length
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Back Navigation */}
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
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
              OFFICIAL VIDEO HUB
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Stage Shows &amp; Reels
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Explore video collections by selecting an event folder below: Games, Reels, Testimonials, and UWI highlights.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Film className="size-4 text-gold" />
              <span>{totalVideosCount} Videos Across {videoCategoriesData.length} Categories</span>
            </div>
          </div>

          {/* 4 Category Cards: 1-col on Mobile, 2x2 on Tablet, 4x1 on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-5 xl:gap-6 max-w-[320px] sm:max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto mb-16">
            {videoCategoriesData.map((category: VideoCategoryConfig) => {
              const count = videoItemsData.filter((v) => v.category === category.id).length
              return <CategoryCard key={category.id} category={category} itemCount={count} />
            })}
          </div>

          {/* Social CTA Bar */}
          <div className="text-center max-w-xl mx-auto p-6 rounded-2xl bg-white border border-neutral-200 shadow-lg">
            <p className="font-sans text-xs font-bold tracking-[0.2em] text-burgundy uppercase mb-3">
              FOLLOW THE JOURNEY
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <a
                href="https://www.instagram.com/anchor_nikhil_gupta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 transition-colors border border-neutral-200"
              >
                <InstagramIcon className="size-4 text-burgundy" />
                <span>@anchor_nikhil_gupta</span>
              </a>
              <a
                href="https://www.youtube.com/@19nikhilgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 transition-colors border border-neutral-200"
              >
                <YoutubeIcon className="size-4 text-burgundy" />
                <span>@19nikhilgupta</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
