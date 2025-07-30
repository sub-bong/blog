import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export default function SideBar() {
  const navRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({ paused: true });

      if (navRef.current && contentRef.current) {
        timelineRef.current
          .to(contentRef.current, {
            opacity: 0,
            duration: 0.2,
          })
          .to(listRef.current, {
            opacity: 0,
            duration: 0.2,
          })
          .to(navRef.current, {
            width: "40px",
            height: "40px",
          });
      }

      timelineRef.current.reversed(true);
    }, navRef);
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (timelineRef.current) {
      return timelineRef.current.reversed()
        ? timelineRef.current.play()
        : timelineRef.current.reverse();
    }
  };

  return (
    <section className="side-container" ref={navRef}>
      <div className="side-contents" ref={contentRef}>
        <div className="side-item">
          <img src="/img/meerkat_doing.jpg" title="something doing..." />
        </div>
        <div className="side-item">
          <h3>Sub Bong Lab</h3>
          <p>blogs that do something...</p>
        </div>
      </div>
      <ul className="side-contents">
        <div className="side-open-button">
          <i className="fa-solid fa-arrow-left" onClick={toggleMenu}></i>
        </div>
        <div ref={listRef}>
          <li>
            <Link to="/">전체보기</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </div>
      </ul>
    </section>
  );
}
