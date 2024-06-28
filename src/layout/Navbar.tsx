import { useEffect, useState } from "react";
import { Container } from "../components/ui/Container";
import { NavLinks } from "../components/NavLinks";
import { Link } from "react-router-dom";
import styles from "./styles/toggle.module.css";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    const forceBlur = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickInside = hamburger?.contains(target);
      if (!isClickInside) {
        hamburger?.focus();
      }
    };

    window.addEventListener("mousedown", forceBlur);

    return () => {
      window.removeEventListener("mousedown", forceBlur);
    };
  }, []);

  const handleOnBlur = () => {
    setIsOpened(false);
    setToggleActive(false);
  };

  const handleOnClick = () => {
    setToggleActive(!toggleActive);
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-[999] top-0 left-0 transition-all duration-300 ${
        scrolled ? "bg-white" : "bg-white"
      } lg:overflow-visible`}
    >
      <Container>
        <nav className="relative flex items-center justify-between text-black border-4 border-black mt-4 h-auto shadow-default">
          <Link to={"/"} id="1">
            <span className="font-retro text-[16px] hover:bg-black hover:text-white py-2 px-4 flex justify-center items-ceter border-r-4 border-black">
              {">_"}
              <img src="" />
            </span>
          </Link>
          <NavLinks />
          <div className="flex md:hidden mr-4">
            <button
              onBlur={() => setTimeout(handleOnBlur, 100)}
              onClick={handleOnClick}
              className={`${styles.toggle} ${
                toggleActive ? styles.active : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div
              className={`${
                isOpened ? "h-fit w-full" : "h-0"
              } absolute right-0 -bottom-4 lg:hidden translate-y-[100%] bg-white overflow-hidden transition-all duration-100`}
            >
              <div className="relative w-full px-8">
                <div className="absolute top-0 left-0 w-1 h-1 bg-transparent z-[99]"></div>
                <div className="absolute top-0 right-0 w-1 h-1 bg-transparent z-[99]"></div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-transparent z-[99]"></div>
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-transparent z-[99]"></div>

                <div className="absolute top-0 left-1 right-1 border-t-4 border-secondary z-[99]"></div>
                <div className="absolute bottom-0 left-1 right-1 border-b-4 border-secondary z-[99]"></div>
                <div className="absolute left-0 top-1 bottom-1 border-l-4 border-secondary z-[99]"></div>
                <div className="absolute right-0 top-1 bottom-1 border-r-4 border-secondary z-[99]"></div>
                <NavLinks isMovil />
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
