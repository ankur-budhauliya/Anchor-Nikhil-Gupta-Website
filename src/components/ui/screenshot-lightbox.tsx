"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react"
import { WhatsAppFeedbackItem } from "@/data/testimonials"

interface ScreenshotLightboxProps {
  items: WhatsAppFeedbackItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ScreenshotLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ScreenshotLightboxProps) {
  const currentItem = items[currentIndex]

  const handlePrevious = React.useCallback(() => {
    if (items.length === 0) return
    const prevIndex = (currentIndex - 1 + items.length) % items.length
    onNavigate(prevIndex)
  }, [currentIndex, items.length, onNavigate])

  const handleNext = React.useCallback(() => {
    if (items.length === 0) return
    const nextIndex = (currentIndex + 1) % items.length
    onNavigate(nextIndex)
  }, [currentIndex, items.length, onNavigate])

  // Keyboard navigation & body scroll locking
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
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, handlePrevious, handleNext])

  if (!isOpen || !currentItem) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Feedback Screenshot Viewer"
          onClick={onClose}
        >
          {/* Top Bar Header */}
          <div
            className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between z-50 text-white pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Client Attribution Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 pointer-events-auto">
              <MessageSquare className="size-3.5 text-gold shrink-0" />
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-white font-medium">{currentItem.clientName}</span>
                <span className="text-white/40">•</span>
                <span className="text-gold text-[11px]">{currentItem.eventContext}</span>
              </div>
            </div>

            {/* Counter & Close Buttons */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-neutral-300 border border-white/15 font-sans">
                {currentIndex + 1} / {items.length}
              </span>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Close Viewer"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Left Navigation Chevron */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold shadow-2xl"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="size-5 sm:size-6 text-gold" />
            </button>
          )}

          {/* Screenshot Display Frame */}
          <div
            className="relative max-w-full max-h-[88vh] flex flex-col items-center justify-center my-auto z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[82vh] aspect-[1080/2400] w-auto rounded-2xl overflow-hidden bg-neutral-900 border border-white/20 shadow-2xl"
            >
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 768px) 90vw, 450px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Verbatim Snippet Quote Pill */}
            {currentItem.quoteSnippet && (
              <div className="mt-3 max-w-md px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-center">
                <p className="text-xs text-neutral-200 italic font-sans flex items-center justify-center gap-1.5">
                  <Quote className="size-3 text-gold shrink-0 inline" />
                  <span>&ldquo;{currentItem.quoteSnippet}&rdquo;</span>
                </p>
              </div>
            )}
          </div>

          {/* Right Navigation Chevron */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold shadow-2xl"
              aria-label="Next screenshot"
            >
              <ChevronRight className="size-5 sm:size-6 text-gold" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
