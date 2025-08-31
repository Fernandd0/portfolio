import { useLayoutEffect, useRef } from 'react'
import type { FC } from 'react'
import gsap from 'gsap'

export const SocialNetworks: FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const el = rootRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, scale: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from(el, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.out' })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className='icon-list' ref={rootRef}>
      <a href='https://www.linkedin.com/in/fernanddo-dev/' target='_blank' rel='noreferrer noopener'>
        <i className='nes-icon is-medium-custom linkedin' />
      </a>
      <a href='https://github.com/Fernandd0' target='_blank' rel='noreferrer noopener'>
        <i className='nes-icon is-medium-custom github' />
      </a>
      <a href='https://twitter.com/Fernandddd0' target='_blank' rel='noreferrer noopener'>
        <i className='nes-icon is-medium-custom twitter' />
      </a>
      <a href='mailto:fernando.sc.contacto@gmail.com' target='_blank' rel='noreferrer noopener'>
        <i className='nes-icon is-medium-custom gmail' />
      </a>
    </div>
  )
}