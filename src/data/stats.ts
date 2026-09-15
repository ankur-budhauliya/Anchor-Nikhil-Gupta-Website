export interface StatItem {
  id: string
  value: string
  numericValue?: number
  prefix?: string
  suffix?: string
  label: string
  subtitle?: string
}

export const statsData: StatItem[] = [
  {
    id: "years-experience",
    value: "3+",
    numericValue: 3,
    suffix: "+",
    label: "Years of Experience",
    subtitle: "Stage & Live Media",
  },
  {
    id: "events-hosted",
    value: "70+",
    numericValue: 70,
    suffix: "+",
    label: "Events Hosted",
    subtitle: "In Last 12 Months",
  },
  {
    id: "audience-entertained",
    value: "50K+",
    numericValue: 50,
    suffix: "K+",
    label: "Audience Entertained",
    subtitle: "Live Spectators",
  },
  {
    id: "pan-india",
    value: "100%",
    numericValue: 100,
    suffix: "%",
    label: "Pan India Reach",
    subtitle: "Destination Specialist",
  },
  {
    id: "smiles-delivered",
    value: "♾️",
    label: "Smiles Delivered",
    subtitle: "Countless Memories",
  },
]
