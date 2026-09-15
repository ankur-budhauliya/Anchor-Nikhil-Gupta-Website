import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { AboutAndServices } from "@/components/sections/about-and-services"
import { Stats } from "@/components/sections/stats"

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
      </main>
    </div>
  )
}

