"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { VideoItem } from "@/data/videos"

interface VideoLightboxProps {
  videos: VideoItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function VideoLightbox({
  videos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: VideoLightboxProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const currentVideo = videos[currentIndex]

  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isMuted, setIsMuted] = React.useState(false)

  const handlePrevious = React.useCallback(() => {
    if (videos.length === 0) return
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length
    onNavigate(prevIndex)
  }, [currentIndex, videos.length, onNavigate])

  const handleNext = React.useCallback(() => {
    if (videos.length === 0) return
    const nextIndex = (currentIndex + 1) % videos.length
    onNavigate(nextIndex)
  }, [currentIndex, videos.length, onNavigate])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const videoElem = videoRef.current
    if (!videoElem) return
    const nextMuted = !videoElem.muted
    videoElem.muted = nextMuted
    if (!nextMuted) {
      videoElem.volume = 1
    }
    setIsMuted(nextMuted)
  }

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === " ") {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, handlePrevious, handleNext])

  if (!isOpen || !currentVideo) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Video Player Modal"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 text-white">
            {/* Counter Badge */}
            <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold tracking-wider font-sans border border-white/15">
              {currentIndex + 1} / {videos.length}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close Video Player"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Left Arrow Button */}
          {videos.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Previous Video"
            >
              <ChevronLeft className="size-6 sm:size-7" />
            </button>
          )}

          {/* Main Video Frame */}
          <div className="relative w-full max-w-4xl h-[78vh] sm:h-[84vh] flex flex-col items-center justify-center my-auto">
            <motion.div
              key={currentVideo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl"
            >
              <video
                ref={videoRef}
                src={currentVideo.src}
                poster={currentVideo.poster}
                autoPlay
                playsInline
                muted={isMuted}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain"
              />

              {/* Video Overlay Minimal Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between p-3 rounded-xl bg-black/65 backdrop-blur-xs border border-white/15 text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="size-4 text-neutral-400" /> : <Volume2 className="size-4 text-gold" />}
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-display text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-sm">
                    {currentVideo.title}
                  </p>
                  {currentVideo.subtitle && (
                    <p className="font-sans text-[11px] text-gold/90">
                      {currentVideo.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Arrow Button */}
          {videos.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Next Video"
            >
              <ChevronRight className="size-6 sm:size-7" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
