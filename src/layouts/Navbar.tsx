import { useState, useEffect } from "react";
import { icoMoon, icoSun, icoBurger } from "../assets";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mood");
    } else {
      document.body.classList.remove("dark-mood");
    }
  }, [isDarkMode]);

  return (
    <div className="c_container c-header">
      <header className="header">
        <nav id="nav" className="nav">
          <div className="c-logo">
            <li>
              <a href="/" className="logo">
                {"<efe/>"}
              </a>
            </li>
          </div>
          <ul className={`nav-list ${isMenuOpen ? "show" : ""}`}>
            <li>
              <a href="#about" className="nav-link">
                Sobre Mi
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link">
                Proyectos
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link">
                Habilidades
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contacto
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1l7sUyXSmp9Rwbj3QnpEMNFYoG3gwZiCe/view?usp=sharing"
                target="_blank"
                className="nav-link"
              >
                CV
              </a>
            </li>
          </ul>
          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
  );
};
