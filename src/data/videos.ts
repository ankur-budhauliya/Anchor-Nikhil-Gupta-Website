export type VideoCategory = "games" | "reels" | "testimonials" | "uwi"

export interface VideoItem {
  id: string
  title: string
  subtitle?: string
  category: VideoCategory
  src: string
  poster?: string
  aspectRatio: "vertical" | "landscape"
}

export interface VideoCategoryConfig {
  id: VideoCategory
  slug: string
  label: string
  folder: string
  subtitle: string
  previewImage: string
}

export const videoCategoriesData: VideoCategoryConfig[] = [
  {
    id: "games",
    slug: "games",
    label: "Games",
    folder: "VIDEOS/GAMES/",
    subtitle: "Playful audience interactions & stage games",
    previewImage: "/images/PHOTOS/2%20Birthday/079A7821.JPG",
  },
  {
    id: "reels",
    slug: "reels",
    label: "Reels",
    folder: "VIDEOS/REELS/",
    subtitle: "High-voltage stage entries & event highlights",
    previewImage: "/images/PHOTOS/4%20SANGEET/IMG_8139.JPG",
  },
  {
    id: "testimonials",
    slug: "testimonials",
    label: "Testimonials",
    folder: "VIDEOS/TESTIMONIALS/",
    subtitle: "Client & organizer video feedback",
    previewImage: "/images/PHOTOS/3%20Engagement/976A4564.JPG",
  },
  {
    id: "uwi",
    slug: "uwi",
    label: "UWI",
    folder: "VIDEOS/UWI/",
    subtitle: "Unique wedding ideas & signature concepts",
    previewImage: "/images/PHOTOS/5%20Varmala/019A2608.JPG",
  },
]

export const videoItemsData: VideoItem[] = [
  // 1. REELS Category (VIDEOS/REELS/)
  {
    id: "reel-1",
    title: "Stage Energy & Grand Entrance",
    subtitle: "Destination Wedding Sangeet",
    category: "reels",
    src: "/images/VIDEOS/REELS/55.mp4",
    poster: "/images/PHOTOS/4%20SANGEET/IMG_8139.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-2",
    title: "Crowd Interaction & Humour",
    subtitle: "Celebration Night",
    category: "reels",
    src: "/images/VIDEOS/REELS/1010.mp4",
    poster: "/images/PHOTOS/2%20Birthday/079A7821.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-3",
    title: "High-Voltage Varmala Entry",
    subtitle: "Wedding Ceremony",
    category: "reels",
    src: "/images/VIDEOS/REELS/44.mp4",
    poster: "/images/PHOTOS/5%20Varmala/019A2608.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-4",
    title: "Haldi Carnival Madness",
    subtitle: "Pre-Wedding Festivities",
    category: "reels",
    src: "/images/VIDEOS/REELS/33.mp4",
    poster: "/images/PHOTOS/1%20HALDI/DSC00699.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-5",
    title: "Corporate Summit Hosting",
    subtitle: "Leadership Awards",
    category: "reels",
    src: "/images/VIDEOS/REELS/66.mp4",
    poster: "/images/PHOTOS/8%20Corporate/P1085884.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-6",
    title: "Baraat on Wheels Hosting",
    subtitle: "Street Energy",
    category: "reels",
    src: "/images/VIDEOS/REELS/77.mp4",
    poster: "/images/PHOTOS/7%20Baarat%20on%20wheel/0M9A9936.JPG",
    aspectRatio: "vertical",
  },
  {
    id: "reel-7",
    title: "Ring Ceremony Moments",
    subtitle: "Engagement Night",
    category: "reels",
    src: "/images/VIDEOS/REELS/99.mp4",
    poster: "/images/PHOTOS/3%20Engagement/976A4564.JPG",
    aspectRatio: "vertical",
  },

  // 2. GAMES Category (VIDEOS/GAMES/)
  {
    id: "game-1",
    title: "Interactive Stage Game A",
    subtitle: "Crowd Fun & Laughter",
    category: "games",
    src: "/images/VIDEOS/GAMES/A.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-2",
    title: "Couple Chemistry Game B",
    subtitle: "Sangeet Challenge",
    category: "games",
    src: "/images/VIDEOS/GAMES/B.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-3",
    title: "Audience Quiz & Rapid Fire C",
    subtitle: "Stage Activity",
    category: "games",
    src: "/images/VIDEOS/GAMES/C.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-4",
    title: "Family Dance Off Game D",
    subtitle: "Wedding Activity",
    category: "games",
    src: "/images/VIDEOS/GAMES/D.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-5",
    title: "Crowd Interaction F",
    subtitle: "Stage Fun",
    category: "games",
    src: "/images/VIDEOS/GAMES/F.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-6",
    title: "Stage Activity H",
    subtitle: "Crowd Energy",
    category: "games",
    src: "/images/VIDEOS/GAMES/H.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-7",
    title: "Stage Challenge I",
    subtitle: "Audience Fun",
    category: "games",
    src: "/images/VIDEOS/GAMES/I.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-8",
    title: "Couple Game J",
    subtitle: "Stage Interaction",
    category: "games",
    src: "/images/VIDEOS/GAMES/J.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "game-9",
    title: "Celebration Game L",
    subtitle: "Party Highlight",
    category: "games",
    src: "/images/VIDEOS/GAMES/L.mp4",
    aspectRatio: "vertical",
  },

  // 3. TESTIMONIALS Category (VIDEOS/TESTIMONIALS/)
  {
    id: "test-1",
    title: "Client Testimonial 1",
    subtitle: "Organizer Feedback",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/1.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-2",
    title: "Client Testimonial 2",
    subtitle: "Bride & Groom Review",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/2.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-3",
    title: "Client Testimonial 3",
    subtitle: "Event Host Feedback",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/3.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-4",
    title: "Client Testimonial 5",
    subtitle: "Family Review",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/5.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-5",
    title: "Client Testimonial 6",
    subtitle: "Sangeet Host Review",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/6.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-6",
    title: "Client Testimonial 7",
    subtitle: "Wedding Organizer",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/7.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-7",
    title: "Client Testimonial 9",
    subtitle: "Corporate Client Review",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/9.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-8",
    title: "Client Testimonial 10",
    subtitle: "Celebration Host Feedback",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/10.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-9",
    title: "Client Testimonial 11",
    subtitle: "Event Feedback",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/11.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-10",
    title: "Client Feedback Mix 1",
    subtitle: "Organizer Reactions",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%201.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-11",
    title: "Client Feedback Mix 2",
    subtitle: "Event Moments Review",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%202.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "test-12",
    title: "Client Feedback Mix 3",
    subtitle: "Stage Hosting Praise",
    category: "testimonials",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%203.mp4",
    aspectRatio: "vertical",
  },

  // 4. UWI Category (VIDEOS/UWI/)
  {
    id: "uwi-1",
    title: "Signature Stage Entrance",
    subtitle: "UWI Highlight 3",
    category: "uwi",
    src: "/images/VIDEOS/UWI/UWI%203%20Signature%20Reel.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "uwi-2",
    title: "Live Painting Experience",
    subtitle: "UWI Highlight 4",
    category: "uwi",
    src: "/images/VIDEOS/UWI/UWI%204%20Live%20Painting.mp4",
    aspectRatio: "vertical",
  },
  {
    id: "uwi-3",
    title: "Photo Wall Crowd Moment",
    subtitle: "UWI Highlight 7",
    category: "uwi",
    src: "/images/VIDEOS/UWI/UWI%207%20photo%20wall.mp4",
    aspectRatio: "vertical",
  },
]
