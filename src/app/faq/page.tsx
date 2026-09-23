"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { allFAQs, FAQItem } from "@/data/faqs"
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  MapPin,
  CreditCard,
  Mic2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "motion/react"

type CategoryFilter = "all" | "booking" | "experience" | "travel"

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const prefersReducedMotion = useReducedMotion() ?? false

  // Filter FAQs based on active category and search query
  const filteredFAQs = React.useMemo(() => {
    return allFAQs.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Open first item by default if available
  const [openId, setOpenId] = React.useState<string | null>(
    allFAQs[0]?.id || null
  )

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  // Counts for tabs
  const bookingCount = allFAQs.filter((f) => f.category === "booking").length
  const experienceCount = allFAQs.filter((f) => f.category === "experience").length
  const travelCount = allFAQs.filter((f) => f.category === "travel").length

  // Category label helper
  const getCategoryMeta = (cat: FAQItem["category"]) => {
    switch (cat) {
      case "booking":
        return { label: "Booking & Pricing", icon: CreditCard }
      case "experience":
        return { label: "Event Experience", icon: Mic2 }
      case "travel":
        return { label: "Travel & Contact", icon: MapPin }
      default:
        return { label: "General", icon: HelpCircle }
    }
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-hero">
          {/* Back to Home Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition-colors gap-2"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Intro Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
              HELP &amp; INQUIRIES
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Frequently Asked Questions
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Clear answers regarding bookings, pricing structure, nationwide travel logistics,
              languages, and how Anchor Nikhil Gupta customizes each live event.
            </p>

            {/* Metric pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Sparkles className="size-3.5 text-gold" />
              <span>{allFAQs.length} Curated Questions &amp; Direct Answers</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., pricing, wedding, languages, travel)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                  aria-label="Clear search query"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center mb-12 sm:mb-14 overflow-x-auto px-2">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs sm:text-sm font-semibold gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-burgundy text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                All ({allFAQs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("booking")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === "booking"
                    ? "bg-burgundy text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Booking &amp; Pricing ({bookingCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("experience")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === "experience"
                    ? "bg-burgundy text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Event Experience ({experienceCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("travel")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === "travel"
                    ? "bg-burgundy text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Travel &amp; Contact ({travelCount})
              </button>
            </div>
          </div>

          {/* Accordion FAQ List */}
          {filteredFAQs.length > 0 ? (
            <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-4">
              {filteredFAQs.map((item, index) => {
                const isOpen = openId === item.id
                const meta = getCategoryMeta(item.category)
                const IconComponent = meta.icon

                return (
                  <div
                    key={item.id}
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
                      aria-controls={`faq-page-answer-${item.id}`}
                      id={`faq-page-question-${item.id}`}
                      className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left select-none group cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="text-xs sm:text-sm font-bold tracking-wider text-burgundy/60 group-hover:text-burgundy font-sans pt-0.5">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-burgundy bg-burgundy/5 px-2 py-0.5 rounded-md">
                              <IconComponent className="size-3" />
                              <span>{meta.label}</span>
                            </span>
                          </div>
                          <span className="font-display sm:font-sans font-semibold text-base sm:text-lg text-neutral-900 group-hover:text-burgundy transition-colors leading-snug">
                            {item.question}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 size-8 sm:size-9 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
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
                      id={`faq-page-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-page-question-${item.id}`}
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
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed border-t border-neutral-100/90 mt-1 pl-12 sm:pl-14">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Empty Search State */
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="size-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                <HelpCircle className="size-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                No matching questions found
              </h3>
              <p className="text-sm text-neutral-500 font-sans mb-6">
                We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your search.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="rounded-xl border-neutral-300 text-neutral-700"
              >
                Reset Search
              </Button>
            </div>
          )}

          {/* Dedicated Page Booking Banner */}
          <div className="mt-16 sm:mt-24 relative overflow-hidden rounded-3xl bg-burgundy-section text-white p-8 sm:p-12 text-center shadow-xl">
            {/* Ambient gold glow */}
            <div
              className="absolute -top-24 -right-24 size-64 rounded-full bg-gold/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 size-64 rounded-full bg-burgundy/40 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-gold uppercase mb-2 inline-block">
                ELEVATE YOUR CELEBRATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Have a Specific Question or Ready to Book?
              </h2>
              <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed mb-8 max-w-lg mx-auto">
                Connect directly with Anchor Nikhil Gupta&apos;s team to verify date availability, discuss event flow, and receive a tailored quote.
              </p>
              <Button
                asChild
                variant="bookNow"
                size="xl"
                className="rounded-xl px-9 py-4 text-sm sm:text-base font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl"
              >
                <Link href="/book-now">
                  <Calendar className="size-4 mr-2" />
                  <span>Book Anchor Nikhil Gupta</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
