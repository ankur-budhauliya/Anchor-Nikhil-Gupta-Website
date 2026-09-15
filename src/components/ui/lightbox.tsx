"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { GalleryImage } from "@/data/gallery"

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex]

  const handlePrevious = React.useCallback(() => {
    if (images.length === 0) return
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    onNavigate(prevIndex)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = React.useCallback(() => {
    if (images.length === 0) return
    const nextIndex = (currentIndex + 1) % images.length
    onNavigate(nextIndex)
  }, [currentIndex, images.length, onNavigate])

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, handlePrevious, handleNext])

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 text-white">
            {/* Image Counter */}
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold tracking-wider font-sans border border-white/15">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close Lightbox"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Left Arrow Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Previous Image"
            >
              <ChevronLeft className="size-6 sm:size-7" />
            </button>
          )}

          {/* Main Large Image Container */}
          <div className="relative w-full max-w-5xl h-[75vh] sm:h-[82vh] flex flex-col items-center justify-center my-auto">
            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.title || `Gallery Image ${currentIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Right Arrow Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Next Image"
            >
              <ChevronRight className="size-6 sm:size-7" />
            </button>
          )}

          {/* Bottom Title Bar */}
          {currentImage.title && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 text-center max-w-lg px-4">
              <p className="font-display text-sm sm:text-base text-neutral-100 font-semibold tracking-wide drop-shadow-md">
                {currentImage.title}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
