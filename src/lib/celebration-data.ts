export const graduate = {
  firstName: 'CHELSEA',
  fullName: 'OGUNKOYA CHELSEA BOLUWATIFE',
  degree: 'B.Sc. Computer Science',
  school: 'Second Class Honours',
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
  src: '/images/graduate-portrait1.jpg',
  objectPosition: '50% 35%',
}

// Unique id of this instance's guestbook data in a shared Supabase project.
// Set a distinct value per Netlify site (e.g. "chelsea") so only this
// instance's wishes, blessings, and RSVPs are shown. Falls back to 'default'.
export const instanceId = process.env.NEXT_PUBLIC_INSTANCE_ID ?? 'default'

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
    title: '🌱 It All Started Here',
    detail: '"Every expert was once a beginner."',
    year: '2022',
  },
  {
    title: '💡 Falling in Love with Code',
    detail: '"The bugs were frustrating... but the breakthroughs were unforgettable."',
    year: '2023',
  },
  {
    title: '🚀 Turning Knowledge into Reality',
    detail: '"Theory met practice."',
    year: '2024',
  },
  {
    title: '💼 Stepping Into the Real World',
    detail: '"From the classroom to the workplace."',
    year: '2025',
  },
  {
    title: '🎓 The Finish Line... and a New Beginning',
    detail: '"The degree is just the beginning of the dream."',
    year: '2026',
  },
  {
    title: 'Second Class Honours',
    detail: 'Hard work. Growth. Achievement.',
    year: '2026',
  },
]

export type Memory = {
  src: string
  caption: string
  type?: 'image' | 'video'
}

export const memories: Memory[] = [
  { src: '/images/memory-8.jpg', caption: 'Celebrating surrounded by love.' },
  { src: '/images/memory-16.jpg', caption: 'More milestones, more memories to treasure.' },
  { src: '/images/IMG_2481.MOV', caption: 'One more unforgettable moment on film.', type: 'video' },
  { src: '/images/memory-14.jpg', caption: 'Surrounded by the people who celebrate us.' },
  { src: '/images/memory-15.jpg', caption: 'A day full of laughter and love.' },
  { src: '/images/memory-13.jpg', caption: 'Another beautiful memory from the day.' },
  { src: '/images/IMG_2456.MOV', caption: 'The celebration, captured on film.', type: 'video' },
  { src: '/images/IMG_2466.MOV', caption: 'Another golden moment from the celebration.', type: 'video' },
  { src: '/images/memory-6.jpg', caption: 'Wearing confidence, carrying purpose, and celebrating the journey.' },
  { src: '/images/memory-12.jpg', caption: 'A perfect ending to an incredible journey.' },
  { src: '/images/memory-11.jpg', caption: 'This chapter ends, but the memories last.' },
  { src: '/images/memory-2.jpg', caption: 'Highlights from a day to remember.' },
  { src: '/images/IMG_2460.MOV', caption: 'Another unforgettable moment.', type: 'video' },
  { src: '/images/IMG_2469.MOV', caption: 'Cherishing the joy of this special day.', type: 'video' },
  { src: '/images/IMG_2463.MOV', caption: 'Making memories with the people who matter most.', type: 'video' },
  { src: '/images/memory-10.jpg', caption: 'Smiles all around on graduation day.' },
  { src: '/images/memory-3.jpg', caption: 'Every late night, every sacrifice — worth it all.' },
  { src: '/images/memory-1.jpg', caption: 'Caps in the air — this moment is finally ours.' },
  { src: '/images/memory-7.jpg', caption: 'Cherished friends who made it all worthwhile.' },
  { src: '/images/video_2026-08-01_21-57-54.mp4', caption: 'Reliving the celebration, frame by frame.', type: 'video' },
  { src: '/images/memory-5.jpg', caption: 'Shining bright on the biggest day yet.' },
  { src: '/images/memory-9.jpg', caption: 'A moment of pure joy.' },
  { src: '/images/IMG_2471.MOV', caption: 'A day to remember, captured forever.', type: 'video' },
  { src: '/images/IMG_2485.MOV', caption: 'God is good.', type: 'video' },
]
