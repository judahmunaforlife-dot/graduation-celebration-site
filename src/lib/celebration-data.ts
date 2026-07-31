export const graduate = {
  firstName: 'JORDAN',
  fullName: 'JORDAN ADEYEMI',
  degree: 'B.Sc. Computer Science',
  school: 'First Class Honours',
  date: 'Class of 2026',
  quote:
    'May this new chapter bring you divine favor, open doors, and countless reasons to smile. The world is ready for everything you are about to become.',
}

// Choose the visual style for this celebration instance. Available values:
// luxury | black | gold | pink | lemon | rose | midnight | school
export const siteTheme = 'luxury'

// Keep any portrait proportional while it fills the frame. Adjust the second
// value (for example, `50% 25%`) if a replacement photo needs its subject
// positioned higher or lower in the opening.
export const portrait = {
  src: '/graduate-portrait.png',
  objectPosition: '50% 35%',
}

// Personalize these event details for each graduate instance.
export const celebrationEvent = {
  title: 'Graduation Soirée',
  date: '2026-08-29T16:00:00+01:00',
  venue: 'The Grand Hall',
  location: 'Lagos, Nigeria',
  // Set to true on an instance that is collecting RSVPs. When false the whole
  // "Celebrate With Us" section is hidden and the rsvps table is unused.
  rsvpEnabled: false,
}

export type Achievement = {
  title: string
  detail: string
  year: string
}

export const achievements: Achievement[] = [
  {
    title: 'First Class Honours',
    detail: 'Graduated top of the department with a 4.9 CGPA.',
    year: '2026',
  },
  {
    title: "Dean's List, 4 Years Running",
    detail: 'Recognized every single semester for academic excellence.',
    year: '2022–2026',
  },
  {
    title: 'Hackathon Champion',
    detail: 'Led the winning team at the national student hackathon.',
    year: '2024',
  },
  {
    title: 'Research Publication',
    detail: 'Co-authored a paper on machine learning for social good.',
    year: '2025',
  },
  {
    title: 'Community Lead',
    detail: 'Mentored 40+ first-year students through the peer program.',
    year: '2023–2026',
  },
  {
    title: 'Scholarship Recipient',
    detail: 'Awarded the merit scholarship for outstanding promise.',
    year: '2023',
  },
]

export type Memory = {
  src: string
  caption: string
}

export const memories: Memory[] = [
  { src: '/graduate-portrait.png', caption: 'The big day, finally here.' },
  { src: '/memory-1.png', caption: 'Caps in the air — we made it!' },
  { src: '/memory-2.png', caption: 'Celebrating with the people who matter.' },
  { src: '/memory-3.png', caption: 'Years of work, one proud scroll.' },
]
