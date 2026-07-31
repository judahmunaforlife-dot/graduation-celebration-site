'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { MessageCircleHeart, Heart, Send, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'
import { SectionHeading } from './section-heading'

type Wish = Database['public']['Tables']['wishes']['Row']

const MAX = 500

export function MomentsWall() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [submitting, setSubmitting] = useState(false)

  const load = useCallback(async () => {
    setStatus('loading')
    if (!supabase) {
      console.error(
        'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      )
      setStatus('error')
      return
    }
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) {
      console.error('Failed to load wishes:', error.message)
      setStatus('error')
      return
    }
    setWishes(data ?? [])
    setStatus('ready')
  }, [])

  useEffect(() => {
    let cancelled = false
    const loadOnce = async () => {
      setStatus('loading')
      if (!supabase) {
        setStatus('error')
        return
      }
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      if (cancelled) return
      if (error) {
        console.error('Failed to load wishes:', error.message)
        setStatus('error')
        return
      }
      setWishes(data ?? [])
      setStatus('ready')
    }
    void loadOnce()
    return () => {
      cancelled = true
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = message.trim()
    if (!text || submitting || !supabase) return
    setSubmitting(true)
    const { data, error } = await supabase
      .from('wishes')
      .insert({ name: name.trim() || 'A well-wisher', message: text })
      .select()
      .single()
    setSubmitting(false)
    if (error) {
      console.error('Failed to share moment:', error.message)
      return
    }
    setWishes((prev) => (data ? [data, ...prev] : prev))
    setName('')
    setMessage('')
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#e857a4', '#f5b642', '#ffffff'],
    })
  }

  const like = async (id: string) => {
    const isLiked = liked[id]
    setLiked((prev) => ({ ...prev, [id]: !isLiked }))
    setWishes((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, hearts: w.hearts + (isLiked ? -1 : 1) } : w,
      ),
    )
    if (!supabase) return
    const { error } = await supabase.rpc('increment_wish_hearts', {
      row_id: id,
      delta: isLiked ? -1 : 1,
    })
    if (error) {
      console.error('Failed to update hearts:', error.message)
      setLiked((prev) => ({ ...prev, [id]: isLiked }))
      setWishes((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, hearts: w.hearts + (isLiked ? 1 : -1) } : w,
        ),
      )
    }
  }

  return (
    <section id="moments" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        icon={MessageCircleHeart}
        title="Moments Wall"
        subtitle="Leave a heartfelt note for the graduate. Share a memory, a laugh, or a word of pride."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass h-fit rounded-3xl border border-border p-6 sm:p-8"
        >
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Your Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 60))}
            placeholder="Enter your name"
            className="mb-5 w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">
              Your Message
            </label>
            <span className="font-mono text-xs text-muted-foreground">
              {message.length}/{MAX}
            </span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
            placeholder="Write a message for the graduate..."
            rows={5}
            required
            maxLength={MAX}
            className="mb-6 w-full resize-none rounded-xl border border-input bg-background/40 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            disabled={submitting || !message.trim()}
            className="bg-grad-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            {submitting ? 'Sharing...' : 'Share Moment'}
          </button>
        </motion.form>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Celebration Feed
            </span>
            <span className="glass rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
              {status === 'ready' ? `${wishes.length} moments` : '\u00a0'}
            </span>
          </div>

          {status === 'loading' && (
            <div className="glass flex items-center justify-center gap-2 rounded-2xl border border-border p-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading moments...
            </div>
          )}

          {status === 'error' && (
            <div className="glass flex flex-col items-center gap-3 rounded-2xl border border-border p-10 text-center">
              <p className="text-muted-foreground">
                We couldn&apos;t load the moments wall. Check your Supabase
                setup and try again.
              </p>
              <button
                type="button"
                onClick={() => void load()}
                className="bg-grad-primary rounded-full px-5 py-2 text-sm font-bold text-primary-foreground"
              >
                Retry
              </button>
            </div>
          )}

          {status === 'ready' && wishes.length === 0 && (
            <div className="glass rounded-2xl border border-border p-10 text-center text-muted-foreground">
              No moments yet — be the first to share one!
            </div>
          )}

          {status === 'ready' && wishes.length > 0 && (
            <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
              <AnimatePresence initial={false}>
                {wishes.map((w) => (
                  <motion.article
                    key={w.id}
                    layout
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="glass rounded-2xl border border-border p-5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-bold text-foreground">
                        {w.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {new Date(w.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-pretty leading-relaxed text-foreground/85">
                      {w.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => void like(w.id)}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      aria-pressed={!!liked[w.id]}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          liked[w.id] ? 'fill-primary text-primary' : ''
                        }`}
                      />
                      {w.hearts}
                    </button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
