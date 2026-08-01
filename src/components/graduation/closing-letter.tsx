'use client'

import { motion } from 'framer-motion'
import { Heart, GraduationCap } from 'lucide-react'
import { graduate } from '@/lib/celebration-data'
import { ShareCardButton } from './share-card-button'

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .11 5.35.11 11.93c0 2.1.55 4.14 1.6 5.94L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.18-1.24-6.16-3.45-8.4ZM12.04 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.38a9.83 9.83 0 0 1-1.52-5.24c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.9a9.8 9.8 0 0 1 2.89 6.96c0 5.43-4.4 9.86-9.82 9.86Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.98 8.98 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35Z" />
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
    const encoded = encodeURIComponent(full)
    openApp(`whatsapp://send?text=${encoded}`, `https://wa.me/?text=${encoded}`)
  }

  const openApp = (appUrl: string, webUrl: string) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    window.open(isMobile ? appUrl : webUrl, '_blank', 'noopener,noreferrer')
  }

  const shareTelegram = () => {
    const { text, url } = buildText()
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)
    openApp(
      `tg://msg_url?url=${encodedUrl}&text=${encodedText}`,
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    )
  }

  // Instagram & Snapchat have no web share intent — use the native share
  // sheet when available, otherwise copy the message to the clipboard.
  const shareNativeOrCopy = async (appUrl: string, webUrl: string) => {
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
    openApp(appUrl, webUrl)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
          Final Message
        </h2>
        <div className="mx-auto my-6 h-px w-24 bg-border" />
        <p className="text-pretty text-base italic leading-relaxed text-foreground/90 sm:text-lg">
          This journey wasn&apos;t just about earning a degree. It was about becoming
          resilient, embracing failure, celebrating growth, and discovering that
          with persistence and faith, impossible things become possible. Here&apos;s
          to the next chapter.
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
        <ShareCardButton />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={share}
            aria-label="Share on WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => shareNativeOrCopy('instagram://camera', 'https://www.instagram.com/')}
            aria-label="Share on Instagram"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E1306C] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <IgIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => shareNativeOrCopy('snapchat://', 'https://www.snapchat.com/')}
            aria-label="Share on Snapchat"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFFC00] text-black shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <SnapIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={shareTelegram}
            aria-label="Share on Telegram"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
        <p className="mt-4 text-sm">
          <a
            href="https://wa.me/2348037529210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            muna.him
          </a>
        </p>
      </footer>
    </section>
  )
}
