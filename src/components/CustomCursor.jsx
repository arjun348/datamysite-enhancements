import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    // Only enable custom cursor for fine pointers (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let animId;

    const onMouseMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    // Hover detection for buttons & interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.closest(
          "a, button, summary, input, textarea, .card, .case-tile, .service-item, .stat, .lgo"
        )
      ) {
        cursorRef.current?.classList.add("big");
      } else {
        cursorRef.current?.classList.remove("big");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    // Scroll progress handler
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) {
        setScrollWidth((y / h) * 100);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        id="progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${scrollWidth}%`,
          background: "linear-gradient(90deg, #0B4A3A, #E04B43)",
          zIndex: 9999,
          transformOrigin: "left",
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
}

