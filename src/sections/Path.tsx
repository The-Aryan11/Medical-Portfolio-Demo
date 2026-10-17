import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STOPS = [
  { year: "2008", title: "MBBS", place: "Northfield Medical School", text: "Gold medal in anatomy. The first time I held a human brain, I did not put it down for an hour." },
  { year: "2012", title: "MCh Neurosurgery", place: "St. Aldric Institute of Neurosciences", text: "Ninety-hour weeks taught me the hardest skill in surgery: how to be completely still." },
  { year: "2016", title: "Fellowship, Awake & Functional Surgery", place: "Lakeshore University Hospital", text: "I learned to operate while the patient speaks, and to let their voice guide my hands." },
  { year: "2019", title: "Consultant Neurosurgeon", place: "Meridian Institute of Neurosciences", text: "My first independent resection of a six-centimetre skull-base meningioma. Eleven hours, one very long exhale." },
  { year: "2023", title: "Director, Cranial & Skull-Base", place: "Meridian Institute of Neurosciences", text: "Built a unit where no hard case is ever decided by one mind alone." },
];

export default function Path() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
        })
        .to(t, { x: () => -dist(), ease: "none" }, 0)
        .fromTo(".path-line", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    });
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".path-card").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative md:h-screen md:overflow-hidden">
      <div ref={track} className="flex flex-col gap-16 px-6 py-24 md:h-full md:w-max md:flex-row md:items-center md:gap-0 md:px-0 md:py-0">
        <div className="md:flex md:h-full md:w-[48vw] md:shrink-0 md:flex-col md:justify-center md:pl-16 md:pr-10">
          <p className="eyebrow mb-6">Chapter III &mdash; The path</p>
          <h2 className="display text-[clamp(2.6rem,6vw,6.5rem)]">
            Sixteen years, <span className="italic text-(--color-accent)">five rooms</span>.
          </h2>
          <p className="mt-6 max-w-md text-(--color-muted)">Every station taught one thing. Scroll to walk through them.</p>
        </div>

        <div className="path-line absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-gradient-to-r from-(--color-accent) to-(--color-accent)/20 md:block" />

        {STOPS.map((s, i) => (
          <article
            key={s.year}
            className={`path-card relative md:flex md:h-full md:w-[34vw] md:shrink-0 md:flex-col md:justify-center md:px-8 ${i % 2 ? "md:pt-[26vh]" : "md:pb-[26vh]"}`}
          >
            <div className="absolute -left-1 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-(--color-accent) shadow-[0_0_24px_var(--color-accent)] md:block md:left-8" />
            <span className="display block text-[clamp(4rem,9vw,9rem)] text-transparent [-webkit-text-stroke:1px_oklch(0.8_0.15_75/0.7)]">{s.year}</span>
            <h3 className="display mt-2 text-2xl md:text-3xl">{s.title}</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-(--color-accent)">{s.place}</p>
            <p className="mt-4 max-w-sm text-(--color-muted)">{s.text}</p>
          </article>
        ))}
        <div className="hidden md:block md:w-[20vw] md:shrink-0" />
      </div>
    </section>
  );
}
