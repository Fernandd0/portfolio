import { useEffect, useRef, useState } from "react";
import styles from "../styles/cat.module.css";

export const Cat = () => {
  const [isVisible, setIsVisible] = useState(false);

  const catWrapperRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const legsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleFirstClick = () => {
      setIsVisible(true);
      document.removeEventListener("click", handleFirstClick);
      document.removeEventListener("touchstart", handleFirstClick);
    };

    document.addEventListener("click", handleFirstClick);
    document.addEventListener("touchstart", handleFirstClick);

    return () => {
      document.removeEventListener("click", handleFirstClick);
      document.removeEventListener("touchstart", handleFirstClick);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const catWrapper = catWrapperRef.current;
    const wrapper = wrapperRef.current;
    const cat = catRef.current;
    const head = headRef.current;
    const legs = legsRef.current;

    if (!catWrapper || !wrapper || !cat || !head || legs.length === 0) {
      return;
    }

    const pos = {
      x: 0,
      y: 0,
    };
    const walk = () => {
      cat.classList.remove(styles.first_pose);
      legs.forEach((leg) => {
        if (leg) leg.classList.add(styles.walk);
      });
    };

    const handleMouseMotion = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      walk();
    };

    const handleTouchMotion = (e: TouchEvent) => {
      if (!e.targetTouches) return;
      pos.x = e.targetTouches[0].clientX;
      pos.y = e.targetTouches[0].clientY;
      walk();
    };

    const turnRight = () => {
      cat.style.left = `${pos.x - 90}px`;
      cat.classList.remove(styles.face_left);
      cat.classList.add(styles.face_right);
    };

    const turnLeft = () => {
      cat.style.left = `${pos.x + 10}px`;
      cat.classList.remove(styles.face_right);
      cat.classList.add(styles.face_left);
    };

    const decideTurnDirection = () => {
      cat.getBoundingClientRect().x < pos.x ? turnRight() : turnLeft();
    };

    const headMotion = () => {
      pos.y > wrapper.clientHeight - 100
        ? (head.style.top = "-15px")
        : (head.style.top = "-30px");
    };

    const jump = () => {
      catWrapper.classList.remove(styles.jump);
      if (pos.y < wrapper.clientHeight - 250) {
        setTimeout(() => {
          catWrapper.classList.add(styles.jump);
        }, 100);
      }
    };

    const decideStop = () => {
      if (
        (cat.classList.contains(styles.face_right) &&
          pos.x - 90 === cat.offsetLeft) ||
        (cat.classList.contains(styles.face_left) &&
          pos.x + 10 === cat.offsetLeft)
      ) {
        legs.forEach((leg) => leg.classList.remove(styles.walk));
      }
    };

    const positionInterval = setInterval(() => {
      if (!pos.x || !pos.y) return;
      decideTurnDirection();
      headMotion();
      decideStop();
    }, 100);

    const jumpInterval = setInterval(() => {
      if (!pos.x || !pos.y) return;
      jump();
    }, 1000);

    document.addEventListener("mousemove", handleMouseMotion);
    document.addEventListener("touchmove", handleTouchMotion);

    return () => {
      clearInterval(positionInterval);
      clearInterval(jumpInterval);
      document.removeEventListener("mousemove", handleMouseMotion);
      document.removeEventListener("touchmove", handleTouchMotion);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.outer_wrapper}>
      <div className={styles.outer_wrapper_inner}>
        <div className={styles.wrapper} ref={wrapperRef}>
          <div className={styles.cat_wrapper} ref={catWrapperRef}>
            <div className={`${styles.cat} ${styles.first_pose}`} ref={catRef}>
              <div className={styles.cat_head} ref={headRef}>
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 76.4 61.2"
                >
                  <polygon
                    className={styles.eyes}
                    points="63.8,54.1 50.7,54.1 50.7,59.6 27.1,59.6 27.1,54.1 12.4,54.1 12.4,31.8 63.8,31.8 "
                  />
                  <path
                    d="M15.3,45.9h5.1V35.7h-5.1C15.3,35.7,15.3,45.9,15.3,45.9z M45.8,56.1V51H30.6v5.1H45.8z M61.1,35.7H56v10.2h5.1
                V35.7z M10.2,61.2v-5.1H5.1V51H0V25.5h5.1V15.3h5.1V5.1h5.1V0h5.1v5.1h5.1v5.1h5.1v5.1c0,0,15.2,0,15.2,0v-5.1h5.1V5.1H56V0h5.1v5.1
                h5.1v10.2h5.1v10.2h5.1l0,25.5h-5.1v5.1h-5.1v5.1H10.2z"
                  />
                </svg>
              </div>
              <div className={styles.body}>
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 91.7 40.8"
                >
                  <path
                    className={styles.st0}
                    d="M91.7,40.8H0V10.2h5.1V5.1h5.1V0h66.2v5.1h10.2v5.1h5.1L91.7,40.8z"
                  />
                </svg>

                <div className={styles.tail}>
                  <svg
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100%"
                    viewBox="0 0 25.5 61.1"
                  >
                    <polygon
                      className={styles.st0}
                      points="10.2,56 10.2,50.9 5.1,50.9 5.1,40.7 0,40.7 0,20.4 5.1,20.4 5.1,10.2 10.2,10.2 10.2,5.1 15.3,5.1 
                  15.3,0 25.5,0 25.5,10.2 20.4,10.2 20.4,15.3 15.3,15.3 15.3,20.4 10.2,20.4 10.2,40.7 15.3,40.7 15.3,45.8 20.4,45.8 20.4,50.9 
                  25.5,50.9 25.5,61.1 15.3,61.1 15.3,56 "
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.front_legs}>
                <div
                  className={`${styles.leg} ${styles.one}`}
                  ref={(el) => {
                    if (el) legsRef.current.push(el);
                  }}
                >
                  <svg
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100%"
                    viewBox="0 0 14 30.5"
                  >
                    <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                  </svg>
                </div>
                <div
                  className={`${styles.leg} ${styles.two}`}
                  ref={(el) => {
                    if (el) legsRef.current.push(el);
                  }}
                >
                  <svg
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100%"
                    viewBox="0 0 14 30.5"
                  >
                    <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                  </svg>
                </div>
              </div>

              <div className={styles.back_legs}>
                <div
                  className={`${styles.leg} ${styles.three}`}
                  ref={(el) => {
                    if (el) legsRef.current.push(el);
                  }}
                >
                  <svg
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100%"
                    viewBox="0 0 14 30.5"
                  >
                    <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                  </svg>
                </div>
                <div
                  className={`${styles.leg} ${styles.four}`}
                  ref={(el) => {
                    if (el) legsRef.current.push(el);
                  }}
                >
                  <svg
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100%"
                    viewBox="0 0 14 30.5"
                  >
                    <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ground}></div>
      </div>
    </div>
  );
};
