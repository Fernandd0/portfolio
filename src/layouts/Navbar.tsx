import { useState, useEffect, useRef } from 'react'
import { RESUME_URL } from '../data/site'

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/stack', label: 'Stack' },
  { href: '/#contact', label: 'Contact' }
]

const normalize = (path: string) => path.replace(/\/+$/, '') || '/'

interface Props {
  currentPath?: string
}

export const Navbar = ({ currentPath = '/' }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const path = normalize(currentPath)

  useEffect(() => {
    if (!isMenuOpen) return
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKey)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="c_container c-header">
      <header className="header">
        <nav id="nav" className="nav" aria-label="Main">
          <div className="c-logo">
            <a href="/" className="logo" aria-current={path === '/' ? 'page' : undefined}>
              {'fernando'}
            </a>
          </div>
          <ul
            id="nav-list"
            className={`nav-list ${isMenuOpen ? 'show' : ''}`}
            // Mobile menu is fullscreen: tapping the empty area around the links closes it
            onClick={(e) => e.target === e.currentTarget && closeMenu()}
          >
            {LINKS.map(({ href, label }) => {
              const isActive = normalize(href) === path
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`nav-link px-btn ${isActive ? 'active is-invert' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
            <li>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link px-btn is-error"
                onClick={closeMenu}
              >
                Resume
              </a>
            </li>
          </ul>
          <button
            ref={toggleRef}
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-list"
          >
            <span className={`pixel-hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </nav>
      </header>
    </div>
  )
}
