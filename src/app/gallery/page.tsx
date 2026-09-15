"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { galleryCategoriesData, GalleryCategory } from "@/data/gallery"
import { ArrowLeft, Folder, Images, ArrowRight } from "lucide-react"

export default function GalleryPage() {
  const totalPhotosCount = React.useMemo(() => {
    return galleryCategoriesData.reduce((acc, c) => acc + c.images.length, 0)
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
              GALLERY
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Photo Collections &amp; Media
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Select any event category below to view full-resolution photographs organized by ceremony, event type, and publicity creative.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Images className="size-4 text-gold" />
              <span>{totalPhotosCount} Photographs Across {galleryCategoriesData.length} Collections</span>
            </div>
          </div>

          {/* Folder Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch mb-12">
            {galleryCategoriesData.map((category: GalleryCategory) => {
              const isHeic = category.coverImage.toLowerCase().endsWith(".heic")

              return (
                <Link
                  key={category.slug}
                  href={`/gallery/${category.slug}`}
                  className="group relative flex flex-col h-full rounded-2xl bg-white border border-neutral-200/80 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Category Cover Image Header */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                    <Image
                      src={category.coverImage}
                      alt={`Gallery category — ${category.title}`}
                      fill
                      unoptimized={isHeic}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Photo Count Pill Badge */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-white bg-black/60 backdrop-blur-xs border border-white/20 shadow-sm">
                        <Images className="size-3.5 text-gold" />
                        <span>{category.images.length} {category.images.length === 1 ? "Photo" : "Photos"}</span>
                      </span>
                    </div>

                    {/* Title overlay at bottom of cover */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Folder className="size-4 text-gold shrink-0 fill-gold/20" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
                          Collection
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
                        {category.title}
                      </h2>
                    </div>
                  </div>

                  {/* Tile Body */}
                  <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 bg-white">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-4">
                      {category.subtitle}
                    </p>

                    {/* Explore Link */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy group-hover:text-burgundy-hover transition-colors gap-1.5">
                        <span>EXPLORE</span>
                        <ArrowRight className="size-3.5 text-burgundy transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
