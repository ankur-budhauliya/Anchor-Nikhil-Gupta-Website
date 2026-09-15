"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { useInView } from "motion/react"
import { Navbar } from "@/components/layout/navbar"
import {
  videoItemsData,
  videoCategoriesData,
  VideoItem,
} from "@/data/videos"
import { VideoLightbox } from "@/components/ui/video-lightbox"
import {
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
} from "lucide-react"

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
    <div
      ref={cardRef}
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

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gold bg-black/60 backdrop-blur-md border border-white/15 pointer-events-auto shadow-sm">
          <Sparkles className="size-3 text-gold" />
          <span>0{index + 1}</span>
        </span>
      </div>

      {/* Right-Side Action Rail */}
      <div className="absolute right-2 sm:right-3.5 bottom-16 sm:bottom-20 z-30 flex flex-col items-center gap-4 sm:gap-5 pointer-events-auto">
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
    </div>
  )
}

export default function CategoryVideoPage() {
  const params = useParams()
  const slug = params.slug as string

  const categoryConfig = videoCategoriesData.find((c) => c.slug === slug)

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [audibleReelId, setAudibleReelId] = React.useState<string | null>(null)

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  if (!categoryConfig) {
    notFound()
  }

  const categoryVideos = videoItemsData.filter((v) => v.category === categoryConfig.id)

  const handlePrev = () => {
    if (categoryVideos.length === 0) return
    setActiveIndex((prev) => (prev - 1 + categoryVideos.length) % categoryVideos.length)
  }

  const handleNext = () => {
    if (categoryVideos.length === 0) return
    setActiveIndex((prev) => (prev + 1) % categoryVideos.length)
  }

  const handleToggleMute = (reelId: string) => {
    setAudibleReelId((currentId) => (currentId === reelId ? null : reelId))
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4E0A16] text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-4">
            <Link
              href="/videos"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-hover transition-colors gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Video Categories</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-display text-lg sm:text-xl font-bold text-white">
                {categoryConfig.label}
              </span>
              <span className="text-xs font-semibold text-gold bg-black/60 border border-white/15 px-2.5 py-0.5 rounded-full">
                <Film className="size-3 text-gold inline mr-1" />
                {activeIndex + 1} / {categoryVideos.length}
              </span>
            </div>
          </div>

          {/* Page Intro Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-gold uppercase mb-2">
              VIDEO COLLECTION
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {categoryConfig.label} Videos
            </h1>
            <div className="h-[3px] w-14 bg-gold mx-auto mt-3.5 mb-4 rounded-full" />
            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-sans">
              {categoryConfig.subtitle}
            </p>
          </div>

          {/* Instagram-Reels-Inspired Vertical Video Carousel Stage */}
          <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[560px] sm:min-h-[620px] mb-12 select-none">
            {/* Desktop Left Navigation Button */}
            {categoryVideos.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 lg:left-8 z-40 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                aria-label="Previous video"
              >
                <ChevronLeft className="size-6 sm:size-7 text-gold" />
              </button>
            )}

            {/* Video Carousel Track */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 overflow-visible w-full py-4">
              {categoryVideos.map((reel, index) => {
                const isActive = index === activeIndex
                const isPrev = index === (activeIndex - 1 + categoryVideos.length) % categoryVideos.length
                const isNext = index === (activeIndex + 1) % categoryVideos.length

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
            </div>

            {/* Desktop Right Navigation Button */}
            {categoryVideos.length > 1 && (
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
          {categoryVideos.length > 1 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {categoryVideos.map((_, idx) => (
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
      </main>

      {/* Video Lightbox Modal */}
      <VideoLightbox
        videos={categoryVideos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  )
}
