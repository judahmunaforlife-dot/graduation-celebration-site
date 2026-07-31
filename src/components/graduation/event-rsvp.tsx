'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, MapPin, Send, Users } from 'lucide-react'
import { celebrationEvent } from '@/lib/celebration-data'
import { supabase } from '@/lib/supabase/client'
import { SectionHeading } from './section-heading'

type Countdown = { days: number; hours: number; minutes: number; seconds: number }

function getCountdown(): Countdown {
  const remaining = Math.max(0, new Date(celebrationEvent.date).getTime() - Date.now())
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  }
}

export function EventRsvp() {
  const [countdown, setCountdown] = useState<Countdown | null>(null)
  const [attending, setAttending] = useState(true)
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [attendeeCount, setAttendeeCount] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setCountdown(getCountdown())
    tick()
    const interval = window.setInterval(tick, 1_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const client = supabase
    if (!client) return
    const loadCount = async () => {
      const { count } = await client
        .from('rsvps')
        .select('id', { count: 'exact', head: true })
        .eq('attending', true)
      setAttendeeCount(count ?? 0)
    }
    void loadCount()
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!supabase || !name.trim() || status === 'submitting') return
    setStatus('submitting')
    const { error } = await supabase.from('rsvps').insert({
      name: name.trim(),
      attending,
      guests: attending ? Number(guests) : 0,
    })
    if (error) {
      setStatus('error')
      return
    }
    setStatus('success')
    if (attending) setAttendeeCount((count) => (count ?? 0) + 1)
  }

  const date = new Date(celebrationEvent.date)
  const units = countdown
    ? [
        ['Days', countdown.days],
        ['Hours', countdown.hours],
        ['Minutes', countdown.minutes],
        ['Seconds', countdown.seconds],
      ]
    : []

  return (
    <section id="event" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        icon={CalendarDays}
        title="Celebrate With Us"
        subtitle="Save the date, bring your brightest smile, and be part of this beautiful milestone."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl border border-accent/30 p-6 sm:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Save the date</p>
          <h3 className="mt-3 text-3xl font-extrabold text-foreground">{celebrationEvent.title}</h3>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {units.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-background/30 p-4 text-center">
                <p className="text-3xl font-extrabold text-accent">{String(value).padStart(2, '0')}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-3"><Clock3 className="h-5 w-5 shrink-0 text-accent" />{date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</p>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0 text-accent" />{celebrationEvent.venue}, {celebrationEvent.location}</p>
            {attendeeCount !== null && <p className="flex items-center gap-3"><Users className="h-5 w-5 shrink-0 text-primary" />{attendeeCount} guests have already said yes.</p>}
          </div>
        </div>

        <form onSubmit={submit} className="glass rounded-3xl border border-border p-6 sm:p-8">
          <h3 className="text-xl font-extrabold text-foreground">Will you be there?</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[true, false].map((value) => (
              <button key={String(value)} type="button" onClick={() => setAttending(value)} aria-pressed={attending === value} className={`min-h-12 rounded-xl border px-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${attending === value ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground'}`}>
                {value ? 'Absolutely!' : 'Can’t make it'}
              </button>
            ))}
          </div>
          <label className="mt-5 block text-sm font-semibold text-foreground" htmlFor="rsvp-name">Your name</label>
          <input id="rsvp-name" value={name} onChange={(event) => setName(event.target.value.slice(0, 60))} required maxLength={60} placeholder="Enter your name" className="mt-2 w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary" />
          {attending && <><label className="mt-5 block text-sm font-semibold text-foreground" htmlFor="rsvp-guests">Guests, including you</label><select id="rsvp-guests" value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-foreground outline-none focus:border-primary">{[1, 2, 3, 4, 5, 6].map((value) => <option key={value} value={value}>{value}</option>)}</select></>}
          <button type="submit" disabled={status === 'submitting' || !name.trim()} className="bg-grad-primary mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30 disabled:cursor-wait disabled:opacity-60">
            <Send className="h-4 w-4" />{status === 'submitting' ? 'Sending RSVP...' : 'Send RSVP'}
          </button>
          {status === 'success' && <p className="mt-4 text-center text-sm font-semibold text-accent">Thank you — your RSVP is in!</p>}
          {status === 'error' && <p className="mt-4 text-center text-sm text-destructive">We couldn’t save that RSVP. Confirm the Supabase schema is up to date and try again.</p>}
          {!supabase && <p className="mt-4 text-center text-sm text-muted-foreground">RSVP opens once Supabase is configured.</p>}
        </form>
      </div>
    </section>
  )
}
