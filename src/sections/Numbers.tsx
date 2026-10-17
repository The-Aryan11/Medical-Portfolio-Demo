import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: 2400, suffix: "+", label: "Brain & skull-base procedures" },
  { n: 17, suffix: "", label: "Years at the operating table" },
  { n: 86, suffix: "", label: "Peer-reviewed publications" },
  { n: 140, suffix: "", label: "Surgeons trained" },
];

export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".num").forEach((el, i) => {
        const target = STATS[i].n;
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(o, {
              v: target,
              duration: 2.4,
              ease: "power3.out",
              onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-US")),
            });
          },
        });
        el.textContent = "0";
      });
      gsap.fromTo(
        ".num-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "power3.inOut", stagger: 0.15, immediateRender: false, scrollTrigger: { trigger: root.current, start: "top 75%" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-28 md:px-16 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-12">Chapter VI &mdash; By the numbers</p>
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="num-rule mb-6 h-px origin-left bg-(--color-accent)" />
              <div className="display text-[clamp(4rem,8vw,7.5rem)]">
                <span className="num tabular-nums">{s.n.toLocaleString("en-US")}</span>
                <span className="text-(--color-accent)">{s.suffix}</span>
              </div>
              <p className="mt-3 max-w-[14rem] text-(--color-muted)">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
