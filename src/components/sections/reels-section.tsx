"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Music,
  Check,
  Sparkles,
  Film,
  Video,
} from "lucide-react"
import {
  videoItemsData,
  videoCategoriesData,
  VideoItem,
  VideoCategoryConfig,
  VideoCategory,
} from "@/data/videos"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { VideoLightbox } from "@/components/ui/video-lightbox"

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

interface CategoryCardProps {
  category: VideoCategoryConfig
  itemCount: number
  onSelect: () => void
}

function CategoryCard({ category, itemCount, onSelect }: CategoryCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      onClick={onSelect}
      className="group relative flex flex-col justify-end aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-white/15 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 hover:border-gold/50 cursor-pointer"
    >
      {/* Background Image Preview */}
      <Image
        src={category.previewImage}
        alt={`${category.label} Collection Preview`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

      {/* Video Count Pill Badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-black/60 backdrop-blur-xs border border-white/20 shadow-sm">
          <Film className="size-3 text-gold" />
          <span>{itemCount} {itemCount === 1 ? "Video" : "Videos"}</span>
        </span>
      </div>

      {/* Card Content Overlay */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end text-white">
        <div className="flex items-center gap-1.5 mb-1">
          <Video className="size-3.5 text-gold shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold">
            Collection
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
          {category.label}
        </h3>

        <p className="text-xs text-neutral-300 leading-relaxed font-sans mt-1 mb-3 line-clamp-2">
          {category.subtitle}
        </p>

        {/* Explore Link */}
        <div className="pt-2.5 border-t border-white/15 flex items-center justify-between">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-hover transition-colors gap-1.5">
            <span>EXPLORE</span>
            <ArrowRight className="size-3.5 text-gold transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

interface ReelCardProps {
  reel: VideoItem
  index: number
  isActive: boolean
  isAudible: boolean
  onToggleMute: (reelId: string) => void
  onOpenLightbox: (index: number) => void
  onSelect: () => void
}

function ReelCard({
  reel,
  index,
  isActive,
  isAudible,
  onToggleMute,
  onOpenLightbox,
  onSelect,
}: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const isInView = useInView(cardRef, { margin: "-20% 0px -20% 0px" })

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [copiedToast, setCopiedToast] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  // Sync video properties & playback state
  React.useEffect(() => {
    const videoElem = videoRef.current
    if (!videoElem) return

    videoElem.muted = !isAudible
    if (isAudible) {
      videoElem.volume = 1
    }

    if (isActive && isInView) {
      videoElem.play().catch(() => {
        // Autoplay policy or user interrupt
      })
    } else {
      videoElem.pause()
    }
  }, [isActive, isInView, isAudible])

  // Track playback time progress for the bottom bar
  const handleTimeUpdate = () => {
    const videoElem = videoRef.current
    if (!videoElem || !videoElem.duration) return
    const currentProgress = (videoElem.currentTime / videoElem.duration) * 100
    setProgress(currentProgress)
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isActive) {
      onSelect()
      return
    }

    const videoElem = videoRef.current
    if (!videoElem) return

    if (videoElem.paused) {
      videoElem.play().catch(() => {})
    } else {
      videoElem.pause()
    }
  }

  const handleMuteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoElem = videoRef.current
    if (!videoElem) return

    const willBeAudible = !isAudible
    videoElem.muted = !willBeAudible
    if (willBeAudible) {
      videoElem.volume = 1
      if (videoElem.paused) {
        videoElem.play().catch(() => {})
      }
    }
    onToggleMute(reel.id)
  }

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked((prev) => !prev)
  }

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved((prev) => !prev)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const shareData = {
      title: `${reel.title} - Anchor Nikhil Gupta`,
      text: `Check out Anchor Nikhil Gupta's video: ${reel.title}`,
      url: typeof window !== "undefined" ? window.location.href : "https://www.instagram.com/anchor_nikhil_gupta/",
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // Share sheet cancelled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url)
        setCopiedToast(true)
        setTimeout(() => setCopiedToast(false), 2000)
      } catch {
        // Clipboard fallback
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      onClick={() => {
        if (!isActive) {
          onSelect()
        }
      }}
      className={`group relative shrink-0 transition-all duration-500 rounded-3xl overflow-hidden bg-neutral-950 border ${
        isActive
          ? "w-[280px] sm:w-[320px] md:w-[340px] aspect-[9/16] border-gold/50 shadow-[0_12px_40px_rgba(0,0,0,0.8)] scale-100 z-20 cursor-pointer"
          : "w-[220px] sm:w-[250px] md:w-[270px] aspect-[9/16] border-white/10 opacity-45 blur-[0.5px] hover:opacity-75 scale-90 z-10 cursor-pointer hidden sm:block"
      }`}
    >
      {/* 9:16 HTML5 Video Element */}
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        loop
        muted={!isAudible}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
      />

      {/* Ambient Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

      {/* Top Header Overlay */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-30 pointer-events-none">
        {/* Profile Avatar & Username */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="relative size-8 rounded-full overflow-hidden border border-white/30 bg-neutral-800 shrink-0 shadow-md">
            <Image
              src="/images/PROFILE/976A4397.JPG"
              alt="Anchor Nikhil Gupta"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold text-white tracking-wide drop-shadow-md">
              @anchor_nikhil_gupta
            </span>
            <span className="font-sans text-[10px] text-gold/90 font-medium">
              Event Anchor &amp; Host
            </span>
          </div>
        </div>

        {/* Reel Badge */}
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gold bg-black/60 backdrop-blur-md border border-white/15 pointer-events-auto shadow-sm">
          <Sparkles className="size-3 text-gold" />
          <span>0{index + 1}</span>
        </span>
      </div>

      {/* Right-Side Action Rail */}
      <div className="absolute right-2 sm:right-3.5 bottom-16 sm:bottom-20 z-30 flex flex-col items-center gap-4 sm:gap-5 pointer-events-auto">
        {/* Like Button */}
        <button
          onClick={handleLikeToggle}
          className="flex flex-col items-center group/btn focus:outline-none"
          aria-label={isLiked ? "Unlike video" : "Like video"}
        >
          <div className="size-9 sm:size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover/btn:scale-110 shadow-lg">
            <Heart
              className={`size-4 sm:size-5 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold text-white/90 mt-1 drop-shadow-md">
            {isLiked ? "Liked" : "Like"}
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center group/btn focus:outline-none"
          aria-label="Share video"
        >
          <div className="size-9 sm:size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover/btn:scale-110 shadow-lg">
            {copiedToast ? (
              <Check className="size-4 sm:size-5 text-green-400" />
            ) : (
              <Share2 className="size-4 sm:size-5 text-white" />
            )}
          </div>
          <span className="text-[10px] font-semibold text-white/90 mt-1 drop-shadow-md">
            {copiedToast ? "Copied" : "Share"}
          </span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSaveToggle}
          className="flex flex-col items-center group/btn focus:outline-none"
          aria-label={isSaved ? "Unsave video" : "Save video"}
        >
          <div className="size-9 sm:size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover/btn:scale-110 shadow-lg">
            <Bookmark
              className={`size-4 sm:size-5 transition-colors ${
                isSaved ? "fill-gold text-gold" : "text-white"
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold text-white/90 mt-1 drop-shadow-md">
            {isSaved ? "Saved" : "Save"}
          </span>
        </button>

        {/* Mute / Unmute Button */}
        <button
          onClick={handleMuteClick}
          className="flex flex-col items-center group/btn focus:outline-none"
          aria-label={isAudible ? "Turn sound off" : "Turn sound on"}
        >
          <div className="size-9 sm:size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover/btn:scale-110 shadow-lg">
            {isAudible ? (
              <Volume2 className="size-4 sm:size-5 text-gold" />
            ) : (
              <VolumeX className="size-4 sm:size-5 text-neutral-300" />
            )}
          </div>
          <span className="text-[10px] font-semibold text-white/90 mt-1 drop-shadow-md">
            {isAudible ? "Mute" : "Unmute"}
          </span>
        </button>
      </div>

      {/* Center Click-to-Play/Pause Overlay */}
      <div
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
      >
        {!isPlaying && (
          <div className="size-14 rounded-full bg-burgundy/85 backdrop-blur-md border border-gold/40 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110">
            <Play className="size-6 fill-white ml-0.5" />
          </div>
        )}
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute bottom-3.5 left-3.5 right-14 z-30 text-white pointer-events-none">
        <p className="font-display text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-md">
          {reel.title}
        </p>

        {reel.subtitle && (
          <p className="font-sans text-[11px] text-gold font-semibold tracking-wide mt-0.5">
            {reel.subtitle}
          </p>
        )}

        {/* Audio Track Tag */}
        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-neutral-300 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit border border-white/10">
          <Music className="size-3 text-gold animate-pulse" />
          <span className="truncate max-w-[140px] sm:max-w-[170px]">
            ♪ Event Audio • Anchor Nikhil Gupta
          </span>
        </div>
      </div>

      {/* Bottom Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-30 pointer-events-none">
        <div
          className="h-full bg-gold transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Expand / Lightbox Button in Corner */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onOpenLightbox(index)
        }}
        className="absolute top-3.5 right-3.5 z-40 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors hidden group-hover:block"
        aria-label="Expand video in viewer"
      >
        <Sparkles className="size-3 text-gold" />
      </button>
    </motion.div>
  )
}

export function ReelsSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  // State: null when on 4-category cards selection view, or VideoCategory when viewing a specific collection
  const [selectedCategory, setSelectedCategory] = React.useState<VideoCategory | null>(null)

  // Active video index inside selected category
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [audibleReelId, setAudibleReelId] = React.useState<string | null>(null)

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  // Get current active category config & video list
  const activeCategoryConfig = React.useMemo(() => {
    if (!selectedCategory) return null
    return videoCategoriesData.find((c) => c.id === selectedCategory) || null
  }, [selectedCategory])

  const activeVideoList = React.useMemo(() => {
    if (!selectedCategory) return []
    return videoItemsData.filter((v) => v.category === selectedCategory)
  }, [selectedCategory])

  const handleSelectCategoryCard = (cat: VideoCategory) => {
    setSelectedCategory(cat)
    setActiveIndex(0)
    setAudibleReelId(null)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setActiveIndex(0)
    setAudibleReelId(null)
  }

  const handlePrev = React.useCallback(() => {
    if (activeVideoList.length === 0) return
    setActiveIndex((prev) => (prev - 1 + activeVideoList.length) % activeVideoList.length)
  }, [activeVideoList.length])

  const handleNext = React.useCallback(() => {
    if (activeVideoList.length === 0) return
    setActiveIndex((prev) => (prev + 1) % activeVideoList.length)
  }, [activeVideoList.length])

  const handleToggleMute = (reelId: string) => {
    setAudibleReelId((currentId) => (currentId === reelId ? null : reelId))
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Keyboard Navigation when category is open
  React.useEffect(() => {
    if (!selectedCategory) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        handleBackToCategories()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedCategory, handlePrev, handleNext])

  // Mobile Swipe Gesture Handlers
  const touchStartX = React.useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartX.current = null
  }

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
            IN ACTION
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

          <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Experience Anchor Nikhil Gupta live on stage — high-voltage crowd engagement, grand wedding entries, and electrifying stage games.
          </p>
        </div>

        {/* CONDITIONAL RENDER: 4 Category Cards 4x1 Horizontal Desktop Grid OR Selected Category Reel Viewer */}
        {!selectedCategory ? (
          /* View 1: 4 Category Cards 4x1 Desktop Grid Overview */
          <motion.div
            ref={containerRef}
            variants={staggerContainer}
            initial="hidden"
            animate={animateState}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch max-w-7xl mx-auto mb-12"
          >
            {videoCategoriesData.map((catConfig) => {
              const count = videoItemsData.filter((v) => v.category === catConfig.id).length
              return (
                <CategoryCard
                  key={catConfig.id}
                  category={catConfig}
                  itemCount={count}
                  onSelect={() => handleSelectCategoryCard(catConfig.id)}
                />
              )
            })}
          </motion.div>
        ) : (
          /* View 2: Selected Category Instagram-Style Vertical Reel Viewer */
          <div className="max-w-5xl mx-auto">
            {/* Top Navigation Bar: Back to Categories & Collection Title */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-hover transition-colors gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold px-3 py-1.5 rounded-full bg-white/10 border border-white/15"
                aria-label="Back to video categories"
              >
                <ArrowLeft className="size-4" />
                <span>Back to Video Categories</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-white">
                  {activeCategoryConfig?.label}
                </span>
                <span className="text-xs font-semibold text-gold bg-black/60 border border-white/15 px-2.5 py-0.5 rounded-full">
                  {activeIndex + 1} / {activeVideoList.length}
                </span>
              </div>
            </div>

            {/* Instagram-Reels-Inspired Vertical Video Carousel Stage */}
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative flex items-center justify-center min-h-[560px] sm:min-h-[620px] mb-10 select-none"
            >
              {/* Desktop Left Navigation Button */}
              {activeVideoList.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 lg:left-8 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="size-6 sm:size-7 text-gold" />
                </button>
              )}

              {/* Video Carousel Track */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={animateState}
                className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 overflow-visible w-full py-4"
              >
                {activeVideoList.map((reel, index) => {
                  const isActive = index === activeIndex

                  // Only render active video and immediate neighbors on larger screens
                  const isPrev = index === (activeIndex - 1 + activeVideoList.length) % activeVideoList.length
                  const isNext = index === (activeIndex + 1) % activeVideoList.length

                  if (!isActive && !isPrev && !isNext) {
                    return null
                  }

                  return (
                    <ReelCard
                      key={reel.id}
                      reel={reel}
                      index={index}
                      isActive={isActive}
                      isAudible={audibleReelId === reel.id}
                      onToggleMute={handleToggleMute}
                      onOpenLightbox={handleOpenLightbox}
                      onSelect={() => setActiveIndex(index)}
                    />
                  )
                })}
              </motion.div>

              {/* Desktop Right Navigation Button */}
              {activeVideoList.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 lg:right-8 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  aria-label="Next video"
                >
                  <ChevronRight className="size-6 sm:size-7 text-gold" />
                </button>
              )}
            </div>

            {/* Carousel Dots / Counter Pill */}
            {activeVideoList.length > 1 && (
              <div className="flex items-center justify-center gap-2 mb-10">
                {activeVideoList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-7 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to video ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Media Follow Bar */}
        <div className="text-center max-w-xl mx-auto p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-xl">
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

        {/* Section Closing Action CTA */}
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="bookNow"
            size="lg"
            className="rounded-lg px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-lg hover:shadow-xl"
          >
            <Link href="/videos">
              VIEW ALL VIDEO COLLECTIONS
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <VideoLightbox
        videos={activeVideoList.length > 0 ? activeVideoList : videoItemsData}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  )
}
