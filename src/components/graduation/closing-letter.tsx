'use client'

import { motion } from 'framer-motion'
import { Heart, Share2, GraduationCap } from 'lucide-react'
import { graduate } from '@/lib/celebration-data'

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
    </svg>
  )
}

function SnapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.02 2c1.86.01 3.66.9 4.55 2.79.4.85.36 1.9.33 2.86-.01.29-.03.7-.03 1.02.14.08.36.14.64.14.4-.02.86-.24 1.13-.24.36 0 .71.13.82.5.13.44-.2.78-.6.97-.24.11-.62.2-.9.31-.34.14-.5.34-.42.72.02.1.06.2.11.3.02.03.9 1.94 2.77 2.25.24.04.41.25.4.49-.02.4-.63.72-2.05.94-.05.08-.1.4-.17.66-.06.2-.2.35-.47.35-.32 0-.7-.15-1.42-.15-.9 0-1.24.2-1.96.7-.75.53-1.5 1.06-2.75 1.06s-1.98-.52-2.72-1.05c-.72-.51-1.07-.7-1.98-.7-.7 0-1.11.15-1.42.15-.32 0-.42-.2-.47-.36-.08-.26-.12-.57-.17-.65-1.42-.22-2.03-.55-2.05-.94-.01-.24.16-.45.4-.49 1.87-.31 2.75-2.22 2.77-2.25.05-.1.09-.2.11-.3.08-.38-.08-.58-.42-.72-.28-.11-.66-.2-.9-.31-.53-.25-.7-.6-.6-.98.09-.35.42-.49.8-.49.22 0 .68.24 1.14.24.3 0 .5-.06.64-.14 0-.32-.02-.73-.03-1.02-.03-.96-.07-2 .33-2.86C8.35 2.9 10.16 2.01 12.02 2Z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.94 4.3 18.9 19.06c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.33-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19l-10.76 6.78-4.63-1.45c-1.01-.32-1.03-1.01.21-1.5l18.1-6.98c.84-.31 1.57.2 1.3 1.46Z" />
    </svg>
  )
}

export function ClosingLetter() {
  const buildText = () => {
    const text = `Celebrating ${graduate.fullName} on graduating — ${graduate.degree}! Leave a moment and a blessing 🎓`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    return { text, url, full: `${text} ${url}` }
  }

  const share = () => {
    const { full } = buildText()
    window.open(
      `https://wa.me/?text=${encodeURIComponent(full)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const shareTelegram = () => {
    const { text, url } = buildText()
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  // Instagram & Snapchat have no web share intent — use the native share
  // sheet when available, otherwise copy the message to the clipboard.
  const shareNativeOrCopy = async (fallbackUrl: string) => {
    const { text, url, full } = buildText()
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Graduation Celebration', text, url })
        return
      } catch {
        // user dismissed or unsupported — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(full)
    } catch {
      // clipboard blocked — nothing else to do
    }
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="glass relative overflow-hidden rounded-3xl border border-primary/40 p-8 text-center sm:p-12"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-grad-primary"
        />
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-gradient sm:text-3xl">
          A Special Message For You
        </h2>
        <div className="mx-auto my-6 h-px w-24 bg-border" />
        <p className="text-pretty text-base italic leading-relaxed text-foreground/90 sm:text-lg">
          This little site was made to honour everything you have worked for.
          May this new chapter bring you closer to your dreams, surround you
          with genuine love, and fill your heart with peace and purpose.
          Congratulations, graduate — you are deeply celebrated.
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">
          Closing Letter
        </p>
        <p className="mt-1 font-bold text-foreground">
          With love, from all of us 💛
        </p>
      </motion.div>

      {/* Share */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="mt-14 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Spread the joy
        </p>
        <p className="mb-6 mt-1 text-lg font-semibold text-foreground">
          Invite others to celebrate this special day!
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={share}
            aria-label="Share on WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-[#25D366]"
          >
            <Share2 className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => shareNativeOrCopy('https://www.instagram.com/')}
            aria-label="Share on Instagram"
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-[#E1306C]"
          >
            <IgIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => shareNativeOrCopy('https://www.snapchat.com/')}
            aria-label="Share on Snapchat"
            className="flex h-12 w-12 items-center justify-center rounded-full text-black shadow-lg transition-transform hover:scale-110 active:scale-95 bg-[#FFFC00]"
          >
            <SnapIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={shareTelegram}
            aria-label="Share on Telegram"
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-[#229ED9]"
          >
            <TelegramIcon className="h-6 w-6" />
          </button>
        </div>
      </motion.div>

      <footer className="mt-24 border-t border-border pt-10 text-center">
        <p className="flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-accent" />
          {graduate.fullName} • {graduate.date}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Celebrating a beautiful milestone, today and always.
        </p>
      </footer>
    </section>
  )
}
