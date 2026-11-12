import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const cursorRef = useRef(null);
  const pointerRef = useRef(null);
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollWidth(h > 0 ? (y / h) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const pointer = pointerRef.current;
    const turbulence = turbulenceRef.current;
    const displacement = displacementRef.current;
    const hasFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !pointer || !turbulence || !displacement || !hasFinePointer.matches || prefersReducedMotion.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = null;
    let pointerIsInside = false;
    let hasMoved = false;
    let lastFilterUpdate = 0;

    const render = (time) => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      const position = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      cursor.style.transform = position;
      pointer.style.transform = position;

      if (time - lastFilterUpdate >= 32) {
        const phase = time * 0.001;
        turbulence.setAttribute(
          "baseFrequency",
          `${0.022 + Math.sin(phase) * 0.006} ${0.03 + Math.cos(phase * 0.83) * 0.007}`,
        );
        displacement.setAttribute("scale", `${14 + Math.sin(phase * 0.7) * 3}`);
        lastFilterUpdate = time;
      }

      const isCursorMoving = Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1;
      if (pointerIsInside || isCursorMoving) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = null;
      }
    };

    const onPointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      pointerIsInside = true;
      cursor.style.opacity = "1";
      pointer.style.opacity = "1";

      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
        const position = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        cursor.style.transform = position;
        pointer.style.transform = position;
      }

      const target = event.target instanceof Element ? event.target : null;
      pointer.classList.toggle(
        "big",
        Boolean(target?.closest("a, button, summary, input, textarea, .card, .case-tile, .service-item, .stat, .lgo")),
      );

      if (animationFrame === null) animationFrame = window.requestAnimationFrame(render);
    };

    const onPointerOut = (event) => {
      if (event.relatedTarget === null) {
        pointerIsInside = false;
        cursor.style.opacity = "0";
        pointer.style.opacity = "0";
        pointer.classList.remove("big");
        if (animationFrame === null) animationFrame = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <svg className="fluid-filter-defs" aria-hidden="true" focusable="false">
        <filter id="fluid-displacement" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.022 0.03"
            numOctaves="2"
            seed="3"
            result="fluid-noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="fluid-noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="fluid-cursor-goo" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="soft-shape" />
          <feColorMatrix
            in="soft-shape"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            result="liquid-shape"
          />
          <feComposite in="SourceGraphic" in2="liquid-shape" operator="atop" />
        </filter>
      </svg>
      <div className="fluid-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="fluid-pointer" ref={pointerRef} aria-hidden="true">
        <span className="fluid-cursor-dot">
          <span className="fluid-cursor-blob" />
        </span>
      </div>
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
    </>
  );
}
