export interface EventCategory {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  eventTypes: string[]
  theme: "burgundy" | "dark" | "gold"
}

export const eventCategoriesData: EventCategory[] = [
  {
    slug: "wedding-events",
    title: "Wedding Events",
    subtitle: "Celebrations of Love & Heritage",
    description:
      "Bringing royal elegance, warmth, and high-energy grand entrances to make your special day truly unforgettable.",
    image: "/images/PHOTOS/3%20Engagement/976A4564.JPG",
    theme: "burgundy",
    eventTypes: [
      "Engagement Ceremony",
      "Haldi Carnival",
      "Sangeet Night",
      "Varmala",
      "Baraat on Wheels",
      "Reception Party",
      "Pool Party",
      "Cocktail Party",
      "Bachelor's Party",
      "After Party",
    ],
  },
  {
    slug: "special-occasions",
    title: "Special Occasions",
    subtitle: "Milestones, Parties & Festivals",
    description:
      "Crafting electrifying crowd interaction and memorable moments for personal celebrations and festive nights.",
    image: "/images/PHOTOS/2%20Birthday/079A7821.JPG",
    theme: "gold",
    eventTypes: [
      "Anniversary",
      "Baby Shower",
      "Birthday Party",
      "Kitty Party",
      "Retirement Party",
      "Band Night",
      "New Year Party",
      "Festival",
    ],
  },
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    subtitle: "Conferences, Summits & Brand Launches",
    description:
      "Delivering immaculate professionalism, quick wit, and seamless stage management for corporate leaders.",
    image: "/images/PHOTOS/8%20Corporate/P1085884.JPG",
    theme: "dark",
    eventTypes: [
      "Store Opening / Launch",
      "Annual Events",
      "Corporate Meeting",
      "Awards",
      "Sports",
      "School / College Fest",
      "Make-up Workshops",
      "Government Events",
    ],
  },
]
