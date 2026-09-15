"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { videoItemsData, videoCategoriesData, VideoCategoryConfig } from "@/data/videos"
import { ArrowLeft, ArrowRight, Film, Video } from "lucide-react"

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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  )
}

function CategoryCard({ category, itemCount }: { category: VideoCategoryConfig; itemCount: number }) {
  return (
    <Link
      href={`/videos/${category.slug}`}
      className="group relative flex flex-col justify-end aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-burgundy/40"
    >
      {/* Background Image Preview */}
      <Image
        src={category.previewImage}
        alt={`${category.label} Video Collection Preview`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

      {/* Video Count Pill Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white bg-black/60 backdrop-blur-xs border border-white/20 shadow-sm">
          <Film className="size-3.5 text-gold" />
          <span>{itemCount} {itemCount === 1 ? "Video" : "Videos"}</span>
        </span>
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end text-white">
        <div className="flex items-center gap-2 mb-1.5">
          <Video className="size-4 text-gold shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
            Video Collection
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          {category.label}
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mt-1 mb-4 max-w-md">
          {category.subtitle}
        </p>

        {/* Explore Link */}
        <div className="pt-3 border-t border-white/15 flex items-center justify-between">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-hover transition-colors gap-1.5">
            <span>EXPLORE COLLECTION</span>
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
              <span>{totalVideosCount} Videos Across {videoCategoriesData.length} Collections</span>
            </div>
          </div>

          {/* 4 Category Cards 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto mb-16">
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
