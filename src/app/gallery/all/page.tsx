"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { allGalleryImages, GalleryImage } from "@/data/gallery"
import { Lightbox } from "@/components/ui/lightbox"
import { ArrowLeft, Images, Folder } from "lucide-react"

export default function AllPhotosGalleryPage() {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Breadcrumb Navigation Header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-burgundy">
              <Link
                href="/"
                className="inline-flex items-center hover:text-burgundy-hover transition-colors gap-1.5"
              >
                <ArrowLeft className="size-4" />
                <span>Back to Home</span>
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-600 truncate">All Photographs</span>
            </div>

            {/* Link to folder-based category view */}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors"
            >
              <Folder className="size-3.5 text-burgundy" />
              <span>Browse by Category</span>
            </Link>
          </div>

          {/* Page Intro Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
              ALL PHOTOGRAPHS
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Complete Event Photo Gallery
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Explore all captured moments across weddings, milestone birthdays, corporate summits, and concert stages.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Images className="size-4 text-gold" />
              <span>{allGalleryImages.length} Photographs Available</span>
            </div>
          </div>

          {/* 4-Column Responsive Photo Grid (Desktop 4 cols, Tablet 3 cols, Mobile 2 cols) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-16">
            {allGalleryImages.map((photo: GalleryImage, index: number) => {
              const isHeic = photo.src.toLowerCase().endsWith(".heic")

              return (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title || `Photograph ${index + 1}`}
                    fill
                    unoptimized={isHeic}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-white">
                    <p className="text-xs sm:text-sm font-semibold tracking-wide truncate">
                      {photo.title || "View Full Resolution"}
                    </p>
                    {photo.caption && (
                      <p className="text-[11px] text-gold/90 font-medium truncate mt-0.5">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Lightbox Modal Navigating Through ALL 65 Photos */}
      <Lightbox
        images={allGalleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  )
}
