import { useRef, useEffect } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

const images = [
  "https://skillicons.dev/icons?i=ts",
  "https://skillicons.dev/icons?i=js",
  "https://skillicons.dev/icons?i=react",
  "https://skillicons.dev/icons?i=vue",
  "https://skillicons.dev/icons?i=astro",
  "https://skillicons.dev/icons?i=html",
  "https://skillicons.dev/icons?i=css",
  "https://skillicons.dev/icons?i=tailwind",
  "https://skillicons.dev/icons?i=nodejs",
  "https://skillicons.dev/icons?i=laravel",
  "https://skillicons.dev/icons?i=php",
  "https://skillicons.dev/icons?i=java",
  "https://skillicons.dev/icons?i=mysql",
  "https://skillicons.dev/icons?i=postgres",
  "https://skillicons.dev/icons?i=git",
];

export default function SkillsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const oldPos = useRef({ x: 0, y: 0 });
  const delta = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      delta.current.x = e.clientX - oldPos.current.x;
      delta.current.y = e.clientY - oldPos.current.y;
      oldPos.current.x = e.clientX;
      oldPos.current.y = e.clientY;
    };

    container.addEventListener("mousemove", handleMouseMove);

    const mediaElements = container.querySelectorAll(".media");
    const cleanups: (() => void)[] = [];

    mediaElements.forEach((el) => {
      const img = el.querySelector("img");
      if (!img) return;

      const handleEnter = () => {
        const tl = gsap.timeline({ onComplete: () => tl.kill() });
        tl.timeScale(1.2);
        tl.to(img, {
          inertia: {
            x: { velocity: delta.current.x * 70, end: 0 },
            y: { velocity: delta.current.y * 70, end: 0 },
          },
        });
        tl.fromTo(
          img,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      };

      el.addEventListener("mouseenter", handleEnter);
      cleanups.push(() => el.removeEventListener("mouseenter", handleEnter));
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icon_skill_div" ref={containerRef}>
      <div className="medias">
        {images.map((src, i) => (
          <div key={i} className="media">
            <img src={src} alt={`Skill ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
