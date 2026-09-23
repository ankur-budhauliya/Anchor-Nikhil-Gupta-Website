"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { contactConfig, buildWhatsAppEnquiryUrl } from "@/data/contact"

// Clean Brand SVG Icons
function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2 6.505 2 12.008c0 1.956.564 3.784 1.542 5.334L2.1 22.096l4.908-1.408a10.01 10.01 0 0 0 5.023 1.328h.004c5.514 0 10.03-4.505 10.03-10.008 0-5.503-4.516-10.008-10.034-10.008zm5.83 14.152c-.244.685-1.416 1.309-1.956 1.393-.518.08-1.189.116-3.832-.977-3.376-1.397-5.526-4.838-5.695-5.064-.168-.225-1.37-1.821-1.37-3.473 0-1.652.868-2.464 1.176-2.8.309-.337.674-.422.899-.422.225 0 .45.002.646.012.208.01.485-.078.758.577.282.674.958 2.336 1.042 2.507.085.17.142.368.029.593-.114.225-.17.366-.338.563-.17.197-.356.44-.509.591-.17.168-.347.351-.15.688.197.337.876 1.442 1.88 2.335 1.293 1.149 2.383 1.505 2.721 1.674.338.17.536.141.733-.085.197-.225.845-.984 1.07-1.322.225-.337.45-.282.76-.17.309.113 1.956.923 2.293 1.092.337.169.562.253.646.394.084.141.084.816-.16 1.501z" />
    </svg>
  )
}

function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YoutubeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const EVENT_TYPES = [
  "Engagement Ceremony",
  "Haldi Carnival",
  "Sangeet Night",
  "Varmala",
  "Baraat on Wheels",
  "Anniversary Celebration",
  "Reception Party",
  "Baby Shower",
  "Birthday Party",
  "Other",
] as const

export function ContactContent() {
  // Form State
  const [name, setName] = React.useState("")
  const [whatsappNumber, setWhatsappNumber] = React.useState("")
  const [eventType, setEventType] = React.useState("")
  const [customEventType, setCustomEventType] = React.useState("")
  const [selectedDates, setSelectedDates] = React.useState<string[]>([])
  const [venue, setVenue] = React.useState("")

  // Validation errors
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Multi-date Calendar Navigation State
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  // Format YYYY-MM-DD
  const formatIso = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, "0")
    const dd = String(day).padStart(2, "0")
    return `${year}-${mm}-${dd}`
  }

  // Format for display and WhatsApp: e.g. "24 Oct 2026"
  const formatDisplayDate = (isoStr: string) => {
    const [year, month, day] = isoStr.split("-").map(Number)
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const todayStr = React.useMemo(() => {
    const now = new Date()
    return formatIso(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const toggleDate = (isoStr: string) => {
    if (isoStr < todayStr) return // disabled past dates

    setSelectedDates((prev) => {
      let updated: string[]
      if (prev.includes(isoStr)) {
        updated = prev.filter((d) => d !== isoStr)
      } else {
        updated = [...prev, isoStr].sort()
      }
      if (updated.length > 0 && errors.eventDates) {
        setErrors((e) => {
          const next = { ...e }
          delete next.eventDates
          return next
        })
      }
      return updated
    })
  }

  const removeDate = (isoStr: string) => {
    setSelectedDates((prev) => prev.filter((d) => d !== isoStr))
  }

  // Calendar Grid calculation
  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfWeek = new Date(year, month, 1).getDay() // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days: Array<{
      dayNumber: number
      isoStr: string
      isCurrentMonth: boolean
      isPast: boolean
    }> = []

    // Blank / padding slots before first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        dayNumber: 0,
        isoStr: "",
        isCurrentMonth: false,
        isPast: true,
      })
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isoStr = formatIso(year, month, d)
      days.push({
        dayNumber: d,
        isoStr,
        isCurrentMonth: true,
        isPast: isoStr < todayStr,
      })
    }

    return days
  }, [currentMonth, todayStr])

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const prevMonthDisabled = React.useMemo(() => {
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    return currentMonth <= thisMonthStart
  }, [currentMonth])

  const handlePrevMonth = () => {
    if (prevMonthDisabled) return
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  // Form submission & validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    // 1. Name validation
    if (!name.trim()) {
      newErrors.name = "Please enter your name"
    }

    // 2. Indian WhatsApp number validation
    // Accepts formats like +91 9170165570, 09170165570, 9170165570
    const cleanDigits = whatsappNumber.replace(/\D/g, "")
    const tenDigit =
      cleanDigits.length === 12 && cleanDigits.startsWith("91")
        ? cleanDigits.slice(2)
        : cleanDigits.length === 11 && cleanDigits.startsWith("0")
        ? cleanDigits.slice(1)
        : cleanDigits

    const isValidIndianMobile = /^[6-9]\d{9}$/.test(tenDigit)

    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = "Please enter your WhatsApp number"
    } else if (!isValidIndianMobile) {
      newErrors.whatsappNumber =
        "Please enter a valid 10-digit Indian mobile number (e.g., 9170165570)"
    }

    // 3. Event Type validation
    if (!eventType) {
      newErrors.eventType = "Please select an event type"
    } else if (eventType === "Other" && !customEventType.trim()) {
      newErrors.customEventType = "Please specify the event type"
    }

    // 4. Event Date validation
    if (selectedDates.length === 0) {
      newErrors.eventDates = "Please select at least one event date from the calendar"
    }

    // 5. Venue validation
    if (!venue.trim()) {
      newErrors.venue = "Please enter the event venue name or address"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    // Build formatted dates
    const formattedDates = selectedDates
      .map(formatDisplayDate)
      .join(", ")

    const effectiveEventType =
      eventType === "Other" ? customEventType.trim() : eventType

    // Generate exact WhatsApp URL
    const url = buildWhatsAppEnquiryUrl({
      name: name.trim(),
      whatsappNumber: tenDigit || whatsappNumber.trim(),
      eventType: effectiveEventType,
      eventDates: formattedDates,
      venue: venue.trim(),
    })

    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 lg:py-18">
        <div className="container-hero">
          {/* Breadcrumb back to Home */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition-colors gap-2"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Page Intro Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-burgundy uppercase mb-2">
              EVENT ENQUIRIES
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Let&apos;s Connect For Your Event
            </h1>
            <div className="h-[3px] w-16 bg-gold mx-auto mt-4 mb-4 rounded-full" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans">
              Fill in the details below to check calendar availability and enquire directly with Anchor Nikhil Gupta on WhatsApp.
            </p>
          </div>

          {/* Clean, Minimal Enquiry Form Container */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Your Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-sans"
                  >
                    Your Name <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) {
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.name
                          return next
                        })
                      }
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none transition-colors ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-neutral-200 focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 font-sans mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* 2. WhatsApp Number */}
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-sans"
                  >
                    WhatsApp Number <span className="text-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 text-sm font-medium">
                      +91
                    </div>
                    <input
                      id="whatsapp"
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => {
                        setWhatsappNumber(e.target.value)
                        if (errors.whatsappNumber) {
                          setErrors((prev) => {
                            const next = { ...prev }
                            delete next.whatsappNumber
                            return next
                          })
                        }
                      }}
                      placeholder="9170165570"
                      maxLength={14}
                      className={`w-full rounded-xl border pl-12 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none transition-colors ${
                        errors.whatsappNumber
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-neutral-200 focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                      }`}
                    />
                  </div>
                  {errors.whatsappNumber ? (
                    <p className="text-xs text-red-600 font-sans mt-1.5">{errors.whatsappNumber}</p>
                  ) : (
                    <p className="text-[11px] text-neutral-500 font-sans mt-1">
                      10-digit Indian mobile number
                    </p>
                  )}
                </div>

                {/* 3. Event Type */}
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-sans"
                  >
                    Event Type <span className="text-burgundy">*</span>
                  </label>
                  <select
                    id="eventType"
                    required
                    value={eventType}
                    onChange={(e) => {
                      setEventType(e.target.value)
                      if (errors.eventType) {
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.eventType
                          return next
                        })
                      }
                    }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none transition-colors cursor-pointer ${
                      errors.eventType
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-neutral-200 focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    }`}
                  >
                    <option value="" disabled>
                      Select an event type...
                    </option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="text-xs text-red-600 font-sans mt-1.5">{errors.eventType}</p>
                  )}
                </div>

                {/* 4. Specify Event Type (Shown ONLY if 'Other' is selected) */}
                {eventType === "Other" && (
                  <div className="rounded-2xl border border-burgundy/20 bg-burgundy/5 p-4 space-y-2">
                    <label
                      htmlFor="customEventType"
                      className="block text-xs sm:text-sm font-bold text-burgundy uppercase tracking-wider font-sans"
                    >
                      Specify Event Type <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="customEventType"
                      type="text"
                      required
                      value={customEventType}
                      onChange={(e) => {
                        setCustomEventType(e.target.value)
                        if (errors.customEventType) {
                          setErrors((prev) => {
                            const next = { ...prev }
                            delete next.customEventType
                            return next
                          })
                        }
                      }}
                      placeholder="e.g. Corporate Annual Awards, College Fest, Band Night"
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 bg-white focus:outline-none transition-colors ${
                        errors.customEventType
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                      }`}
                    />
                    {errors.customEventType && (
                      <p className="text-xs text-red-600 font-sans mt-1">
                        {errors.customEventType}
                      </p>
                    )}
                  </div>
                )}

                {/* 5. Event Date (Interactive Multi-Date Calendar Picker) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider font-sans">
                      Event Date <span className="text-burgundy">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-500 font-sans">
                      Select single or multiple dates
                    </span>
                  </div>

                  {/* Calendar Widget Container */}
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50/40 p-4 sm:p-5">
                    {/* Month Header Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-base font-bold text-neutral-900">
                        {monthName}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          disabled={prevMonthDisabled}
                          className={`size-8 rounded-lg border flex items-center justify-center transition-colors ${
                            prevMonthDisabled
                              ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
                              : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                          }`}
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="size-8 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 flex items-center justify-center transition-colors"
                          aria-label="Next month"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day-of-week Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <span
                          key={day}
                          className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider"
                        >
                          {day}
                        </span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((item, index) => {
                        if (!item.isCurrentMonth) {
                          return <div key={`empty-${index}`} className="h-9 sm:h-10" />
                        }

                        const isSelected = selectedDates.includes(item.isoStr)
                        const isPast = item.isPast

                        return (
                          <button
                            key={item.isoStr}
                            type="button"
                            disabled={isPast}
                            onClick={() => toggleDate(item.isoStr)}
                            className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ${
                              isSelected
                                ? "bg-burgundy text-white shadow-sm font-bold scale-[1.02]"
                                : isPast
                                ? "text-neutral-300 cursor-not-allowed"
                                : "text-neutral-800 hover:bg-burgundy/10 hover:text-burgundy bg-white border border-neutral-200/60"
                            }`}
                            aria-label={`${item.dayNumber} ${monthName}`}
                          >
                            {item.dayNumber}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Selected Dates Chips List */}
                  {selectedDates.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-[11px] font-bold text-burgundy uppercase tracking-wider">
                        Selected {selectedDates.length === 1 ? "Date" : `${selectedDates.length} Dates`}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDates.map((dateStr) => (
                          <span
                            key={dateStr}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs font-semibold"
                          >
                            <span>{formatDisplayDate(dateStr)}</span>
                            <button
                              type="button"
                              onClick={() => removeDate(dateStr)}
                              className="size-3.5 rounded-full hover:bg-burgundy/20 flex items-center justify-center transition-colors"
                              aria-label={`Remove date ${formatDisplayDate(dateStr)}`}
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-500 font-sans mt-2">
                      Click any date above to select. Click again or use ✕ to deselect.
                    </p>
                  )}

                  {errors.eventDates && (
                    <p className="text-xs text-red-600 font-sans mt-1.5">{errors.eventDates}</p>
                  )}
                </div>

                {/* 6. Venue Name / Address */}
                <div>
                  <label
                    htmlFor="venue"
                    className="block text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2 font-sans"
                  >
                    Venue Name / Address <span className="text-burgundy">*</span>
                  </label>
                  <textarea
                    id="venue"
                    required
                    rows={3}
                    value={venue}
                    onChange={(e) => {
                      setVenue(e.target.value)
                      if (errors.venue) {
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.venue
                          return next
                        })
                      }
                    }}
                    placeholder="e.g. Taj Mahal Palace, Colaba, Mumbai or Royal Orchid Resort, Bangalore"
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 bg-neutral-50/50 focus:bg-white focus:outline-none transition-colors resize-none ${
                      errors.venue
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-neutral-200 focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                    }`}
                  />
                  {errors.venue && (
                    <p className="text-xs text-red-600 font-sans mt-1.5">{errors.venue}</p>
                  )}
                </div>

                {/* Submit CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  >
                    <WhatsAppIcon className="size-5 sm:size-6" />
                    <span>ENQUIRE ON WHATSAPP</span>
                  </button>
                  <p className="text-center text-[11px] text-neutral-500 font-sans mt-2.5">
                    Directly opens WhatsApp chat with Anchor Nikhil Gupta (+91 9170165570)
                  </p>
                </div>
              </form>
            </div>

            {/* Social Media Links Below Form */}
            <div className="mt-10 sm:mt-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="size-3.5 text-burgundy" />
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-burgundy uppercase">
                  CONNECT ACROSS PLATFORMS
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* WhatsApp */}
                <a
                  href={contactConfig.whatsapp.getLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:border-emerald-500 hover:text-emerald-700 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="size-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/anchor_nikhil_gupta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:border-pink-500 hover:text-pink-700 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <InstagramIcon className="size-4 text-pink-600" />
                  <span>@anchor_nikhil_gupta</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/nikhilgupta19/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:border-blue-600 hover:text-blue-700 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors"
                  aria-label="Connect on LinkedIn"
                >
                  <LinkedinIcon className="size-4 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@19nikhilgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:border-red-600 hover:text-red-700 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors"
                  aria-label="Subscribe on YouTube"
                >
                  <YoutubeIcon className="size-4 text-red-600" />
                  <span>@19nikhilgupta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
