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
    slug: "weddings",
    title: "Wedding Events",
    subtitle: "Haldi, Engagement, Sangeet & Varmala",
    description:
      "Capturing the emotion, grandeur, and royal celebrations of destination weddings hosted by Nikhil Gupta.",
    coverImage: "/images/PHOTOS/3%20Engagement/976A4564.JPG",
    images: [
      { id: "w-1", src: "/images/PHOTOS/3%20Engagement/976A4564.JPG", title: "Ring Exchange Ceremony" },
      { id: "w-2", src: "/images/PHOTOS/5%20Varmala/019A2608.JPG", title: "Varmala Grand Entry" },
      { id: "w-3", src: "/images/PHOTOS/4%20SANGEET/IMG_8139.JPG", title: "Sangeet Night Celebration" },
      { id: "w-4", src: "/images/PHOTOS/1%20HALDI/DSC00699.JPG", title: "Haldi Carnival Energy" },
      { id: "w-5", src: "/images/PHOTOS/1%20HALDI/DSC_1124.JPG", title: "Haldi Joyful Moment" },
      { id: "w-6", src: "/images/PHOTOS/1%20HALDI/DSC_3206.JPG", title: "Haldi Stage Hosting" },
      { id: "w-7", src: "/images/PHOTOS/1%20HALDI/151A1311.JPG", title: "Haldi Ritual" },
      { id: "w-8", src: "/images/PHOTOS/1%20HALDI/IMG_9021.JPG", title: "Haldi Stage Moments" },
      { id: "w-9", src: "/images/PHOTOS/3%20Engagement/DSC_3968.JPG", title: "Engagement Hosting" },
      { id: "w-10", src: "/images/PHOTOS/3%20Engagement/DSC05802.JPG", title: "Engagement Stage" },
      { id: "w-11", src: "/images/PHOTOS/4%20SANGEET/DSC_1660.JPG", title: "Sangeet Dance Host" },
      { id: "w-12", src: "/images/PHOTOS/4%20SANGEET/IMG_2531.JPG", title: "Sangeet Performances" },
      { id: "w-13", src: "/images/PHOTOS/5%20Varmala/0Q1A0308.JPG", title: "Varmala Ceremony" },
      { id: "w-14", src: "/images/PHOTOS/5%20Varmala/DSC_0760.JPG", title: "Varmala Stage" },
      { id: "w-15", src: "/images/PHOTOS/7%20Baarat%20on%20wheel/0M9A9936.JPG", title: "Baraat on Wheels Procession" },
    ],
  },
  {
    slug: "special-occasions",
    title: "Special Occasions",
    subtitle: "Birthdays, Anniversaries & Parties",
    description:
      "Vibrant moments from personal celebrations, milestone birthdays, and festive band nights.",
    coverImage: "/images/PHOTOS/2%20Birthday/079A7821.JPG",
    images: [
      { id: "s-1", src: "/images/PHOTOS/2%20Birthday/079A7821.JPG", title: "Milestone Birthday Hosting" },
      { id: "s-2", src: "/images/PHOTOS/2%20Birthday/RIO03760.JPG", title: "Birthday Party Stage" },
      { id: "s-3", src: "/images/PHOTOS/2%20Birthday/RIO03324.JPG", title: "Party Energy" },
      { id: "s-4", src: "/images/PHOTOS/2%20Birthday/079A7757.JPG", title: "Stage Interaction" },
      { id: "s-5", src: "/images/PHOTOS/2%20Birthday/069A6105.JPG", title: "Birthday Host" },
      { id: "s-6", src: "/images/PHOTOS/2%20Birthday/1N9A5442.JPG", title: "Celebration Night" },
      { id: "s-7", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0027.jpg", title: "Anniversary Celebration" },
      { id: "s-8", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0023.jpg", title: "Anniversary Stage" },
      { id: "s-9", src: "/images/PHOTOS/6%20Anniversry/IMG-20260707-WA0024.jpg", title: "Anniversary Toast" },
      { id: "s-10", src: "/images/PHOTOS/2%20Birthday/P1005513.JPG", title: "Party Host" },
    ],
  },
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    subtitle: "Conferences, Summits & Awards",
    description:
      "Professional stage hosting, formal summits, product launches, and prestigious award ceremonies.",
    coverImage: "/images/PHOTOS/8%20Corporate/P1085884.JPG",
    images: [
      { id: "c-1", src: "/images/PHOTOS/8%20Corporate/P1085884.JPG", title: "Corporate Summit Stage" },
      { id: "c-2", src: "/images/PHOTOS/8%20Corporate/DSC_0159~2.JPG", title: "Award Show Hosting" },
      { id: "c-3", src: "/images/PHOTOS/8%20Corporate/DSC_0162.JPG", title: "Corporate Presentation" },
      { id: "c-4", src: "/images/PHOTOS/8%20Corporate/DSC_0677.JPG", title: "Summit Address" },
      { id: "c-5", src: "/images/PHOTOS/8%20Corporate/DSC_0138~2.JPG", title: "Stage Leadership" },
      { id: "c-6", src: "/images/PHOTOS/9%20OTHER/DSC_0873.JPG", title: "Live Stage Host" },
      { id: "c-7", src: "/images/PHOTOS/9%20OTHER/RIO04108.JPG", title: "Audience Engagement" },
    ],
  },
  {
    slug: "posters-other",
    title: "Posters & Other",
    subtitle: "Show Creatives & Event Banners",
    description:
      "Official event posters, show promo graphics, publicity banners, and creative media assets.",
    coverImage: "/images/PHOTOS/POSTERS/Publicity%20Poster%20ANG.png",
    isPosters: true,
    images: [
      { id: "p-1", src: "/images/PHOTOS/POSTERS/Publicity%20Poster%20ANG.png", title: "Official ANG Publicity Poster" },
      { id: "p-2", src: "/images/PHOTOS/POSTERS/ANG%20Feb%202026.png", title: "ANG Event Banner" },
      { id: "p-3", src: "/images/PHOTOS/POSTERS/6%20May%202026%202%20STATES.png", title: "2 States Event Poster" },
      { id: "p-4", src: "/images/PHOTOS/POSTERS/ENGAGEMENT%20CEREMONY%2016%20APRIL%202026%20FARRUKHABAD.png", title: "Farrukhabad Engagement Poster" },
      { id: "p-5", src: "/images/PHOTOS/POSTERS/25%20April%202026%20Dakhvani%20Resort%20Etah,%20UP.png", title: "Dakhvani Resort Etah Poster" },
      { id: "p-6", src: "/images/PHOTOS/POSTERS/Dishita%E2%80%99s%201St%20Birthday%20%2019%20April%202026%20Hotel%20Shree%20Hari,%20Orai,%20UP.png", title: "1st Birthday Host Poster" },
      { id: "p-7", src: "/images/PHOTOS/POSTERS/Hosting%20Trishik%E2%80%99s%20Halfie%20Birthday%2027%20MARCH%202026%20%20Shyama%20Sarovar%20Portico.png", title: "Halfie Birthday Banner" },
      { id: "p-8", src: "/images/PHOTOS/POSTERS/Adbhut%20April%202026%20Poster.png", title: "Adbhut April Poster" },
      { id: "p-9", src: "/images/PHOTOS/POSTERS/4%20%26%205%20MAY%202026%20AS%20Hotel%E2%80%99s%20Khajuraho,%20M.P..png", title: "Khajuraho Host Poster" },
    ],
  },
  {
    slug: "profile-portraits",
    title: "Stage Portraits",
    subtitle: "Anchor Portraits & Media Kit",
    description:
      "High-resolution profile portraits, studio shots, and stage wear photography of Anchor Nikhil Gupta.",
    coverImage: "/images/PROFILE/976A4397.JPG",
    images: [
      { id: "pr-1", src: "/images/PROFILE/976A4397.JPG", title: "Stage Microphone Portrait" },
      { id: "pr-2", src: "/images/PROFILE/0M9A1978.JPG", title: "Luxury Suit Profile" },
      { id: "pr-3", src: "/images/PROFILE/DSC_4500~2.JPG", title: "Studio Portrait" },
      { id: "pr-4", src: "/images/PROFILE/DSC01054.JPG", title: "Stage Smile Portrait" },
      { id: "pr-5", src: "/images/PROFILE/DSC01052.JPG", title: "Formal Stage Suit" },
      { id: "pr-6", src: "/images/PROFILE/0Q1A0047.JPG", title: "Stage Presentation" },
      { id: "pr-7", src: "/images/PROFILE/647A0938.JPG", title: "Mic Portrait" },
      { id: "pr-8", src: "/images/PROFILE/DSC_1625.JPG", title: "Stage Pose" },
      { id: "pr-9", src: "/images/PROFILE/1Y3A1778.JPG", title: "Media Kit Portrait" },
      { id: "pr-10", src: "/images/PROFILE/RIO04131.JPG", title: "Anchor Smile" },
    ],
  },
]
