export interface FAQItem {
  id: string
  question: string
  answer: string
  category: "booking" | "experience" | "travel"
}

export const allFAQs: FAQItem[] = [
  {
    id: "events-hosted",
    category: "experience",
    question: "What kind of events does Anchor Nikhil host?",
    answer:
      "Nikhil hosts across three primary spheres: Wedding Celebrations (Engagement ceremonies, Haldi carnivals, Sangeet nights, Varmala moments, Baraat on wheels, Pool parties, and Grand Receptions), Special Occasions (Milestone Birthdays, Anniversaries, Kitty parties, Baby showers, Retirement celebrations, and New Year bashes), and Corporate & Commercial Events (Annual corporate galas, Award ceremonies, Product launches, Business conferences, and College/University festivals).",
  },
  {
    id: "booking-process",
    category: "booking",
    question: "How do I book Anchor Nikhil for an event?",
    answer:
      "Booking is a seamless process: First, reach out through our on-site Book Me form, WhatsApp, or Instagram DM with your event date, city/venue, and event type. Second, our team verifies calendar availability for your date and connects with you. Third, we discuss your event vision, stage flow, and commercials. Once finalized, your date is formally reserved and confirmed in Nikhil's calendar.",
  },
  {
    id: "charges-pricing",
    category: "booking",
    question: "What are your charges and how is pricing determined?",
    answer:
      "Every celebration is unique, so pricing is custom-tailored based on key event parameters: the event type and scale, venue location, expected audience size, duration of stage hosting, and specific personalization requirements. We do not use rigid pre-packaged quotes. Share your event particulars with us to receive a transparent quotation tailored specifically to your needs.",
  },
  {
    id: "date-availability",
    category: "booking",
    question: "Are you available on a particular date?",
    answer:
      "Dates are allocated strictly on a first-come, first-served basis. Auspicious wedding dates, holiday weekends, and peak festive periods are often locked in months ahead. To check if Anchor Nikhil is available for your chosen date, please submit an inquiry with your date and city as early as possible.",
  },
  {
    id: "travel-locations",
    category: "travel",
    question: "Do you travel for events across India?",
    answer:
      "Yes, Anchor Nikhil travels extensively across cities in India for destination weddings, social celebrations, and corporate galas. For outstation events, travel logistics (flights/trains) and local stay arrangements are coordinated with the client or event planner.",
  },
  {
    id: "languages-spoken",
    category: "experience",
    question: "In which languages do you host?",
    answer:
      "Anchor Nikhil is fluent in Hindi, English, and conversational Hinglish. The hosting style and language mix are tailored dynamically to match your audience profile—from refined Hindi for traditional family rituals to crisp English for corporate galas or energetic Hinglish for youth-centric sangeet and college fests.",
  },
  {
    id: "customization-activities",
    category: "experience",
    question: "Can you customize the script, games, or theme for our event?",
    answer:
      "Absolutely. Personalization is central to Nikhil's hosting approach. Before every event, we gather background details about the couple, family traditions, or corporate milestones. Nikhil designs custom crowd games, interactive couple activities, and personalized anecdotes to reflect your distinct story.",
  },
  {
    id: "usp-hosting-style",
    category: "experience",
    question: "What makes Nikhil's hosting style unique?",
    answer:
      "Nikhil combines infectious stage presence, sharp spontaneous wit, and natural crowd connection without resorting to generic or clichéd scripts. Importantly, roughly 50% of the stage games and audience interactions are freshly customized for each celebration, ensuring a truly distinct and memorable experience for your guests.",
  },
  {
    id: "work-samples-videos",
    category: "travel",
    question: "Can I see work samples or live event videos?",
    answer:
      "Yes! You can watch live vertical Reels, stage game highlights, and video testimonials directly in the Videos and Testimonials sections of this website. You can also explore behind-the-scenes moments and recent event clips on verified social channels: Instagram (@anchor_nikhil_gupta) and YouTube (@19nikhilgupta).",
  },
  {
    id: "direct-contact",
    category: "travel",
    question: "How can I or my event planner contact you directly?",
    answer:
      "You or your event management team can get in touch by submitting the Book Me inquiry form on this website, sending a message via WhatsApp, or messaging directly on Instagram (@anchor_nikhil_gupta). Kindly mention the event date, city, and event type for the fastest response.",
  },
]

export const homepageFAQs: FAQItem[] = [
  allFAQs[0], // events-hosted
  allFAQs[1], // booking-process
  allFAQs[2], // charges-pricing
  allFAQs[4], // travel-locations
  allFAQs[5], // languages-spoken
  allFAQs[7], // usp-hosting-style
]
