import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAPERS = [
  ["Speech preservation in awake resection of dominant-hemisphere gliomas", "Journal of Neurosurgical Practice", "2024"],
  ["A staged approach to giant sphenoid-wing meningiomas", "Skull Base Review", "2022"],
  ["Simulation-based training for microsurgical anastomosis", "Surgical Education Quarterly", "2021"],
  ["Outcomes after 1,000 consecutive cranial cases: a single-unit audit", "Neurosurgery Outcomes", "2020"],
];

export default function Teaching() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tc-img",
        { yPercent: -10 },
        { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>(".tc-row").forEach((el) => {
        const line = el.querySelector(".tc-line");
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut", immediateRender: false, scrollTrigger: { trigger: el, start: "top 88%" } });
        gsap.fromTo(el.querySelectorAll(".tc-txt"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, immediateRender: false, scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src="/img/teaching.jpg" alt="Dr. Mehra teaching residents around a brain scan" loading="lazy" className="tc-img absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <p className="eyebrow mb-6">Chapter VIII &mdash; Handing it on</p>
          <h2 className="display text-[clamp(2.2rem,4.8vw,4.8rem)]">
            A craft isn&rsquo;t finished until someone else can <span className="italic text-(--color-accent)">do it better</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-(--color-muted)">
            I run the institute&rsquo;s microsurgery lab, mentor every resident through their first awake case, and publish what we learn, including what went wrong.
          </p>
          <div className="mt-12">
            {PAPERS.map(([t, j, y]) => (
              <div key={t} className="tc-row relative py-6">
                <div className="tc-line absolute inset-x-0 top-0 h-px origin-left bg-white/15" />
                <div className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <p className="tc-txt display text-xl leading-snug md:text-2xl">{t}</p>
                    <p className="tc-txt mt-1 text-sm text-(--color-muted)">{j}</p>
                  </div>
                  <span className="tc-txt text-sm text-(--color-accent) tabular-nums">{y}</span>
                </div>
              </div>
            ))}
            <div className="h-px bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
