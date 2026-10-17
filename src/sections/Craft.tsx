import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { t: "Awake craniotomy", d: "Surgery with the patient conscious and speaking, so language and movement are protected in real time.", img: "theatre" },
  { t: "Gliomas & brain tumours", d: "Maximal safe resection guided by mapping, intra-operative imaging and a team that reviews every scan together.", img: "mri" },
  { t: "Skull-base surgery", d: "Reaching the deepest, tightest corridors of the head through the smallest possible opening.", img: "hands" },
  { t: "Epilepsy & functional surgery", d: "Finding the few cells that misfire, and quieting them without touching the thousands that don’t.", img: "neurons" },
  { t: "Complex neurovascular care", d: "Aneurysms and malformations, where the margin for error is measured in heartbeats.", img: "ward" },
];

export default function Craft() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cr-row").forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-6">Chapter VII &mdash; The craft</p>
        <h2 className="display mb-16 max-w-3xl text-[clamp(2.4rem,5.5vw,5.5rem)]">
          Five things I do, <span className="italic text-(--color-accent)">very carefully</span>.
        </h2>

        <div className="grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-7">
            {ITEMS.map((it, i) => (
              <li key={it.t} className="cr-row border-t border-white/10 last:border-b" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <button type="button" data-cursor="View" className="group flex w-full items-baseline gap-5 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)">
                  <span className="w-8 shrink-0 text-sm text-(--color-muted) tabular-nums">0{i + 1}</span>
                  <span className="flex-1">
                    <span className={`display block text-[clamp(1.7rem,3.4vw,3.2rem)] transition-all duration-500 ${active === i ? "translate-x-3 text-(--color-accent)" : "text-(--color-ink)/80"}`}>{it.t}</span>
                    <span className={`grid transition-all duration-500 ${active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 md:opacity-0"} max-md:grid-rows-[1fr] max-md:opacity-100`}>
                      <span className="overflow-hidden">
                        <span className="mt-3 block max-w-md pl-0 text-(--color-muted) md:pl-3">{it.d}</span>
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className={`h-6 w-6 shrink-0 transition-all duration-500 ${active === i ? "translate-x-0 text-(--color-accent) opacity-100" : "-translate-x-2 opacity-0"}`} />
                </button>
              </li>
            ))}
          </ul>

          <div className="relative hidden md:col-span-5 md:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm">
              {ITEMS.map((it, i) => (
                <img
                  key={it.img}
                  src={`/img/${it.img}.jpg`}
                  alt={it.t}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
