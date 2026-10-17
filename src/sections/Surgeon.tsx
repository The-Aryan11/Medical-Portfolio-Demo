import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  ["Role", "Director, Cranial & Skull-Base Surgery"],
  ["Training", "MCh Neurosurgery · Fellowship in awake & functional surgery"],
  ["Practice", "17 years · 2,400+ procedures"],
];

export default function Surgeon() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sg-frame",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: root.current, start: "top 75%", end: "top 15%", scrub: 1 } },
      );
      gsap.fromTo(
        ".sg-img",
        { scale: 1.35 },
        { scale: 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 30%", scrub: true } },
      );
      gsap.fromTo(
        ".sg-in",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, immediateRender: false, scrollTrigger: { trigger: root.current, start: "top 55%" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-24 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="sg-frame relative aspect-[3/4] overflow-hidden rounded-sm">
            <img src="/img/portrait.jpg" alt="Portrait of Dr. Arjun Mehra in surgical scrubs" className="sg-img absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <p className="sg-in eyebrow mb-6">Chapter II &mdash; The surgeon</p>
          <h2 className="sg-in display text-[clamp(2.4rem,5.5vw,5.5rem)]">
            Steady hands are <span className="italic text-(--color-accent)">built</span>, not born.
          </h2>
          <p className="sg-in mt-8 max-w-xl text-lg leading-relaxed text-(--color-muted)">
            For seventeen years I have worked at the border between a person and the part of them that makes them <em>them</em>: speech, memory, movement, humour. My job is to take away the disease and leave the person entirely intact.
          </p>
          <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {FACTS.map(([k, v]) => (
              <div key={k} className="sg-in grid grid-cols-[7rem_1fr] gap-4 py-4 text-sm md:text-base">
                <dt className="text-(--color-muted)">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
