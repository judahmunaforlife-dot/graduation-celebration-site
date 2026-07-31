'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { graduate, portrait } from '@/lib/celebration-data'
import { wrapText } from '@/lib/canvas-text'

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.width, height / image.height)
  const sourceWidth = width / scale
  const sourceHeight = height / scale
  const sourceX = (image.width - sourceWidth) / 2
  const sourceY = Math.max(0, (image.height - sourceHeight) * 0.28)
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
}

export function ShareCardButton() {
  const [generating, setGenerating] = useState(false)

  const createCard = async () => {
    setGenerating(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1350
      const context = canvas.getContext('2d')
      if (!context) return

      const gradient = context.createLinearGradient(0, 0, 1080, 1350)
      gradient.addColorStop(0, '#2a0f2e')
      gradient.addColorStop(0.55, '#61164c')
      gradient.addColorStop(1, '#1f102f')
      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      const photo = await loadImage(portrait.src)
      context.save()
      context.globalAlpha = 0.82
      drawCover(context, photo, 500, 0, 580, 1350)
      const fade = context.createLinearGradient(420, 0, 980, 0)
      fade.addColorStop(0, '#2a0f2e')
      fade.addColorStop(0.7, 'rgba(42, 15, 46, 0)')
      context.fillStyle = fade
      context.fillRect(420, 0, 660, 1350)
      context.restore()

      context.fillStyle = '#f5b642'
      context.font = '700 34px Arial, sans-serif'
      context.fillText(graduate.date.toUpperCase(), 76, 130)
      context.fillStyle = '#ffffff'
      context.font = '700 82px Arial, sans-serif'
      let y = 265
      for (const line of wrapText(context, `Congratulations, ${graduate.fullName}`, 560)) {
        context.fillText(line, 76, y)
        y += 98
      }
      context.fillStyle = '#f8d899'
      context.font = 'italic 38px Georgia, serif'
      for (const line of wrapText(context, graduate.degree, 500)) {
        context.fillText(line, 76, y + 30)
        y += 48
      }
      context.fillStyle = 'rgba(255,255,255,0.78)'
      context.font = '400 28px Arial, sans-serif'
      context.fillText('A moment worth celebrating.', 76, 1190)
      context.fillStyle = '#f5b642'
      context.fillRect(76, 1235, 210, 5)
      context.fillStyle = '#ffffff'
      context.font = '600 24px Arial, sans-serif'
      context.fillText('GRADUATION CELEBRATION', 76, 1290)

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${graduate.firstName.toLowerCase()}-graduation-share-card.png`
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 0)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void createCard()}
      disabled={generating}
      className="glass inline-flex min-h-12 items-center gap-2 rounded-full border border-accent/40 px-5 py-3 text-sm font-bold text-foreground transition-transform hover:scale-105 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 text-accent" />}
      {generating ? 'Creating card...' : 'Download share card'}
    </button>
  )
}
