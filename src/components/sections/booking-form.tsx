"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, useReducedMotion } from "motion/react"
import {
  Calendar,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { eventCategoriesData } from "@/data/events"
import { contactConfig } from "@/data/contact"
import {
  bookingFormSchema,
  BookingFormData,
} from "@/lib/validations/booking"

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState<BookingFormData | null>(null)
  const prefersReducedMotion = useReducedMotion() ?? false

  const todayString = React.useMemo(() => {
    return new Date().toISOString().split("T")[0]
  }, [])

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    // Simulate async dispatch / CRM hook
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmittedData(data)
    setIsSubmitting(false)
  }

  const handleReset = () => {
    setSubmittedData(null)
    reset()
  }

  if (submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-gold/30 bg-white p-7 sm:p-10 shadow-lg text-center"
      >
        <div className="size-16 sm:size-20 rounded-full bg-burgundy/10 border-2 border-gold/40 flex items-center justify-center mx-auto mb-6 text-burgundy">
          <CheckCircle2 className="size-9 sm:size-10 text-burgundy" />
        </div>

        <span className="font-sans text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-2 inline-block">
          INQUIRY RECEIVED
        </span>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
          Thank You, {submittedData.fullName}!
        </h3>

        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto mb-6">
          Your event details have been successfully received. Our team will get in touch with you
          shortly regarding calendar availability, customized pricing, and booking confirmation.
        </p>

        {/* Summary Card */}
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 mb-8 text-left space-y-2.5 max-w-md mx-auto text-xs sm:text-sm">
          <div className="flex justify-between border-b border-neutral-200/60 pb-2">
            <span className="text-neutral-500 font-sans">Event Type:</span>
            <span className="font-semibold text-neutral-900">{submittedData.eventType}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-200/60 pb-2">
            <span className="text-neutral-500 font-sans">Planned Date:</span>
            <span className="font-semibold text-neutral-900">{submittedData.eventDate}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-200/60 pb-2">
            <span className="text-neutral-500 font-sans">Location / Venue:</span>
            <span className="font-semibold text-neutral-900">{submittedData.eventLocation}</span>
          </div>
          {submittedData.guestCount && (
            <div className="flex justify-between border-b border-neutral-200/60 pb-2">
              <span className="text-neutral-500 font-sans">Audience Size:</span>
              <span className="font-semibold text-neutral-900">{submittedData.guestCount}</span>
            </div>
          )}
          <div className="flex justify-between pt-0.5">
            <span className="text-neutral-500 font-sans">Status:</span>
            <span className="font-semibold text-burgundy inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-burgundy animate-pulse" />
              Under Availability Review
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-xl border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-white"
          >
            <a
              href={contactConfig.whatsapp.getLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="size-4 mr-2 text-gold" />
              <span>Connect on WhatsApp</span>
            </a>
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="w-full sm:w-auto rounded-xl text-neutral-700 hover:text-neutral-900"
          >
            <span>Submit Another Inquiry</span>
          </Button>
        </div>
      </motion.div>
    )
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
              <span>Verifying Details...</span>
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
