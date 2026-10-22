"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Calendar,
  User,
  Sparkles,
  AlertCircle,
  Loader2,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { eventCategoriesData } from "@/data/events"
import { buildWhatsAppBookingUrl } from "@/data/contact"
import {
  bookingFormSchema,
  BookingFormData,
} from "@/lib/validations/booking"

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [whatsappHandoffUrl, setWhatsappHandoffUrl] = React.useState<string | null>(null)

  const todayString = React.useMemo(() => {
    return new Date().toISOString().split("T")[0]
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      eventType: "",
      eventDate: "",
      eventLocation: "",
      guestCount: "",
      additionalDetails: "",
    },
  })

  const onSubmit = (data: BookingFormData) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    // Generate formatted WhatsApp click-to-chat URL
    const url = buildWhatsAppBookingUrl(data)
    setWhatsappHandoffUrl(url)

    // Open WhatsApp in a new tab / mobile app
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer")
    }

    // Reset isSubmitting after a brief delay to prevent rapid duplicate clicks
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1200)
  }

  return (
    <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-lg">
      <div className="mb-6 sm:mb-8">
        <span className="font-sans text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-1.5 inline-block">
          RESERVE YOUR STAGE
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Check Availability &amp; Request Quote
        </h2>
        <p className="text-neutral-600 text-xs sm:text-sm font-sans mt-1.5 leading-relaxed">
          Provide your event parameters below. Dates are allocated on a first-come, first-served basis.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Group 1: Contact Details */}
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400 font-sans mb-3.5 flex items-center gap-1.5">
            <User className="size-3.5 text-gold" />
            <span>01. Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Full Name <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  {...register("fullName")}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all ${
                    errors.fullName
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                      : "border-neutral-200 bg-neutral-50/40 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Phone Number <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...register("phone")}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all ${
                    errors.phone
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                      : "border-neutral-200 bg-neutral-50/40 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                  }`}
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Email Address <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="rahul@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                      : "border-neutral-200 bg-neutral-50/40 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                  }`}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Group 2: Event Details */}
        <div className="pt-2 border-t border-neutral-100">
          <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400 font-sans mb-3.5 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-gold" />
            <span>02. Event Specifics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type (Reusing eventCategoriesData) */}
            <div className="sm:col-span-2">
              <label
                htmlFor="eventType"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Event Type <span className="text-burgundy">*</span>
              </label>
              <select
                id="eventType"
                aria-invalid={!!errors.eventType}
                aria-describedby={errors.eventType ? "eventType-error" : undefined}
                {...register("eventType")}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 bg-neutral-50/40 focus:outline-none transition-all cursor-pointer ${
                  errors.eventType
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-neutral-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                }`}
              >
                <option value="">Select celebration type...</option>
                {eventCategoriesData.map((category) => (
                  <optgroup key={category.slug} label={category.title}>
                    {category.eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="Other / Custom Celebration">Other / Custom Celebration</option>
              </select>
              {errors.eventType && (
                <p id="eventType-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.eventType.message}</span>
                </p>
              )}
            </div>

            {/* Event Date */}
            <div>
              <label
                htmlFor="eventDate"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Event Date <span className="text-burgundy">*</span>
              </label>
              <input
                id="eventDate"
                type="date"
                min={todayString}
                aria-invalid={!!errors.eventDate}
                aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                {...register("eventDate")}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 bg-neutral-50/40 focus:outline-none transition-all ${
                  errors.eventDate
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-neutral-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                }`}
              />
              {errors.eventDate && (
                <p id="eventDate-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.eventDate.message}</span>
                </p>
              )}
            </div>

            {/* Event Location */}
            <div>
              <label
                htmlFor="eventLocation"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                City / Venue / Destination <span className="text-burgundy">*</span>
              </label>
              <input
                id="eventLocation"
                type="text"
                placeholder="e.g. Jaipur, Fairmont or Delhi NCR"
                aria-invalid={!!errors.eventLocation}
                aria-describedby={errors.eventLocation ? "eventLocation-error" : undefined}
                {...register("eventLocation")}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all ${
                  errors.eventLocation
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-neutral-200 bg-neutral-50/40 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                }`}
              />
              {errors.eventLocation && (
                <p id="eventLocation-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                  <AlertCircle className="size-3 shrink-0" />
                  <span>{errors.eventLocation.message}</span>
                </p>
              )}
            </div>

            {/* Expected Audience / Guest Size */}
            <div className="sm:col-span-2">
              <label
                htmlFor="guestCount"
                className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
              >
                Expected Guests / Audience <span className="text-neutral-400 font-normal normal-case">(Optional)</span>
              </label>
              <select
                id="guestCount"
                {...register("guestCount")}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/40 text-sm text-neutral-900 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 focus:outline-none transition-all cursor-pointer"
              >
                <option value="">Select approximate audience size...</option>
                <option value="Under 100 Guests (Intimate Gathering)">Under 100 Guests (Intimate Gathering)</option>
                <option value="100 – 300 Guests">100 – 300 Guests</option>
                <option value="300 – 600 Guests">300 – 600 Guests</option>
                <option value="600 – 1,200 Guests">600 – 1,200 Guests</option>
                <option value="1,200+ Guests (Large Scale / Summit)">1,200+ Guests (Large Scale / Summit)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Group 3: Additional Vision */}
        <div className="pt-2 border-t border-neutral-100">
          <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400 font-sans mb-3.5 flex items-center gap-1.5">
            <MessageSquare className="size-3.5 text-gold" />
            <span>03. Vision &amp; Notes</span>
          </h3>

          <div>
            <label
              htmlFor="additionalDetails"
              className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-sans"
            >
              Tell us about your event <span className="text-neutral-400 font-normal normal-case">(Optional)</span>
            </label>
            <textarea
              id="additionalDetails"
              rows={3}
              placeholder="Share details on event theme, special traditions, family stories, corporate objectives, or customized stage activities..."
              {...register("additionalDetails")}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/40 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 focus:outline-none transition-all resize-y"
            />
          </div>
        </div>

        {/* Submission Notice */}
        <div className="rounded-xl bg-amber-50/60 border border-amber-200/70 p-3.5 text-xs text-amber-900 font-sans leading-relaxed">
          <p>
            <strong>Note on Availability &amp; Pricing:</strong> Submitting this form checks date availability and generates a tailored quote. Dates are locked only after commercial terms are finalized.
          </p>
        </div>

        {/* WhatsApp Handoff Status Notice */}
        {whatsappHandoffUrl && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-emerald-500/30 bg-emerald-50/90 p-4 text-left shadow-xs transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                <WhatsAppIcon className="size-4.5" />
              </div>
              <div className="flex-1 text-xs sm:text-sm font-sans">
                <p className="font-semibold text-emerald-950">
                  WhatsApp opened with your inquiry pre-filled!
                </p>
                <p className="text-emerald-800 mt-1 leading-relaxed">
                  Please press <strong>Send</strong> in WhatsApp to deliver your inquiry directly to Anchor Nikhil Gupta. Your entered details remain saved below if you need to adjust anything.
                </p>
                <div className="mt-2.5">
                  <a
                    href={whatsappHandoffUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-900 underline hover:text-emerald-700 text-xs"
                  >
                    <span>Didn&apos;t open automatically? Tap here to open WhatsApp directly</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="bookNow"
          size="xl"
          disabled={isSubmitting}
          className="w-full rounded-xl py-4 text-sm sm:text-base font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4.5 animate-spin mr-2" />
              <span>Connecting to WhatsApp...</span>
            </>
          ) : (
            <>
              <Calendar className="size-4.5 mr-2" />
              <span>Check Availability</span>
              <ArrowRight className="size-4.5 ml-1.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
