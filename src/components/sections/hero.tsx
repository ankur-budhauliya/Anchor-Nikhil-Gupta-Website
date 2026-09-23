"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FDFCF9]">
      {/* Far Left Decorative Dot Matrix Pattern */}
      <div
        className="absolute left-0 bottom-12 w-28 h-36 bg-dot-pattern opacity-40 pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      {/* Desktop & Tablet: Right Side Burgundy Brushstroke & Stage Texture Background */}
      <div
        className="hidden md:block absolute top-0 right-0 bottom-0 md:w-[46%] lg:w-[52%] xl:w-[50%] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Organic Brush Splash SVG Layer */}
        <svg
          viewBox="0 0 800 700"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-burgundy"
          fill="none"
        >
          <defs>
            <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A1829" />
              <stop offset="50%" stopColor="#741120" />
              <stop offset="100%" stopColor="#550A15" />
            </linearGradient>
            <radialGradient id="stageGlow" cx="65%" cy="35%" r="50%">
              <stop offset="0%" stopColor="#A32437" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#550A15" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dynamic Painterly Edge Paths */}
          <path
            d="M 320,0 
               C 290,50 250,100 220,150 
               C 180,200 150,250 180,290 
               C 215,330 165,380 135,430 
               C 100,480 145,530 110,590 
               C 80,640 35,680 0,720 
               L 800,720 L 800,0 Z"
            fill="url(#burgundyGrad)"
          />
          <path
            d="M 360,0 C 330,60 280,110 240,170 C 210,220 200,270 235,310 C 200,360 165,420 130,490 C 95,560 60,630 20,720 L 800,720 L 800,0 Z"
            fill="#6B101E"
            opacity="0.4"
          />
          <path
            d="M 270,90 C 260,120 230,150 250,175 C 270,200 220,250 200,280 C 175,320 200,360 170,400 C 140,440 160,480 130,530 C 100,580 70,640 30,720 L 0,720 Z"
            fill="#8A1829"
            opacity="0.3"
          />
          <rect width="800" height="720" fill="url(#stageGlow)" />
        </svg>

        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-right"
          style={{
            backgroundImage: `radial-gradient(ellipse at 75% 45%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Main Container */}
      <div className="container-hero relative z-10 pt-4 sm:pt-6 md:pt-6 lg:pt-8 pb-0 min-h-0 md:min-h-[540px] lg:min-h-[620px] xl:min-h-[660px] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 lg:gap-6 items-center">
          
          {/* ============================================== */}
          {/* LEFT COLUMN: Editorial Branding & CTAs         */}
          {/* ============================================== */}
          <div className="md:col-span-7 lg:col-span-6 xl:col-span-6 flex flex-col justify-center pt-2 pb-6 sm:pt-4 sm:pb-6 md:py-6 lg:py-6 z-20 md:pl-2 lg:pl-6 xl:pl-10">
            {/* Expressive Greeting: नमस्ते, मैं */}
            <p className="font-hindi text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-burgundy tracking-wide mb-1.5 sm:mb-2 select-none">
              नमस्ते, मैं
            </p>

            {/* Main Heading: NIKHIL GUPTA */}
            <div className="relative">
              <h1 className="font-display text-[38px] xs:text-[44px] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] mb-2">
                NIKHIL GUPTA
              </h1>
              {/* Gold Accent Line beneath the heading */}
              <div
                className="h-[3px] sm:h-[3.5px] w-14 sm:w-16 bg-gradient-to-r from-gold to-gold-hover rounded-full mt-1.5 sm:mt-2 mb-3 sm:mb-3.5"
                aria-hidden="true"
              />
            </div>

            {/* Role Line: ANCHOR • EMCEE • ENTERTAINER */}
            <p className="text-xs xs:text-[13px] sm:text-sm md:text-sm font-semibold tracking-[0.18em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-burgundy uppercase mb-3 sm:mb-3.5">
              ANCHOR &nbsp;•&nbsp; EMCEE &nbsp;•&nbsp; ENTERTAINER
            </p>

            {/* Concise Supporting Editorial Paragraph */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg mb-6 sm:mb-7 lg:mb-8 font-sans">
              From grand celebrations to corporate stages, I bring energy,
              elegance and emotion to every moment I host.
            </p>

            {/* Two Responsive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-3 w-full sm:w-auto max-w-md sm:max-w-none">
              {/* Primary CTA: Book Me for Your Event */}
              <Button
                asChild
                variant="bookNow"
                size="lg"
                className="rounded-xl px-5 sm:px-6 h-[52px] sm:h-12 md:h-12 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-md hover:shadow-lg"
              >
                <Link href="/book-now">
                  <span>Book Me for Your Event</span>
                  <ArrowRight className="size-4 ml-2 shrink-0" aria-hidden="true" />
                </Link>
              </Button>

              {/* Secondary CTA: Watch Showreel */}
              <Button
                asChild
                variant="burgundyOutline"
                size="lg"
                className="rounded-xl px-5 sm:px-5 h-[52px] sm:h-12 md:h-12 text-sm sm:text-base font-semibold justify-center"
              >
                <Link href="/videos">
                  <span>Watch Showreel</span>
                  <span className="flex items-center justify-center size-5 rounded-full border border-burgundy ml-2 shrink-0">
                    <Play className="size-2.5 fill-burgundy text-burgundy ml-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* ============================================== */}
          {/* RIGHT COLUMN: Separated Tagline + Cameo Cutout */}
          {/* ============================================== */}
          <div className="md:col-span-5 lg:col-span-6 xl:col-span-6 flex flex-col items-center md:items-end justify-end mt-8 sm:mt-10 md:mt-0 relative z-10 pt-0 md:pt-0">
            {/* Mobile Only: Dedicated Burgundy Backdrop with Seamless Flow to About Section */}
            <div
              className="md:hidden absolute inset-0 -bottom-[2px] -mx-4 sm:-mx-6 bg-gradient-to-b from-[#8A1829] via-[#741120] to-[#6B1221] rounded-t-[28px] sm:rounded-t-[36px] -z-10 shadow-[0_-12px_24px_-8px_rgba(0,0,0,0.25)] overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.3) 0%, transparent 65%)`,
                }}
              />
            </div>
            
            {/* Tagline in its OWN dedicated negative space zone ABOVE the cameo */}
            <div className="w-full flex justify-center md:justify-end pt-6 xs:pt-7 sm:pt-8 md:pt-2 pb-2 sm:pb-3 md:pb-2 pointer-events-none z-20">
              <div className="max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] md:max-w-[280px] lg:max-w-[320px] text-center md:text-right pr-0 md:pr-2 lg:pr-4">
                <p className="font-script text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-[26px] xl:text-[28px] text-[#F9EFE3] leading-[1.25] drop-shadow-xs select-none">
                  &ldquo;It&apos;s not just about hosting.<br />
                  It&apos;s about connecting.&rdquo;
                </p>
                {/* Subtle gold flourish curved line underneath */}
                <svg
                  viewBox="0 0 160 20"
                  className="w-24 sm:w-28 mx-auto md:ml-auto md:mr-0 mt-2 sm:mt-2.5 text-gold/85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M 10,12 C 50,18 110,6 150,10" />
                </svg>
              </div>
            </div>

            {/* Nikhil Gupta Cameo Cutout (Substantial scale centered for mobile, tablet, and desktop) */}
            <div className="relative w-full max-w-[260px] xs:max-w-[285px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[470px] xl:max-w-[510px] aspect-[4/5] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] z-10 flex items-end justify-center mt-3 sm:mt-4">
              <Image
                src="/images/nikhil-cutout.png"
                alt="Nikhil Gupta — Professional Event Anchor and Emcee"
                fill
                priority
                sizes="(max-width: 480px) 285px, (max-width: 640px) 320px, (max-width: 1024px) 340px, 510px"
                className="object-contain object-bottom drop-shadow-2xl"
              />
              {/* Mobile Only: Subtle bottom feather to soften the straight cut of the cutout into the About section */}
              <div
                className="md:hidden absolute inset-x-0 -bottom-[2px] h-10 sm:h-12 bg-gradient-to-t from-[#6B1221] via-[#6B1221]/80 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
