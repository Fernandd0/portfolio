import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import './SkillsGallery.css'
import skillsData from '../../../data/stack.json'

gsap.registerPlugin(InertiaPlugin)

export default function SkillsGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const oldPos = useRef({ x: 0, y: 0 })
  const delta = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      delta.current.x = e.clientX - oldPos.current.x
      delta.current.y = e.clientY - oldPos.current.y
      oldPos.current.x = e.clientX
      oldPos.current.y = e.clientY
    }

    container.addEventListener('mousemove', handleMouseMove)

    const mediaElements = container.querySelectorAll('.media')
    const cleanups: (() => void)[] = []

    mediaElements.forEach((el) => {
      const img = el.querySelector('img')
      if (!img) return

      const wobble = (vx: number, vy: number) => {
        const tl = gsap.timeline({ onComplete: () => { tl.kill() } })
        tl.timeScale(1.2)
        tl.to(img, {
          inertia: {
            x: { velocity: vx, end: 0 },
            y: { velocity: vy, end: 0 }
          }
        })
        tl.fromTo(
          img,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
          },
          '<'
        )
      }

      const handleEnter = () => wobble(delta.current.x * 70, delta.current.y * 70)
      // Touch has no hover or mouse delta: give the icon a random flick on tap
      const handleTap = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') return
        const flick = () => (Math.random() - 0.5) * 1500
        wobble(flick(), flick())
      }

      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('pointerdown', handleTap)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('pointerdown', handleTap)
      })
    })

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div className="icon_skill_div" ref={containerRef}>
      <div className="medias">
        {skillsData.map((skill, i) => (
          <div key={i} className="media skill-container">
            <div className="skill-tooltip">
              <p>{skill.name}</p>
            </div>
            <img
              src={`/skills/${skill.id}.svg`}
              alt={skill.name}
              width={48}
              height={48}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
