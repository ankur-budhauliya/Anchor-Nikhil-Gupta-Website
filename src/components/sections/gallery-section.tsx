"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight, Images } from "lucide-react"
import { galleryCategoriesData, GalleryCategory } from "@/data/gallery"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"

interface FolderTileProps {
  category: GalleryCategory
}

function FolderTile({ category }: FolderTileProps) {
  const isHeic = category.coverImage.toLowerCase().endsWith(".heic")

  return (
    <motion.div
      variants={fadeInUp}
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
          <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-tight">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Tile Body */}
      <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 bg-white">
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-4">
          {category.subtitle}
        </p>

        {/* Explore Link */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <Link
            href={`/gallery/${category.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition-colors group-hover:translate-x-1 duration-200 gap-1.5"
          >
            <span>EXPLORE</span>
            <ArrowRight className="size-3.5 text-burgundy transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  const animateState = prefersReducedMotion || isInView ? "visible" : "hidden"

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative w-full bg-[#FDFCF9] py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-neutral-200/60"
    >
      <div className="container-hero relative z-10">
        {/* Section Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
            GALLERY
          </p>

          {/* Main Editorial Heading */}
          <h2
            id="gallery-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]"
          >
            Glimpses of the Moments I&apos;ve Hosted
          </h2>

          {/* Gold Accent Line */}
          <div
            className="h-[3px] w-14 bg-gold mx-auto mt-3.5 mb-4 rounded-full"
            aria-hidden="true"
          />


        </div>

        {/* Category Folders Overview Grid */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={animateState}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch mb-14 sm:mb-16"
        >
          {galleryCategoriesData.map((category) => (
            <FolderTile key={category.slug} category={category} />
          ))}
        </motion.div>

        {/* Section Closing Action CTA */}
        <div className="text-center pt-4">
          <Button
            asChild
            variant="burgundy"
            size="lg"
            className="rounded-lg px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-md hover:shadow-lg"
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
