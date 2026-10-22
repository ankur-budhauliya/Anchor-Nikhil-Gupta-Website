"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"

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
  Check,
  Sparkles,
  Film,
  AlertCircle,
  ChevronDown,
} from "lucide-react"

interface ReelCardProps {
  reel: VideoItem
  index: number
  totalCount: number
  isActive: boolean
  isAudible: boolean
  isLightboxOpen?: boolean
  onToggleMute: () => void
  onOpenLightbox: (index: number) => void
  onVideoEnded: () => void
}

function ReelCard({
  reel,
  index,
  totalCount,
  isActive,
  isAudible,
  isLightboxOpen = false,
  onToggleMute,
  onOpenLightbox,
  onVideoEnded,
}: ReelCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [copiedToast, setCopiedToast] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [autoplayFailed, setAutoplayFailed] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const isMutedUI = !isActive || !isAudible || autoplayFailed

  // Sync video properties & playback state
  React.useEffect(() => {
    const videoElem = videoRef.current
    if (!videoElem) return

    const shouldPlay = isActive && !isLightboxOpen

    if (shouldPlay) {
      if (isAudible && !autoplayFailed) {
        videoElem.muted = false
        videoElem.volume = 1
      } else {
        videoElem.muted = true
      }

      const playPromise = videoElem.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted autoplay if unmuted playback is blocked by browser policy
          if (videoElem && !videoElem.muted) {
            videoElem.muted = true
            setAutoplayFailed(true)
            videoElem.play().catch(() => {})
          }
        })
      }
    } else {
      videoElem.pause()
      videoElem.muted = true
    }
  }, [isActive, isAudible, isLightboxOpen, autoplayFailed])

  const handleTimeUpdate = () => {
    const videoElem = videoRef.current
    if (!videoElem || !videoElem.duration) return
    const currentProgress = (videoElem.currentTime / videoElem.duration) * 100
    setProgress(currentProgress)
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoElem = videoRef.current
    if (!videoElem) return

    if (videoElem.paused) {
      const playPromise = videoElem.play()
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {})
      }
    } else {
      videoElem.pause()
      setIsPlaying(false)
    }
  }

  const handleMuteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoElem = videoRef.current
    if (!videoElem) return

    setAutoplayFailed(false)
    const willBeAudible = !isAudible
    videoElem.muted = !willBeAudible
    if (willBeAudible) {
      videoElem.volume = 1
      if (videoElem.paused) {
        videoElem.play().catch(() => {})
      }
    }
    onToggleMute()
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
      text: `Watch Anchor Nikhil Gupta: ${reel.title}`,
      url: typeof window !== "undefined" ? window.location.href : "https://www.instagram.com/anchor_nikhil_gupta/",
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // Share sheet dismissed
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
      className={`group relative aspect-[9/16] w-full max-w-[360px] sm:max-w-[380px] md:max-w-[400px] h-[92%] max-h-[760px] rounded-3xl overflow-hidden bg-neutral-950 border transition-all duration-300 shadow-2xl ${
        isActive
          ? "border-gold/50 ring-1 ring-gold/30 shadow-[0_16px_50px_rgba(0,0,0,0.85)] scale-100"
          : "border-white/10 opacity-70 scale-[0.96]"
      }`}
    >
      {/* 9:16 HTML5 Video Element */}
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted={isMutedUI}
        playsInline
        preload={isActive || index === 0 ? "auto" : "metadata"}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onVideoEnded}
        onError={() => setHasError(true)}
        onLoadedData={() => setHasError(false)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out select-none"
      />

      {/* Error Fallback Overlay */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-neutral-950/90 z-20">
          <AlertCircle className="size-8 text-gold/80 mb-2" />
          <p className="text-sm font-semibold text-white">Video temporarily unavailable</p>
          <p className="text-xs text-neutral-400 mt-1">Unable to stream video</p>
        </div>
      )}

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
              sizes="32px"
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
          <span>
            {String(index + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
          </span>
        </span>
      </div>

      {/* Right-Side Action Rail */}
      <div className="absolute right-2 sm:right-3.5 bottom-16 sm:bottom-20 z-30 flex flex-col items-center gap-4 sm:gap-5 pointer-events-auto">
        <button
          onClick={handleLikeToggle}
          className="flex flex-col items-center group/btn focus:outline-none cursor-pointer"
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
          className="flex flex-col items-center group/btn focus:outline-none cursor-pointer"
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
          className="flex flex-col items-center group/btn focus:outline-none cursor-pointer"
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
          className="flex flex-col items-center group/btn focus:outline-none cursor-pointer"
          aria-label={!isMutedUI ? "Turn sound off" : "Turn sound on"}
        >
          <div className="size-9 sm:size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover/btn:scale-110 shadow-lg">
            {!isMutedUI ? (
              <Volume2 className="size-4 sm:size-5 text-gold" />
            ) : (
              <VolumeX className="size-4 sm:size-5 text-neutral-300" />
            )}
          </div>
          <span className="text-[10px] font-semibold text-white/90 mt-1 drop-shadow-md">
            {!isMutedUI ? "Mute" : "Unmute"}
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

      {/* Bottom Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden z-30 pointer-events-none">
        <div
          className="h-full bg-gold transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Lightbox Expand Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onOpenLightbox(index)
        }}
        className="absolute top-3.5 right-3.5 z-40 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors hidden group-hover:block cursor-pointer"
        aria-label="Expand video in lightbox"
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

  if (!categoryConfig) {
    notFound()
  }

  const categoryVideos = React.useMemo(() => {
    return videoItemsData.filter((v) => v.category === categoryConfig.id)
  }, [categoryConfig])

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isGlobalAudible, setIsGlobalAudible] = React.useState(true)
  const [hasScrolledPastFirst, setHasScrolledPastFirst] = React.useState(false)

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)

  // Container and Reel element refs
  const feedContainerRef = React.useRef<HTMLDivElement>(null)
  const reelRefs = React.useRef<Array<HTMLDivElement | null>>([])

  // Throttled / debounced wheel lock ref
  const isWheelThrottled = React.useRef(false)

  // Programmatic smooth scroll to reel
  const scrollToReel = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= categoryVideos.length) return
      const targetElement = reelRefs.current[index]
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
      setActiveIndex(index)
      if (index > 0) {
        setHasScrolledPastFirst(true)
      }
    },
    [categoryVideos.length]
  )

  // Synchronize activeIndex using IntersectionObserver on vertical scroll
  React.useEffect(() => {
    const container = feedContainerRef.current
    if (!container) return

    const observerOptions = {
      root: container,
      threshold: 0.55,
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute("data-reel-index")
          if (indexAttr !== null) {
            const nextIndex = parseInt(indexAttr, 10)
            if (!isNaN(nextIndex)) {
              setActiveIndex(nextIndex)
              if (nextIndex > 0) {
                setHasScrolledPastFirst(true)
              }
            }
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    reelRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [categoryVideos])

  // Mouse wheel / Trackpad controlled navigation
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Only intercept when scroll gesture is intentional
    if (Math.abs(e.deltaY) < 25) return

    // If currently throttling a previous scroll jump, prevent multi-skip
    if (isWheelThrottled.current) {
      e.preventDefault()
      return
    }

    if (e.deltaY > 0) {
      // Scrolling down -> Next Reel
      if (activeIndex < categoryVideos.length - 1) {
        e.preventDefault()
        isWheelThrottled.current = true
        scrollToReel(activeIndex + 1)
        setTimeout(() => {
          isWheelThrottled.current = false
        }, 400)
      }
      // If at last Reel, allow default page scroll to exit naturally to footer
    } else if (e.deltaY < 0) {
      // Scrolling up -> Previous Reel
      if (activeIndex > 0) {
        e.preventDefault()
        isWheelThrottled.current = true
        scrollToReel(activeIndex - 1)
        setTimeout(() => {
          isWheelThrottled.current = false
        }, 400)
      }
      // If at first Reel, allow default page scroll to exit naturally to header
    }
  }

  // Keyboard Navigation: ArrowUp, ArrowDown, PageUp, PageDown, Space
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea" || tag === "select") return

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        if (activeIndex < categoryVideos.length - 1) {
          scrollToReel(activeIndex + 1)
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        if (activeIndex > 0) {
          scrollToReel(activeIndex - 1)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, categoryVideos.length, scrollToReel])

  // Touch Swipe Gesture Handlers (Mobile vertical gesture helper)
  const touchStartY = React.useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    // If intentional vertical swipe > 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < categoryVideos.length - 1) {
        // Swipe UP -> Next Reel
        scrollToReel(activeIndex + 1)
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe DOWN -> Previous Reel
        scrollToReel(activeIndex - 1)
      }
    }
    touchStartY.current = null
  }

  const handleToggleMute = () => {
    setIsGlobalAudible((prev) => !prev)
  }

  const handleVideoEnded = () => {
    if (activeIndex < categoryVideos.length - 1) {
      scrollToReel(activeIndex + 1)
    }
  }

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#4E0A16] text-white">
      <Navbar />

      <main className="flex-1 py-6 sm:py-8 lg:py-10">
        <div className="container-hero">
          {/* Breadcrumb Navigation Header */}
          <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-white/15 pb-3">
            <Link
              href="/videos"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-hover transition-colors gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Video Categories</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-lg font-bold text-white">
                {categoryConfig.label}
              </span>
              <span className="text-xs font-semibold text-gold bg-black/60 border border-white/15 px-2.5 py-0.5 rounded-full">
                <Film className="size-3 text-gold inline mr-1" />
                {activeIndex + 1} / {categoryVideos.length}
              </span>
            </div>
          </div>

          {/* Compact Section Eyebrow & Title */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {categoryConfig.label} Reels Feed
            </h1>
            <p className="text-neutral-300 text-xs sm:text-sm font-sans mt-1">
              Scroll or swipe vertically
            </p>
          </div>

          {/* ================================================================ */}
          {/* IMMERSIVE VERTICAL REEL FEED CONTAINER                           */}
          {/* ================================================================ */}
          <div className="relative max-w-md mx-auto flex items-center justify-center">
            {/* Vertical Snap Scroll Container */}
            <div
              ref={feedContainerRef}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              className="w-full h-[660px] sm:h-[720px] md:h-[760px] max-h-[82vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none rounded-3xl outline-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              aria-label={`${categoryConfig.label} Reel Feed`}
            >
              {categoryVideos.map((reel, index) => {
                const isActive = index === activeIndex

                return (
                  <div
                    key={reel.id}
                    ref={(el) => {
                      reelRefs.current[index] = el
                    }}
                    data-reel-index={index}
                    className="w-full h-full snap-center snap-always flex items-center justify-center relative shrink-0 py-2"
                  >
                    <ReelCard
                      reel={reel}
                      index={index}
                      totalCount={categoryVideos.length}
                      isActive={isActive}
                      isAudible={isGlobalAudible}
                      isLightboxOpen={lightboxOpen}
                      onToggleMute={handleToggleMute}
                      onOpenLightbox={handleOpenLightbox}
                      onVideoEnded={handleVideoEnded}
                    />
                  </div>
                )
              })}
            </div>

            {/* Subtle Vertical Position Indicator Rail on Right Edge */}
            {categoryVideos.length > 1 && (
              <div
                className="absolute right-[-22px] sm:right-[-28px] top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1.5 py-3 px-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-20 pointer-events-none"
                aria-hidden="true"
              >
                {categoryVideos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "h-5 bg-gold shadow-sm"
                        : "h-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Initial Scroll / Swipe Hint (fades out after first interaction) */}
            {!hasScrolledPastFirst && categoryVideos.length > 1 && (
              <div
                onClick={() => scrollToReel(1)}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-gold cursor-pointer animate-bounce shadow-xl hover:bg-black/90 transition-colors"
                title="Next Reel"
              >
                <span>Scroll for next Reel</span>
                <ChevronDown className="size-3.5 text-gold" />
              </div>
            )}
          </div>

          {/* Bottom Keyboard & Gestures Helper Hint */}
          <div className="mt-4 sm:mt-6 text-center text-[11px] text-neutral-300/80 font-sans flex items-center justify-center gap-3">
            <span>↑ / ↓ or Scroll to Navigate</span>
            <span>•</span>
            <span>Click Video to Play / Pause</span>
            <span>•</span>
            <span>Audio stays active as you scroll</span>
          </div>
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
