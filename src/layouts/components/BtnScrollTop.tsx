import { useEffect, useState } from "react";

export const BtnScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-c ${isVisible ? "visible" : ""}`}
      id="scroll-up"
      onClick={scrollToTop}
    >
      <button type="button" className="nes-btn is- scroll">
        <span>&lt;</span>
      </button>
    </div>
  );
};
