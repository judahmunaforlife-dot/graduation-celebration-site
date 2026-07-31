'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Plus, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/database.types'
import { SectionHeading } from './section-heading'

type Blessing = Database['public']['Tables']['blessings']['Row']

const MAX = 40

export function BlessingsWall() {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [value, setValue] = useState('')
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
      .from('blessings')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(100)
    if (error) {
      console.error('Failed to load blessings:', error.message)
      setStatus('error')
      return
    }
    setBlessings(data ?? [])
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
        .from('blessings')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100)
      if (cancelled) return
      if (error) {
        console.error('Failed to load blessings:', error.message)
        setStatus('error')
        return
      }
      setBlessings(data ?? [])
      setStatus('ready')
    }
    void loadOnce()
    return () => {
      cancelled = true
    }
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    const label = value.trim()
    if (!label || submitting || !supabase) return
    setSubmitting(true)
    const { data, error } = await supabase
      .from('blessings')
      .insert({ label })
      .select()
      .single()
    setSubmitting(false)
    if (error) {
      console.error('Failed to add blessing:', error.message)
      return
    }
    if (data) {
      setBlessings((prev) => [...prev, data])
      setLiked((prev) => ({ ...prev, [data.id]: true }))
      setValue('')
    }
  }

  const like = async (id: string) => {
    const isLiked = liked[id]
    setLiked((prev) => ({ ...prev, [id]: !isLiked }))
    setBlessings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, hearts: b.hearts + (isLiked ? -1 : 1) } : b,
      ),
    )
    if (!supabase) return
    const { error } = await supabase.rpc('increment_blessing_hearts', {
      row_id: id,
      delta: isLiked ? -1 : 1,
    })
    if (error) {
      console.error('Failed to update hearts:', error.message)
      setLiked((prev) => ({ ...prev, [id]: isLiked }))
      setBlessings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, hearts: b.hearts + (isLiked ? 1 : -1) } : b,
        ),
      )
    }
  }

  return (
    <section id="blessings" className="mx-auto max-w-5xl px-4 py-24">
      <div className="glass rounded-3xl border border-border p-6 sm:p-10">
        <SectionHeading
          icon={Sparkles}
          title="Blessings Wall"
          subtitle="What word or wish do you speak over the graduate's next chapter? Add it to the board."
        />

        <div className="mt-12 min-h-[64px]">
          {status === 'loading' && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading blessings...
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-muted-foreground">
                Couldn&apos;t load the blessings wall.
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

          {status === 'ready' && blessings.length === 0 && (
            <p className="text-center text-muted-foreground">
              No blessings yet — add the first one below!
            </p>
          )}

          {status === 'ready' && blessings.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <AnimatePresence initial={false}>
                {blessings.map((b) => (
                  <motion.button
                    key={b.id}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => void like(b.id)}
                    aria-pressed={!!liked[b.id]}
                    className={`glass flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition-colors ${
                      liked[b.id]
                        ? 'border-primary text-primary'
                        : 'border-border text-foreground hover:border-accent/50'
                    }`}
                  >
                    {b.label}
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          liked[b.id] ? 'fill-primary text-primary' : ''
                        }`}
                      />
                      {b.hearts}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <form
          onSubmit={add}
          className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX))}
            placeholder="e.g. Grace, Success, Favor, Joy..."
            required
            maxLength={MAX}
            className="w-full rounded-full border border-input bg-background/40 px-5 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            disabled={submitting || !value.trim()}
            className="bg-grad-primary flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {submitting ? 'Adding...' : 'Add Blessing'}
          </button>
        </form>
      </div>
    </section>
  )
}
