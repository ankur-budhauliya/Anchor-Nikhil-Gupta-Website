export interface GalleryImage {
  id: string
  src: string
  title?: string
  caption?: string
  aspectRatio?: "square" | "portrait" | "landscape"
}

export interface GalleryCategory {
  slug: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  images: GalleryImage[]
  isPosters?: boolean
}

export const galleryCategoriesData: GalleryCategory[] = [
  {
    slug: "1-haldi",
    title: "HALDI",
    subtitle: "Haldi Carnival & Vibrant Rituals",
    description: "High-energy, joyous Haldi ceremony hosting filled with colors and vibrant crowd interaction.",
    coverImage: "/images/PHOTOS/1%20HALDI/DSC00699.JPG",
    images: [
      { id: "h-1", src: "/images/PHOTOS/1%20HALDI/151A1311.JPG", title: "Haldi Ritual Stage" },
      { id: "h-2", src: "/images/PHOTOS/1%20HALDI/151A1387.JPG", title: "Haldi Joyful Crowd" },
      { id: "h-3", src: "/images/PHOTOS/1%20HALDI/151A1566@13451765.JPG", title: "Haldi Celebration" },
      { id: "h-4", src: "/images/PHOTOS/1%20HALDI/DSC00699.JPG", title: "Haldi Stage Energy" },
      { id: "h-5", src: "/images/PHOTOS/1%20HALDI/DSC00770.JPG", title: "Haldi Host Moment" },
      { id: "h-6", src: "/images/PHOTOS/1%20HALDI/DSC00811.JPG", title: "Haldi Interactive Host" },
      { id: "h-7", src: "/images/PHOTOS/1%20HALDI/DSC_0125.JPG", title: "Haldi Ceremony Warmth" },
      { id: "h-8", src: "/images/PHOTOS/1%20HALDI/DSC_1124.JPG", title: "Haldi Carnival Atmosphere" },
      { id: "h-9", src: "/images/PHOTOS/1%20HALDI/DSC_3206.JPG", title: "Haldi Stage Presentation" },
      { id: "h-10", src: "/images/PHOTOS/1%20HALDI/DSC_3228.JPG", title: "Haldi Vibrant Stage" },
      { id: "h-11", src: "/images/PHOTOS/1%20HALDI/IMG_2769.JPG", title: "Haldi Festivities" },
      { id: "h-12", src: "/images/PHOTOS/1%20HALDI/IMG_9021.JPG", title: "Haldi Anchor Moments" },
      { id: "h-13", src: "/images/PHOTOS/1%20HALDI/IMG_9073.JPG", title: "Haldi Event Highlight" },
    ],
  },
  {
    slug: "2-birthday",
    title: "Birthday",
    subtitle: "Milestone Birthdays & Theme Parties",
    description: "Fun, engaging, and memorable birthday celebration hosting for all age groups.",
    coverImage: "/images/PHOTOS/2%20Birthday/079A7821.JPG",
    images: [
      { id: "b-1", src: "/images/PHOTOS/2%20Birthday/069A6105.JPG", title: "Birthday Party Hosting" },
      { id: "b-2", src: "/images/PHOTOS/2%20Birthday/079A7757.JPG", title: "Stage Birthday Interaction" },
      { id: "b-3", src: "/images/PHOTOS/2%20Birthday/079A7821.JPG", title: "Milestone Celebration Host" },
      { id: "b-4", src: "/images/PHOTOS/2%20Birthday/0H5A5175.JPG", title: "Birthday Celebration Moments" },
      { id: "b-5", src: "/images/PHOTOS/2%20Birthday/1N9A5442.JPG", title: "Birthday Gala Night" },
      { id: "b-6", src: "/images/PHOTOS/2%20Birthday/DSC_4562.JPG", title: "Stage Games & Fun" },
      { id: "b-7", src: "/images/PHOTOS/2%20Birthday/P1005513.JPG", title: "Birthday Host Smile" },
      { id: "b-8", src: "/images/PHOTOS/2%20Birthday/P1175292.JPG", title: "Birthday Party Energy" },
      { id: "b-9", src: "/images/PHOTOS/2%20Birthday/RIO03324.JPG", title: "Crowd Fun & Games" },
      { id: "b-10", src: "/images/PHOTOS/2%20Birthday/RIO03760.JPG", title: "Stage Entertainment" },
    ],
  },
  {
    slug: "3-engagement",
    title: "Engagement",
    subtitle: "Ring Exchange & Royal Ceremonies",
    description: "Elegant and sophisticated ring exchange and engagement hosting moments.",
    coverImage: "/images/PHOTOS/3%20Engagement/976A4564.JPG",
    images: [
      { id: "e-1", src: "/images/PHOTOS/3%20Engagement/0D3A5416~2.JPG", title: "Engagement Stage Elegance" },
      { id: "e-2", src: "/images/PHOTOS/3%20Engagement/976A4564.JPG", title: "Ring Exchange Ceremony" },
      { id: "e-3", src: "/images/PHOTOS/3%20Engagement/DSC05802.JPG", title: "Engagement Grand Entrance" },
      { id: "e-4", src: "/images/PHOTOS/3%20Engagement/DSC_3968.JPG", title: "Engagement Host Presentation" },
      { id: "e-5", src: "/images/PHOTOS/3%20Engagement/WhatsApp%20Image%202026-04-29%20at%208.14.12%20PM%20(1).jpeg", title: "Engagement Couple Spotlight" },
    ],
  },
  {
    slug: "4-sangeet",
    title: "SANGEET",
    subtitle: "Musical Sangeet & Dance Nights",
    description: "Glamorous, music-filled sangeet hosting with high-octane stage energy.",
    coverImage: "/images/PHOTOS/4%20SANGEET/IMG_8139.JPG",
    images: [
      { id: "s-1", src: "/images/PHOTOS/4%20SANGEET/DSC_1660.JPG", title: "Sangeet Dance Host" },
      { id: "s-2", src: "/images/PHOTOS/4%20SANGEET/IMG_2531.JPG", title: "Sangeet Stage Performances" },
      { id: "s-3", src: "/images/PHOTOS/4%20SANGEET/IMG_8139.JPG", title: "Sangeet Night Host" },
      { id: "s-4", src: "/images/PHOTOS/4%20SANGEET/Picsart_25-12-06_13-22-24-440.jpg", title: "Sangeet Musical Spotlight" },
    ],
  },
  {
    slug: "5-varmala",
    title: "Varmala",
    subtitle: "Grand Varmala & Royal Entries",
    description: "Spectacular Varmala theme concepts, fireworks, and magical stage announcements.",
    coverImage: "/images/PHOTOS/5%20Varmala/019A2608.JPG",
    images: [
      { id: "v-1", src: "/images/PHOTOS/5%20Varmala/019A2608.JPG", title: "Varmala Grand Entry" },
      { id: "v-2", src: "/images/PHOTOS/5%20Varmala/0Q1A0308.JPG", title: "Royal Varmala Ceremony" },
      { id: "v-3", src: "/images/PHOTOS/5%20Varmala/DSC_0760.JPG", title: "Varmala Stage Spotlight" },
      { id: "v-4", src: "/images/PHOTOS/5%20Varmala/IMG_4197.HEIC", title: "Varmala Moment" },
    ],
  },
  {
    slug: "6-anniversry",
    title: "Anniversary",
    subtitle: "Milestone Wedding Anniversaries",
    description: "Warm, heartwarming anniversary celebrations honoring years of togetherness.",
    coverImage: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0023.jpg",
    images: [
      { id: "a-1", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0023.jpg", title: "Anniversary Stage Host" },
      { id: "a-2", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0024.jpg", title: "Anniversary Toast & Wishes" },
      { id: "a-3", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0027.jpg", title: "Anniversary Celebration" },
      { id: "a-4", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0029~2.jpg", title: "Anniversary Special Moments" },
    ],
  },
  {
    slug: "7-baarat-on-wheel",
    title: "Baarat on wheel",
    subtitle: "High-Energy Mobile Processions",
    description: "Dynamic outdoor Baraat on Wheels hosting and mobile procession coordination.",
    coverImage: "/images/PHOTOS/7%20Baarat%20on%20wheel/0M9A9936.JPG",
    images: [
      { id: "bow-1", src: "/images/PHOTOS/7%20Baarat%20on%20wheel/0M9A9936.JPG", title: "Baraat on Wheels Procession" },
    ],
  },
  {
    slug: "8-corporate",
    title: "Corporate",
    subtitle: "Conferences, Summits & Awards",
    description: "Polished, professional corporate hosting for award nights, summits, and launches.",
    coverImage: "/images/PHOTOS/8%20Corporate/P1085884.JPG",
    images: [
      { id: "c-1", src: "/images/PHOTOS/8%20Corporate/DSC_0138~2.JPG", title: "Stage Leadership" },
      { id: "c-2", src: "/images/PHOTOS/8%20Corporate/DSC_0159~2.JPG", title: "Award Show Host" },
      { id: "c-3", src: "/images/PHOTOS/8%20Corporate/DSC_0162.JPG", title: "Corporate Presentation" },
      { id: "c-4", src: "/images/PHOTOS/8%20Corporate/DSC_0677.JPG", title: "Summit Keynote Address" },
      { id: "c-5", src: "/images/PHOTOS/8%20Corporate/P1085884.JPG", title: "Corporate Stage Grandeur" },
    ],
  },
  {
    slug: "9-other",
    title: "OTHER",
    subtitle: "Live Concerts, Shows & Highlights",
    description: "Diverse live stage events, celebrity interactions, and open-air concert hosting.",
    coverImage: "/images/PHOTOS/9%20OTHER/DSC_0873.JPG",
    images: [
      { id: "o-1", src: "/images/PHOTOS/9%20OTHER/DSC00875.JPG", title: "Live Event Hosting" },
      { id: "o-2", src: "/images/PHOTOS/9%20OTHER/DSC09900.JPG", title: "Stage Energy" },
      { id: "o-3", src: "/images/PHOTOS/9%20OTHER/DSC_0170.JPG", title: "Audience Interaction" },
      { id: "o-4", src: "/images/PHOTOS/9%20OTHER/DSC_0873.JPG", title: "Live Concert Host" },
      { id: "o-5", src: "/images/PHOTOS/9%20OTHER/DSC_5695.JPG", title: "Show Host Spotlight" },
      { id: "o-6", src: "/images/PHOTOS/9%20OTHER/DSC_9264.JPG", title: "Stage Atmosphere" },
      { id: "o-7", src: "/images/PHOTOS/9%20OTHER/IMG-20260804-WA0005~2.jpg", title: "Special Event Moments" },
      { id: "o-8", src: "/images/PHOTOS/9%20OTHER/RIO04108.JPG", title: "Crowd Engagement" },
    ],
  },
  {
    slug: "posters",
    title: "POSTERS",
    subtitle: "Event Banners & Promo Creatives",
    description: "Official event posters, show publicity graphics, and event creative designs.",
    coverImage: "/images/PHOTOS/POSTERS/Publicity%20Poster%20ANG.png",
    isPosters: true,
    images: [
      { id: "p-1", src: "/images/PHOTOS/POSTERS/1.png", title: "Official ANG Show Creative" },
      { id: "p-2", src: "/images/PHOTOS/POSTERS/25%20April%202026%20Dakhvani%20Resort%20Etah,%20UP.png", title: "Dakhvani Resort Etah Poster" },
      { id: "p-3", src: "/images/PHOTOS/POSTERS/4%20%26%205%20MAY%202026%20AS%20Hotel%E2%80%99s%20Khajuraho,%20M.P..png", title: "Khajuraho Host Poster" },
      { id: "p-4", src: "/images/PHOTOS/POSTERS/6%20May%202026%202%20STATES.png", title: "2 States Event Poster" },
      { id: "p-5", src: "/images/PHOTOS/POSTERS/ANG%20Feb%202026.png", title: "ANG Event Banner" },
      { id: "p-6", src: "/images/PHOTOS/POSTERS/Adbhut%20April%202026%20Poster.png", title: "Adbhut April Poster" },
      { id: "p-7", src: "/images/PHOTOS/POSTERS/Dishita%E2%80%99s%201St%20Birthday%20%2019%20April%202026%20Hotel%20Shree%20Hari,%20Orai,%20UP.png", title: "1st Birthday Host Poster" },
      { id: "p-8", src: "/images/PHOTOS/POSTERS/ENGAGEMENT%20CEREMONY%2016%20APRIL%202026%20FARRUKHABAD.png", title: "Farrukhabad Engagement Poster" },
      { id: "p-9", src: "/images/PHOTOS/POSTERS/Hosting%20Trishik%E2%80%99s%20Halfie%20Birthday%2027%20MARCH%202026%20%20Shyama%20Sarovar%20Portico.png", title: "Halfie Birthday Banner" },
      { id: "p-10", src: "/images/PHOTOS/POSTERS/My%20Love.png", title: "Event Creative Poster" },
      { id: "p-11", src: "/images/PHOTOS/POSTERS/Publicity%20Poster%20ANG.png", title: "Official ANG Publicity Poster" },
    ],
  },
]
