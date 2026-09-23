"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ChevronDown, Calendar, ArrowRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { homepageFAQs, FAQItem } from "@/data/faqs"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface FAQSectionProps {
  items?: FAQItem[]
  title?: string
  subtitle?: string
  showAllCTA?: boolean
}

export function FAQSection({
  items = homepageFAQs,
  title = "Questions Worth Answering",
  subtitle = "Everything you need to know about booking Anchor Nikhil Gupta, event customization, travel logistics, and hosting dynamics.",
  showAllCTA = true,
}: FAQSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-60px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  // First item open by default for immediate context
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null)

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const animateState = prefersReducedMotion || isInView ? "visible" : "hidden"

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full bg-[#FDFCF9] py-18 sm:py-24 lg:py-28 overflow-hidden border-b border-neutral-200/60"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/3 -right-32 size-96 rounded-full bg-burgundy/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-32 size-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-hero relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.12]"
          >
            {title}
          </h2>
          <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={animateState}
          className="max-w-3xl lg:max-w-4xl mx-auto space-y-3.5 sm:space-y-4"
        >
          {items.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className={`rounded-2xl border transition-all duration-200 bg-white ${
                  isOpen
                    ? "border-burgundy/40 shadow-sm ring-1 ring-burgundy/10"
                    : "border-neutral-200/80 shadow-xs hover:border-burgundy/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left select-none group cursor-pointer"
                >
                  <span className="flex items-center gap-3 text-neutral-900 group-hover:text-burgundy transition-colors">
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-burgundy/60 group-hover:text-burgundy font-sans">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-display sm:font-sans font-semibold text-base sm:text-lg text-neutral-900 group-hover:text-burgundy transition-colors leading-snug">
                      {item.question}
                    </span>
                  </span>

                  <span
                    className={`shrink-0 size-8 sm:size-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-burgundy text-white rotate-180 shadow-xs"
                        : "bg-neutral-100 text-neutral-600 group-hover:bg-burgundy/10 group-hover:text-burgundy"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="size-4 sm:size-4.5" />
                  </span>
                </button>

                <motion.div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed border-t border-neutral-100/90 mt-1">
                    <p>{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTAs */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          {showAllCTA && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-xl border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-white px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
            >
              <Link href="/faq">
                <HelpCircle className="size-4 mr-2" />
                <span>View All FAQs</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="bookNow"
            size="lg"
            className="w-full sm:w-auto rounded-xl px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg"
          >
            <Link href="/book-now">
              <Calendar className="size-4 mr-2" />
              <span>Check Availability</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
