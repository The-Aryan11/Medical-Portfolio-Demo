import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = 554;
const LOG = [
  { m: 0, t: "Patient arrives", d: "A 34-year-old teacher. A tumour presses on her speech area. Her only question: “Will I still be able to teach?”" },
  { m: 70, t: "The skull opens", d: "She is gently woken on the table. She can hear me, and she can talk." },
  { m: 150, t: "Mapping the brain", d: "A whisper of current, and every word she says tells my hand where it is safe to go." },
  { m: 285, t: "The edge", d: "She counts, names objects, recites poems. The tumour edge sits two millimetres from her language pathway." },
  { m: 440, t: "Removal", d: "Fragment by fragment. Her speech never falters, not once." },
  { m: 554, t: "Closing", d: "“Thank you, doctor.” The first words I wanted to hear." },
];
const R = 120;
const C = 2 * Math.PI * R;

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

export default function Hours() {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
      const isMobile = !!c.conditions?.mobile;
      const entries = gsap.utils.toArray<HTMLElement>(".hr-entry");
      gsap.set(entries.slice(1), { opacity: 0, y: 30 });
      const state = { m: 0 };
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=380%", scrub: 0.8, pin: true, anticipatePin: 1 },
      });
      tl.to(state, { m: TOTAL, ease: "none", duration: 1, onUpdate: () => { if (clock.current) clock.current.textContent = fmt(state.m); } }, 0)
        .fromTo(".hr-ring", { strokeDashoffset: C }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
        .to(".hr-bg", { scale: 1.2, ease: "none", duration: 1 }, 0)
        .to(".hr-beam", { opacity: 1, ease: "none", duration: 0.3 }, 0);
      LOG.forEach((e, i) => {
        const at = Math.max(e.m / TOTAL - 0.02, 0);
        if (i > 0) tl.to(entries[i], { opacity: 1, y: 0, duration: 0.07, ease: "power2.out" }, at);
        if (i < LOG.length - 1) {
          const next = Math.max(LOG[i + 1].m / TOTAL - 0.02, 0);
          tl.to(entries[i], { opacity: isMobile ? 0 : 0.35, duration: 0.05 }, next);
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden">
      <img src="/img/theatre.jpg" alt="" className="hr-bg absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="hr-beam absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,oklch(0.8_0.15_75/0.18),transparent_60%)] opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-(--color-canvas) via-(--color-canvas)/45 to-(--color-canvas)" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-24 md:px-16">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow mb-3">Chapter V &mdash; Nine hours, one patient</p>
            <p className="max-w-sm text-sm text-(--color-muted)">Case file 214 · Awake craniotomy, left frontal glioma. A composite, anonymised case.</p>
          </div>
        </div>

        <div className="grid flex-1 items-center gap-6 md:grid-cols-2 md:gap-16">
          <div className="relative mx-auto flex aspect-square w-[min(62vw,24rem)] items-center justify-center md:w-[min(34vw,30rem)]">
            <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <circle className="hr-ring" cx="140" cy="140" r={R} fill="none" stroke="oklch(0.8 0.15 75)" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
            </svg>
            <div className="text-center">
              <span ref={clock} className="display block text-[clamp(3.2rem,8vw,7rem)] tabular-nums">00:00</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.25em] text-(--color-muted)">hours in theatre</span>
              <svg viewBox="0 0 120 24" className="mx-auto mt-4 h-5 w-24 text-(--color-accent)">
                <path d="M0 12 H34 L40 3 L48 21 L54 12 H120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="160" className="animate-[ecg_1.6s_linear_infinite]" />
              </svg>
            </div>
          </div>

          <div className="relative min-h-52 md:min-h-0">
            <div className="grid md:block md:space-y-5">
              {LOG.map((e, i) => (
                <div key={e.m} className="hr-entry col-start-1 row-start-1 md:col-auto md:row-auto">
                  <div className="flex items-baseline gap-4">
                    <span className="display text-2xl italic text-(--color-accent) tabular-nums">{fmt(e.m)}</span>
                    <h3 className="display text-xl md:text-2xl">{e.t}</h3>
                  </div>
                  <p className={`mt-1 max-w-md text-sm text-(--color-muted) md:pl-[4.5rem] md:text-base ${i === 0 ? "" : ""}`}>{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes ecg{from{stroke-dashoffset:160}to{stroke-dashoffset:-160}}`}</style>
    </section>
  );
}
