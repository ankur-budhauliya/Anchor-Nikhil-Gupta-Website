"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { galleryCategoriesData } from "@/data/gallery"
import { Lightbox } from "@/components/ui/lightbox"
import { ArrowLeft, Images, Folder } from "lucide-react"

export default function CategoryGalleryPage() {
  const params = useParams()
  const slug = params.slug as string

  const category = galleryCategoriesData.find((c) => c.slug === slug)

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  if (!category) {
    notFound()
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-burgundy">
            <Link
              href="/gallery"
              className="inline-flex items-center hover:text-burgundy-hover transition-colors gap-1.5"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Gallery</span>
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-600 truncate">{category.title}</span>
          </div>

          {/* Category Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-burgundy/10 border border-burgundy/20 text-xs font-bold tracking-widest text-burgundy uppercase mb-3">
              <Folder className="size-3.5 text-burgundy fill-burgundy/20" />
              <span>GALLERY</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              {category.title}
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              {category.description}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Images className="size-4 text-gold" />
              <span>{category.images.length} {category.images.length === 1 ? "Photograph" : "Photographs"}</span>
            </div>
          </div>

          {/* Photo Collection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {category.images.map((photo, index) => {
              const isHeic = photo.src.toLowerCase().endsWith(".heic")

              return (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title || `${category.title} photo ${index + 1}`}
                    fill
                    unoptimized={isHeic}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <p className="text-xs font-semibold tracking-wide truncate">
                      {photo.title || "Inspect Photograph"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Lightbox Modal strictly scoped to this folder's photos */}
      <Lightbox
        images={category.images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  )
}
