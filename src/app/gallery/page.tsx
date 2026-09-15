"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { galleryCategoriesData } from "@/data/gallery"
import { Lightbox } from "@/components/ui/lightbox"
import { ArrowLeft } from "lucide-react"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all")
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  // Filtered photos list
  const activePhotos = React.useMemo(() => {
    if (activeCategory === "all") {
      return galleryCategoriesData.flatMap((cat) => cat.images)
    }
    const cat = galleryCategoriesData.find((c) => c.slug === activeCategory)
    return cat ? cat.images : []
  }, [activeCategory])

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

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
              OFFICIAL GALLERY
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Event Photography &amp; Media
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Explore photo collections categorized by wedding ceremonies, milestone occasions, corporate summits, stage portraits, and posters.
            </p>
          </div>

          {/* Category Filter Tabs / Folders */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                activeCategory === "all"
                  ? "bg-burgundy text-white border-burgundy shadow-md"
                  : "bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200"
              }`}
            >
              All Photos ({galleryCategoriesData.reduce((acc, c) => acc + c.images.length, 0)})
            </button>

            {galleryCategoriesData.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  activeCategory === cat.slug
                    ? "bg-burgundy text-white border-burgundy shadow-md"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200"
                }`}
              >
                {cat.title} ({cat.images.length})
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {activePhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <Image
                  src={photo.src}
                  alt={photo.title || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <p className="text-xs font-semibold tracking-wide truncate">
                    {photo.title || "View Photograph"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <Lightbox
        images={activePhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  )
}
