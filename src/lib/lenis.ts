import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView();
}

export function scrollTop() {
  if (instance) instance.scrollTo(0, { duration: 2.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo(0, 0);
}

export function initLenis() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  instance = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    instance = null;
  };
}

export { gsap, ScrollTrigger };
