import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import projectsData from "../../data/projects.json";
import type { Project } from "../../types/Project";
import {
  loading,
  projectEiich,
  projectEiichEmpresas,
  projectNerd,
  icoGithub,
  icoWeb,
} from "../../assets";

gsap.registerPlugin(Draggable);

const imageMap: Record<string, string> = {
  loading: loading.src || "",
  projectEiich: projectEiich.src || "",
  projectEiichEmpresas: projectEiichEmpresas.src || "",
  projectNerd: projectNerd.src || "",
};

const projects: Project[] = projectsData
  .map((project) => ({
    ...project,
    imageUrl: project.imageUrl ? imageMap[project.imageUrl] || "" : "",
  }))
  .reverse();

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
              </div>

              <div
                className="slide-overlay"
                ref={(el) => void (overlaysRef.current[idx] = el)}
                aria-hidden="true"
              >
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
                      <img
                        src={icoGithub.src}
                        alt="GitHub"
                        width="24"
                        height="24"
                      />
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
                      <img src={icoWeb.src} alt="Web" width="24" height="24" />
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
