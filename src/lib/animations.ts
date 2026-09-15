import type { Transition, Variants } from "motion/react"

/**
 * Standard cinematic cubic bezier curve for luxury event branding.
 * Delivers a smooth, deceleration-focused entrance without bouncy or abrupt stops.
 */
export const cinematicEase = [0.22, 1, 0.36, 1] as const

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: cinematicEase,
}

export const fastTransition: Transition = {
  duration: 0.3,
  ease: cinematicEase,
}

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: cinematicEase,
}

/**
 * Standard Fade In animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
}

/**
 * Standard Fade In Up for section headers and cards
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

/**
 * Subtle Scale In for media, reels, and photograph reveals
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
}

/**
 * Container Stagger for lists, category cards, and stats counters
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

/**
 * Micro-interaction hover transitions for interactive cards
 */
export const cardHover: Variants = {
  initial: { y: 0, transition: fastTransition },
  hover: {
    y: -4,
    transition: fastTransition,
  },
}

/**
 * Accessible animation variant generator respecting prefers-reduced-motion
 */
export function getAccessibleVariant(variant: Variants, prefersReducedMotion: boolean): Variants {
  if (!prefersReducedMotion) return variant

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }
}
