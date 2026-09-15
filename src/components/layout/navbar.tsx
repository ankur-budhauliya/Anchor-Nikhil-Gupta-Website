"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Videos", href: "#videos" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-[#FDFCF9]/95 backdrop-blur-md shadow-xs border-b border-border/60"
          : "bg-[#FDFCF9]"
      )}
    >
      <div className="container-hero flex h-20 items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy rounded-full"
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

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors py-1 hover:text-burgundy",
                item.active
                  ? "text-burgundy font-semibold"
                  : "text-neutral-700"
              )}
            >
              {item.label}
              {item.active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-burgundy rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop Primary CTA */}
        <div className="hidden md:flex items-center">
          <Button
            asChild
            variant="bookNow"
            size="default"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide"
          >
            <Link href="#book">
              <Calendar className="size-4 mr-1.5" aria-hidden="true" />
              Book Me
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            asChild
            variant="bookNow"
            size="sm"
            className="rounded-lg px-3 text-xs font-semibold"
          >
            <Link href="#book">
              <Calendar className="size-3.5 mr-1" aria-hidden="true" />
              Book Me
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 hover:text-burgundy hover:bg-neutral-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-20 bottom-0 bg-[#FDFCF9] z-40 flex flex-col justify-between p-6 border-t border-border/70 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col space-y-4 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between text-lg font-medium py-2.5 px-3 rounded-lg transition-colors",
                  item.active
                    ? "bg-burgundy/10 text-burgundy font-semibold"
                    : "text-neutral-800 hover:bg-neutral-100"
                )}
              >
                <span>{item.label}</span>
                {item.active && (
                  <span className="size-2 rounded-full bg-burgundy" />
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-8 pb-4 border-t border-border/70 mt-6">
            <Button
              asChild
              variant="bookNow"
              size="lg"
              className="w-full justify-center rounded-lg text-base font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="#book">
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
