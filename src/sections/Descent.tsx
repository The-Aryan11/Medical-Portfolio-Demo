import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { tag: "The scan", scale: "10 cm", text: "Every operation begins as a shadow on a screen. I study it until I can walk through it with my eyes closed." },
  { tag: "The field", scale: "1 cm", text: "The window is the size of a coin. Inside it, a tumour hugs the artery that feeds half a brain. Millimetres decide everything." },
  { tag: "The cell", scale: "10 µm", text: "Beyond what hands can feel, a single neuron carries a word, a memory, a name. This is what I am protecting." },
];

export default function Descent() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".ds-l2", ".ds-l3", ".ds-c2", ".ds-c3"], { opacity: 0 });
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", scrub: 0.8, pin: true, anticipatePin: 1 } })
        .to(".ds-l1", { scale: 1.8, ease: "none", duration: 1.2 }, 0)
        .to(".ds-c1", { opacity: 0, y: -30, duration: 0.3 }, 0.8)
        .to(".ds-l1", { opacity: 0, duration: 0.35, ease: "none" }, 0.85)
        .fromTo(".ds-l2", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1.05, duration: 0.5, ease: "none" }, 0.85)
        .fromTo(".ds-c2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 1.15)
        .to(".ds-l2", { scale: 1.8, ease: "none", duration: 1 }, 1.35)
        .to(".ds-c2", { opacity: 0, y: -30, duration: 0.3 }, 2.0)
        .to(".ds-l2", { opacity: 0, duration: 0.35, ease: "none" }, 2.05)
        .fromTo(".ds-l3", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1.05, duration: 0.5, ease: "none" }, 2.05)
        .fromTo(".ds-c3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 2.35)
        .to(".ds-l3", { scale: 1.3, ease: "none", duration: 0.9 }, 2.5)
        .fromTo(".ds-bar", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 3.4 }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-(--color-canvas)">
      {["mri", "hands", "neurons"].map((n, i) => (
        <img key={n} src={`/img/${n}.jpg`} alt="" className={`ds-l${i + 1} absolute inset-0 h-full w-full object-cover`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-(--color-canvas) via-(--color-canvas)/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-canvas)/80 via-transparent to-(--color-canvas)/50" />

      <div className="absolute left-6 top-24 md:left-16">
        <p className="eyebrow">Chapter IV &mdash; The descent</p>
      </div>

      <div className="absolute right-6 top-1/2 hidden h-48 w-px -translate-y-1/2 bg-white/15 md:right-16 md:block">
        <div className="ds-bar h-full origin-top bg-(--color-accent)" />
      </div>

      <div className="absolute inset-x-6 bottom-12 md:inset-x-16 md:bottom-0 md:top-0 md:flex md:items-center">
        <div className="relative h-72 w-full md:h-96 md:max-w-xl">
          {SCENES.map((s, i) => (
            <div key={s.tag} className={`ds-c${i + 1} absolute inset-0 flex flex-col justify-end md:justify-center`}>
              <span className="display text-[clamp(4.5rem,13vw,11rem)] italic text-(--color-accent)">{s.scale}</span>
              <h3 className="display -mt-2 text-3xl md:text-5xl">{s.tag}</h3>
              <p className="mt-4 max-w-md text-(--color-muted) md:text-lg">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
