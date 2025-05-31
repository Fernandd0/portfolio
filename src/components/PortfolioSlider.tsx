import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import projectsData from "../data/projects.json";

gsap.registerPlugin(Draggable);

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  webUrl?: string;
};

const projects: Project[] = projectsData;

const CARD_WIDTH = 320;
const CARD_GAP = 24;
const TOTAL_CARD_WIDTH = CARD_WIDTH + CARD_GAP;
const MAX_INDEX = projects.length - 1;

export const PortfolioSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable | null>(null);
  const [current, setCurrent] = useState(0);

  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sliderRef.current) return;

    draggableInstance.current = Draggable.create(sliderRef.current, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -TOTAL_CARD_WIDTH * MAX_INDEX,
        maxX: 0,
      },
      edgeResistance: 0.85,
      snap: {
        x: (endValue: number) =>
          Math.round(endValue / TOTAL_CARD_WIDTH) * TOTAL_CARD_WIDTH,
      },
      onSnapComplete() {
        const idx = Math.round(-this.x / TOTAL_CARD_WIDTH);
        setCurrent(Math.min(MAX_INDEX, Math.max(0, idx)));
      },
    })[0];

    return () => {
      draggableInstance.current?.kill();
    };
  }, []);

  const onMouseEnter = (index: number) => {
    const overlay = overlaysRef.current[index];
    const cardImg = cardsRef.current[index]?.querySelector("img");
    if (!overlay || !cardImg) return;

    gsap.killTweensOf([overlay, cardImg]);

    gsap.to(cardImg, {
      scale: 1.03,
      duration: 0.6,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    });

    gsap.to(overlay, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: "auto",
    });
  };

  const onMouseLeave = (index: number) => {
    const overlay = overlaysRef.current[index];
    const cardImg = cardsRef.current[index]?.querySelector("img");
    if (!overlay || !cardImg) return;

    gsap.killTweensOf([overlay, cardImg]);

    gsap.to(cardImg, {
      scale: 1,
      duration: 0.5,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    });

    gsap.to(overlay, {
      autoAlpha: 0,
      y: 20,
      duration: 0.5,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: "none",
    });
  };

  const goToSlide = (index: number) => {
    const clamped = Math.min(MAX_INDEX, Math.max(0, index));
    setCurrent(clamped);
    gsap.to(sliderRef.current, {
      x: -clamped * TOTAL_CARD_WIDTH,
      duration: 0.5,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      onComplete() {
        draggableInstance.current?.update(true);
      },
    });
  };

  return (
    <div className="slider-wrapper" aria-label="Slider de proyectos">
      <div
        className="slider-track"
        ref={sliderRef}
        tabIndex={0}
        role="list"
        aria-live="polite"
      >
        {projects.map(
          ({ id, title, description, imageUrl, githubUrl, webUrl }, idx) => (
            <div
              key={id}
              className="slide-card nes-container is-rounded"
              tabIndex={-1}
              role="listitem"
              aria-label={`${title}: ${description}`}
              onMouseEnter={() => onMouseEnter(idx)}
              onMouseLeave={() => onMouseLeave(idx)}
              ref={(el) =>
                void (cardsRef.current[idx] = el as HTMLDivElement | null)
              }
            >
              <img
                className="slide-img"
                src={imageUrl}
                alt={title}
                loading="lazy"
              />
              <div className="slide-content">
                <h3 className="slide-title">{title}</h3>
                <p className="slide-desc">{description}</p>
              </div>

              <div
                className="slide-overlay"
                ref={(el) => void (overlaysRef.current[idx] = el)}
                aria-hidden="true"
              >
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="overlay-btns">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="overlay-btn"
                      aria-label={`Repositorio GitHub de ${title}`}
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.235 1.838 1.235 1.07 1.835 2.809 1.305 3.495.997.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.045.137 3.003.403 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.804 5.63-5.475 5.922.43.372.823 1.103.823 2.222v3.293c0 .321.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                  )}
                  {webUrl && (
                    <a
                      href={webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="overlay-btn"
                      aria-label={`Sitio web de ${title}`}
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.59 13.41a2 2 0 002.83 0l3.54-3.54a2 2 0 10-2.83-2.83l-1.12 1.12 1.41 1.41-2.12 2.12-1.41-1.41-1.12 1.12zm7.07-5.66l-3.54 3.54a4 4 0 01-5.66 0l-3.54-3.54a4 4 0 115.66-5.66l1.12 1.12a1 1 0 01-1.41 1.41l-1.12-1.12a2 2 0 10-2.83 2.83l3.54 3.54a2 2 0 002.83 0l1.12-1.12a1 1 0 011.41 1.41l-1.12 1.12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <nav className="dots-container">
        {projects.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${current === idx ? "active" : ""}`}
            aria-label={`Ir al slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </nav>
    </div>
  );
};
