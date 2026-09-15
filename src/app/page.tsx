import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { AboutAndServices } from "@/components/sections/about-and-services"
import { Stats } from "@/components/sections/stats"
import { Events } from "@/components/sections/events"
import { GallerySection } from "@/components/sections/gallery-section"
import { ReelsSection } from "@/components/sections/reels-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCF9]">
      {/* Global Application Shell Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Primary Hero Section closely replicating reference */}
        <Hero />

        {/* About Me & What I Do Section */}
        <AboutAndServices />

        {/* Statistics & Credibility Strip */}
        <Stats />

        {/* Event Categories Directory */}
        <Events />

        {/* Categorized Gallery Section */}
        <GallerySection />

        {/* Instagram-Inspired Reels & Video Highlights */}
        <ReelsSection />
      </main>
    </div>
  )
}




