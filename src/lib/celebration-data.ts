export const graduate = {
  firstName: 'JORDAN',
  fullName: 'JORDAN ADEYEMI',
  degree: 'B.Sc. Computer Science',
  school: 'First Class Honours',
  date: 'Class of 2026',
  quote:
    'May this new chapter bring you divine favor, open doors, and countless reasons to smile. The world is ready for everything you are about to become.',
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
