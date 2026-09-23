import { VideoItem } from "@/data/videos"

export interface VideoTestimonialItem {
  id: string
  title: string
  subtitle?: string
  src: string
  poster?: string
  clientName?: string
  eventContext?: string
  duration?: string
  aspectRatio: "vertical" | "landscape"
}

export interface WrittenTestimonial {
  id: string
  name: string
  eventContext?: string
  message: string
}

export interface WhatsAppFeedbackItem {
  id: string
  src: string
  alt: string
  clientName: string
  eventContext: string
  quoteSnippet: string
}

export const writtenTestimonialsData: WrittenTestimonial[] = [
  {
    id: "wt-1",
    name: "Priyal Kastwar",
    eventContext: "Bride • Haldi & Sangeet",
    message:
      "A huge thank you for making my Haldi and Sangeet so memorable and full of fun. Your energy, anchoring, and the way you kept everyone engaged made the celebrations even more special for us. Everyone absolutely loved the vibe you created! Thank you for being such an important part of our wedding celebrations and for giving us memories we’ll always cherish.",
  },
  {
    id: "wt-2",
    name: "Suja Gupta",
    eventContext: "Birthday Celebration",
    message:
      "You guys did an absolutely superb job! On my way back home, I received so many great reviews for both of you (which legitimately made me so happy as there was so much hard work involved overall and results are visible). At the end I was so happy seeing my family enjoying on the dance floor... everything was great and we shall work again soon. I have my go-to anchor fixed for any upcoming event!",
  },
  {
    id: "wt-3",
    name: "Ankit",
    eventContext: "Live Stage Program",
    message:
      "Just wanted to say that you were an awesome anchor for the program. Your spontaneity with the creative use of liberty added elegance to the show. Go great always and stay healthy.",
  },
  {
    id: "wt-4",
    name: "Oshi",
    message:
      "Bahut shandar, poore program mein jaan laga di aur amazing like ek-ek bande ki tarif karna, my god koi aap se sikhe koi.",
  },
  {
    id: "wt-5",
    name: "Vaishali Dubey",
    message:
      "The best part was how well you handled things on the fly. It didn't feel like you were meeting the family for the first time; the way you connected with them so easily was really great. I loved it—honestly, from now on, whenever something comes up, I’m going to message you first to ask for ideas on what to do and how to go about it.",
  },
  {
    id: "wt-6",
    name: "Ritu",
    message:
      "We are here in AAFT,\nHe's a superb anchor.\nI loved every bit, the way he kept the crowd together, the way he was cracking jokes and the way he was making everyone dance on their heels.\nSo I would say he's superb and Nikhil, all the best for your future.",
  },
  {
    id: "wt-7",
    name: "Akash Gupta",
    message:
      "Kasam se jo aapki awaz mein Base hai na us Base ke liye hum aapko yaad karte hain, bulate hain aur har baar chahenge ki humare har ek program mein aapko shamil kiya jaye kyonki aapke aane se har program mein char chand lag jaate han.",
  },
]

export const videoTestimonialsData: VideoTestimonialItem[] = [
  {
    id: "vt-1",
    title: "Client Celebration Review 1",
    subtitle: "Warm Words on Stage Energy",
    src: "/images/VIDEOS/TESTIMONIALS/1.mp4",
    eventContext: "Wedding Festivities",
    aspectRatio: "vertical",
  },
  {
    id: "vt-2",
    title: "Couple & Family Feedback 2",
    subtitle: "Unforgettable Moments",
    src: "/images/VIDEOS/TESTIMONIALS/2.mp4",
    eventContext: "Reception Celebration",
    aspectRatio: "vertical",
  },
  {
    id: "vt-3",
    title: "Event Host Experience 3",
    subtitle: "Stage Hosting Praise",
    src: "/images/VIDEOS/TESTIMONIALS/3.mp4",
    eventContext: "Sangeet Night",
    aspectRatio: "vertical",
  },
  {
    id: "vt-4",
    title: "Client Feedback 5",
    subtitle: "Interactive Host Review",
    src: "/images/VIDEOS/TESTIMONIALS/5.mp4",
    eventContext: "Family Occasion",
    aspectRatio: "vertical",
  },
  {
    id: "vt-5",
    title: "Client Review 6",
    subtitle: "Crowd Connection & Fun",
    src: "/images/VIDEOS/TESTIMONIALS/6.mp4",
    eventContext: "Wedding Function",
    aspectRatio: "vertical",
  },
  {
    id: "vt-6",
    title: "Client Feedback 7",
    subtitle: "Memories Shared on Camera",
    src: "/images/VIDEOS/TESTIMONIALS/7.mp4",
    eventContext: "Celebration Night",
    aspectRatio: "vertical",
  },
  {
    id: "vt-7",
    title: "Client Testimonial 9",
    subtitle: "Professional Anchoring Praise",
    src: "/images/VIDEOS/TESTIMONIALS/9.mp4",
    eventContext: "Special Event",
    aspectRatio: "vertical",
  },
  {
    id: "vt-8",
    title: "Client Feedback 10",
    subtitle: "Genuine Client Gratitude",
    src: "/images/VIDEOS/TESTIMONIALS/10.mp4",
    eventContext: "Grand Celebration",
    aspectRatio: "vertical",
  },
  {
    id: "vt-9",
    title: "Client Review 11",
    subtitle: "Stage Vibrancy & Warmth",
    src: "/images/VIDEOS/TESTIMONIALS/11.mp4",
    eventContext: "Social Celebration",
    aspectRatio: "vertical",
  },
  {
    id: "vt-10",
    title: "Highlight Reactions Mix 1",
    subtitle: "Spontaneous Guest Smiles",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%201.mp4",
    eventContext: "Multi-Event Highlights",
    aspectRatio: "vertical",
  },
  {
    id: "vt-11",
    title: "Crowd Reactions Mix 2",
    subtitle: "Laughter & Cheer",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%202.mp4",
    eventContext: "Multi-Event Highlights",
    aspectRatio: "vertical",
  },
  {
    id: "vt-12",
    title: "Memorable Reactions Mix 3",
    subtitle: "Post-Event Appreciation",
    src: "/images/VIDEOS/TESTIMONIALS/MIX%203.mp4",
    eventContext: "Multi-Event Highlights",
    aspectRatio: "vertical",
  },
]

export const whatsappFeedbackData: WhatsAppFeedbackItem[] = [
  {
    id: "wa-1",
    src: "/images/Text%20testimonials%20/Priyal%20kastvar%20Bride.png",
    alt: "WhatsApp feedback screenshot from Bride Priyal Kastwar",
    clientName: "Priyal Kastwar",
    eventContext: "Bride • Haldi & Sangeet",
    quoteSnippet:
      "A huge thank you for making my Haldi and Sangeet so memorable and full of fun. Everyone absolutely loved the vibe you created!",
  },
  {
    id: "wa-2",
    src: "/images/Text%20testimonials%20/Suja%20Gupta_.png",
    alt: "WhatsApp group feedback from Suja Gupta for birthday celebration",
    clientName: "Suja Gupta",
    eventContext: "Birthday Celebration",
    quoteSnippet:
      "You guys did an absolutely superb job! On my way back home.. I received so many great reviews... seeing my family enjoying on the dance floor.",
  },
  {
    id: "wa-3",
    src: "/images/Text%20testimonials%20/Ankit.png",
    alt: "Instagram direct message feedback from Ankit",
    clientName: "Ankit",
    eventContext: "Live Event Review",
    quoteSnippet:
      "Just wanted to say that you were awesome anchor for the program. Your Spontaneity with the creative use of Liberty added elegance to the show.",
  },
]

// Curated 3 video testimonials for the homepage
export const featuredVideoTestimonials = videoTestimonialsData.slice(0, 3)

export const testimonialVideoItems: VideoItem[] = videoTestimonialsData.map((v) => ({
  id: v.id,
  title: v.title,
  subtitle: v.subtitle,
  category: "testimonials",
  src: v.src,
  poster: v.poster,
  aspectRatio: v.aspectRatio,
}))
