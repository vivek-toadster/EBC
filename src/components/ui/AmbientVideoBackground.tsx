import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const backgroundVideo = '/images/ebc-background-animated.mp4'

export default function AmbientVideoBackground() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    void videoRef.current?.play().catch(() => undefined)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-charcoal">
      <video
            ref={videoRef}
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={event => {
              event.currentTarget.playbackRate = 0.75
            }}
            onCanPlay={event => {
              if (!reduce) void event.currentTarget.play().catch(() => undefined)
            }}
            className="ambient-video absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'brightness(0.56)' }}
      />
      <div className="absolute inset-0 bg-charcoal/25" />
    </div>
  )
}
