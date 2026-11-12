
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenis;
let rafCallback;

export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  destroySmoothScroll();

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  rafCallback = (time) => lenis?.raf(time * 1000);

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);
}

export function destroySmoothScroll() {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
  }

  lenis?.destroy();

  lenis = null;
  rafCallback = null;
}
