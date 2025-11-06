import { useState, useEffect } from 'react'
import { icoBurger } from '../assets'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mood')
    } else {
      document.body.classList.remove('dark-mood')
    }
  }, [isDarkMode])

  return (
    <div className="c_container c-header">
      <header className="header">
        <nav id="nav" className="nav">
          <div className="c-logo">
            <li>
              <a href="/" className="logo">
                {'fernan-do'}
              </a>
            </li>
          </div>
          <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`}>
            <li>
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="/#projects" className="nav-link">
                Projects
              </a>
            </li>
            <li>
              <a href="/stack" className="nav-link">
                Stack
              </a>
            </li>
            <li>
              <a href="/#contact" className="nav-link">
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://docs.google.com/document/d/1W8yyTu2Z8-ZHUiU6m-7NzH1rN95tDm3g8G44wfBKCyc/edit?usp=sharing"
                target="_blank"
                className="nav-link"
              >
                CV
              </a>
            </li>
          </ul>
          <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img
              className="img-nav-toggle"
              src={icoBurger.src}
              alt="nav-toggle"
              width="40"
              height="40"
            />
          </button>
        </nav>
      </header>
    </div>
  )
}
