"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { statsData, StatItem } from "@/data/stats"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface StatCardProps {
  item: StatItem
  index: number
  isInView: boolean
  prefersReducedMotion: boolean
}

function StatCard({ item, index, isInView, prefersReducedMotion }: StatCardProps) {
  const targetCount = item.numericValue ?? 0
  const shouldAnimate = isInView && !prefersReducedMotion && item.numericValue !== undefined

  const [count, setCount] = React.useState<number>(() =>
    prefersReducedMotion || item.numericValue === undefined ? targetCount : 0
  )

  React.useEffect(() => {
    if (!shouldAnimate || item.numericValue === undefined) return

    let animationFrameId: number
    const start = 0
    const end = item.numericValue
    const duration = 1600 // ms
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth ease-out cubic curve for luxury feel
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutProgress * (end - start) + start)

      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [shouldAnimate, item.numericValue])

  // Responsive column span & border matrix for 5 items:
  // Mobile (2-col): item 4 spans 2 cols
  // Tablet (sm: 3-col): items span 1 col
  // Desktop (lg: 5-col): 5 items in 1 row
  const colSpanClass = index === 4 ? "col-span-2 sm:col-span-1" : "col-span-1"

  const borderClasses = `
    ${index % 2 === 0 && index !== 4 ? "border-r border-white/10 sm:border-r-0" : ""}
    ${index < 4 ? "border-b border-white/10 lg:border-b-0" : ""}
    ${index < statsData.length - 1 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"}
    ${(index + 1) % 3 !== 0 && index < statsData.length - 1 ? "sm:border-r sm:border-white/10 lg:border-r-0" : ""}
  `.trim()

  const screenReaderText = `${item.value} ${item.label} ${item.subtitle ? `— ${item.subtitle}` : ""}`

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex flex-col items-center text-center px-3 sm:px-4 py-8 sm:py-10 lg:py-12 relative transition-colors duration-300 hover:bg-white/[0.02] ${colSpanClass} ${borderClasses}`}
      aria-label={screenReaderText}
    >
      {/* Metric Display — Fixed Baseline Height Container to pin digits on exact same line */}
      <div className="h-16 sm:h-20 lg:h-24 w-full flex items-baseline justify-center">
        <div className="font-display text-4xl sm:text-5xl lg:text-[48px] xl:text-6xl font-bold text-white tracking-tight leading-none flex items-baseline justify-center">
          {item.prefix && <span className="text-gold mr-0.5 font-display font-bold">{item.prefix}</span>}
          {item.numericValue !== undefined ? (
            <span>{count}</span>
          ) : (
            <span className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-display font-bold text-white leading-none">
              {item.value}
            </span>
          )}
          {item.suffix && <span className="text-gold font-display font-bold ml-0.5">{item.suffix}</span>}
        </div>
      </div>

      {/* Decorative gold accent hairline — Fixed Height Zone */}
      <div className="h-4 flex items-center justify-center my-1.5" aria-hidden="true">
        <div className="h-[2px] w-9 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
      </div>

      {/* Supporting Text Block — Fixed Minimum Height for cross-column alignment */}
      <div className="min-h-[60px] sm:min-h-[68px] flex flex-col items-center justify-start text-center">
        {/* Primary Label */}
        <h3 className="font-sans text-xs sm:text-xs md:text-sm font-bold tracking-[0.14em] text-neutral-100 uppercase max-w-[190px] leading-snug">
          {item.label}
        </h3>

        {/* Subtitle / Context detail */}
        {item.subtitle && (
          <p className="font-sans text-[11px] sm:text-xs text-gold/90 mt-1 font-medium tracking-wider">
            {item.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function Stats() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <section
      aria-labelledby="stats-heading"
      className="relative w-full bg-[#4E0A16] border-y border-white/10 py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle Background Glow Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10">
        {/* Section-Level Full-Width Brand Header */}
        <div className="text-center mb-9 sm:mb-11 lg:mb-14">
          <p
            id="stats-heading"
            className="font-sans text-sm sm:text-base md:text-lg font-bold tracking-[0.3em] text-gold uppercase"
          >
            THE EXPERIENCE BEHIND THE ENERGY
          </p>
          <div
            className="h-[2.5px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3 rounded-full opacity-80"
            aria-hidden="true"
          />
        </div>

        {/* Inner Statistics Matrix Panel Card */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/12 shadow-2xl overflow-hidden"
        >
          {statsData.map((item, index) => (
            <StatCard
              key={item.id}
              item={item}
              index={index}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
