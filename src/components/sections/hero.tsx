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

      {/* Right Side Burgundy Brushstroke & Texture Background */}
      <div
        className="absolute top-0 right-0 bottom-0 w-full lg:w-[52%] xl:w-[50%] pointer-events-none overflow-hidden"
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
      <div className="container-hero relative z-10 pt-4 sm:pt-6 lg:pt-8 pb-0 min-h-[580px] lg:min-h-[620px] xl:min-h-[660px] flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ============================================== */}
          {/* LEFT COLUMN: Editorial Branding & CTAs         */}
          {/* ============================================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center my-auto py-2 sm:py-4 lg:py-6 z-20 lg:pl-6 xl:pl-10">
            {/* Expressive Greeting: नमस्ते, मैं */}
            <p className="font-hindi text-3xl sm:text-4xl text-burgundy tracking-wide mb-1 select-none">
              नमस्ते, मैं
            </p>

            {/* Main Heading: NIKHIL GUPTA */}
            <div className="relative">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
                NIKHIL GUPTA
              </h1>
              {/* Gold Accent Line beneath the initial */}
              <div
                className="h-[3.5px] w-14 sm:w-16 bg-gradient-to-r from-gold to-gold-hover rounded-full mt-2 sm:mt-2.5 mb-3.5 sm:mb-4"
                aria-hidden="true"
              />
            </div>

            {/* Role Line: ANCHOR • EMCEE • ENTERTAINER */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-burgundy uppercase mb-4 sm:mb-5">
              ANCHOR &nbsp;•&nbsp; EMCEE &nbsp;•&nbsp; ENTERTAINER
            </p>

            {/* Concise Supporting Editorial Paragraph */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8 sm:mb-9 font-sans">
              From grand celebrations to corporate stages, I bring energy,
              elegance and emotion to every moment I host.
            </p>

            {/* Two Responsive CTAs matching the reference */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {/* Primary CTA: Book Me for Your Event */}
              <Button
                asChild
                variant="bookNow"
                size="lg"
                className="rounded-lg px-6 py-3.5 text-sm sm:text-base font-semibold tracking-wide justify-center shadow-md hover:shadow-lg"
              >
                <Link href="#book">
                  Book Me for Your Event
                  <ArrowRight className="size-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>

              {/* Secondary CTA: Watch Showreel */}
              <Button
                asChild
                variant="burgundyOutline"
                size="lg"
                className="rounded-lg px-5 py-3.5 text-sm sm:text-base font-semibold justify-center"
              >
                <Link href="#videos">
                  Watch Showreel
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
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end justify-end mt-4 lg:mt-0 relative z-10">
            
            {/* Tagline in its OWN dedicated negative space zone ABOVE the cameo */}
            <div className="w-full flex justify-center lg:justify-end pb-3 sm:pb-4 lg:pb-3 pointer-events-none z-20">
              <div className="max-w-[280px] sm:max-w-[310px] text-center lg:text-right pr-0 lg:pr-2">
                <p className="font-script text-2xl sm:text-[26px] lg:text-[26px] xl:text-[28px] text-[#F9EFE3] leading-[1.28] drop-shadow-xs select-none">
                  &ldquo;It&apos;s not just about hosting.<br />
                  It&apos;s about connecting.&rdquo;
                </p>
                {/* Subtle gold flourish curved line underneath */}
                <svg
                  viewBox="0 0 160 20"
                  className="w-28 mx-auto lg:ml-auto lg:mr-0 mt-1 text-gold/85"
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

            {/* Nikhil Gupta Cameo Cutout (Transparent, Natural, Dominant) */}
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[470px] xl:max-w-[510px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] z-10 flex items-end justify-center">
              <Image
                src="/images/nikhil-cutout.png"
                alt="Nikhil Gupta — Professional Event Anchor and Emcee"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 510px"
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
