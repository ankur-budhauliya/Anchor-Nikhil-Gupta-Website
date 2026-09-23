"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Calendar, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { eventCategoriesData } from "@/data/events"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Videos", href: "/videos" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [eventsDropdownOpen, setEventsDropdownOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Determine active navigation item based on current route
  const isItemActive = React.useCallback(
    (item: NavItem) => {
      if (item.label === "Home") return pathname === "/"
      if (item.label === "Gallery") return pathname.startsWith("/gallery")
      if (item.label === "Videos") return pathname.startsWith("/videos")
      if (item.label === "Testimonials") return pathname.startsWith("/testimonials")
      if (item.label === "Contact") return pathname === "/contact"
      return false
    },
    [pathname]
  )

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // Close mobile menu on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-[#FDFCF9]/95 backdrop-blur-md shadow-xs border-b border-border/60"
          : "bg-[#FDFCF9]"
      )}
    >
      <div className="container-hero flex h-[72px] sm:h-20 lg:h-20 items-center justify-between">
        {/* ================================================================ */}
        {/* MOBILE & TABLET HEADER (< lg): Hamburger (Left), Logo (Center), Book Me (Right) */}
        {/* ================================================================ */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Left: Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-1.5 text-neutral-800 hover:text-burgundy hover:bg-neutral-100/80 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>

          {/* Center: Brand Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy rounded-full"
            aria-label="Nikhil Gupta — Home"
          >
            <div className="relative size-12 sm:size-14 shrink-0 drop-shadow-xs">
              <Image
                src="/images/logo.png"
                alt="Nikhil Gupta NG Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right: Book Me CTA */}
          <Button
            asChild
            variant="bookNow"
            size="sm"
            className="rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shrink-0 shadow-xs h-auto min-w-[125px] sm:min-w-[140px]"
          >
            <Link href="/book-now">
              <Calendar className="size-3.5 sm:size-4 mr-1.5 shrink-0" aria-hidden="true" />
              <span>Book Me</span>
            </Link>
          </Button>
        </div>

        {/* ================================================================ */}
        {/* DESKTOP HEADER (lg: 1024px+): Logo (Left), Nav (Center), Book Me (Right) */}
        {/* ================================================================ */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy rounded-full"
            aria-label="Nikhil Gupta — Home"
          >
            <div className="relative size-14 shrink-0 drop-shadow-xs">
              <Image
                src="/images/logo.png"
                alt="Nikhil Gupta NG Logo"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav
            className="flex items-center gap-6 xl:gap-8"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const active = isItemActive(item)
              const isEvents = item.label === "Events"

              if (isEvents) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setEventsDropdownOpen(true)}
                    onMouseLeave={() => setEventsDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setEventsDropdownOpen(false)}
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors py-1 hover:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy rounded-sm",
                        active
                          ? "text-burgundy font-semibold"
                          : "text-neutral-700"
                      )}
                      aria-expanded={eventsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200 group-hover:rotate-180",
                          eventsDropdownOpen && "rotate-180 text-burgundy"
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Accessible Events Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 z-50",
                        eventsDropdownOpen
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                      )}
                      role="menu"
                      aria-label="Event Categories"
                    >
                      <div className="rounded-xl bg-[#FDFCF9] p-2 shadow-xl border border-border/70 divide-y divide-border/40">
                        {eventCategoriesData.map((cat) => (
                          <Link
                            key={cat.slug}
                            href="/#events"
                            role="menuitem"
                            onClick={() => setEventsDropdownOpen(false)}
                            className="block px-3.5 py-2.5 rounded-lg hover:bg-burgundy/5 transition-colors group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                          >
                            <p className="text-sm font-semibold text-neutral-800 group-hover/item:text-burgundy transition-colors">
                              {cat.title}
                            </p>
                            <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                              {cat.subtitle}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors py-1 hover:text-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy rounded-sm",
                    active
                      ? "text-burgundy font-semibold"
                      : "text-neutral-700"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: Desktop Primary CTA */}
          <div className="flex items-center">
            <Button
              asChild
              variant="bookNow"
              size="default"
              className="rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide"
            >
              <Link href="/book-now">
                <Calendar className="size-4 mr-1.5" aria-hidden="true" />
                Book Me
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] sm:top-20 lg:top-20 bg-black/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[72px] sm:top-20 lg:top-20 bottom-0 bg-[#FDFCF9] z-50 flex flex-col justify-between p-6 border-t border-border/70 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col space-y-3 pt-2">
            {navItems.map((item) => {
              const active = isItemActive(item)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-lg font-medium py-2.5 px-3.5 rounded-lg transition-colors",
                    active
                      ? "bg-burgundy/10 text-burgundy font-semibold"
                      : "text-neutral-800 hover:bg-neutral-100"
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="size-2 rounded-full bg-burgundy" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="pt-8 pb-4 border-t border-border/70 mt-6">
            <Button
              asChild
              variant="bookNow"
              size="lg"
              className="w-full justify-center rounded-lg text-base font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/book-now">
                <Calendar className="size-4 mr-2" aria-hidden="true" />
                Book Me For Your Event
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
