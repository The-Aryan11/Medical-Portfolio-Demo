import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic";
import { scrollTop } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Close() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cl-bg", { yPercent: -12, scale: 1.15 }, { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.fromTo(".cl-w", { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.08, immediateRender: false, scrollTrigger: { trigger: ".cl-h", start: "top 80%" } });
      gsap.fromTo(".cl-in", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, immediateRender: false, scrollTrigger: { trigger: ".cl-h", start: "top 60%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = (s: string, cls = "") =>
    s.split(" ").map((w, i) => (
      <span key={i} className="mask-line mr-[0.22em]">
        <span className={`cl-w inline-block ${cls}`}>{w}</span>
      </span>
    ));

  return (
    <section id="contact" ref={root} className="relative overflow-hidden px-6 pb-10 pt-32 md:px-16 md:pt-48">
      <img src="/img/neurons.jpg" alt="" loading="lazy" className="cl-bg absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-(--color-canvas) via-(--color-canvas)/60 to-(--color-canvas)" />

      <div className="relative mx-auto max-w-7xl">
        <p className="cl-in eyebrow mb-8">Chapter X &mdash; Begin</p>
        <h2 className="cl-h display text-[clamp(3rem,9vw,9.5rem)]">
          <span className="block">{words("Every brain")}</span>
          <span className="block">
            {words("is a story.", "")}
          </span>
          <span className="block italic text-(--color-accent)">{words("Let’s protect yours.")}</span>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="cl-in md:col-span-6">
            <Magnetic>
              <a
                href="mailto:consult@drarjunmehra.example"
                data-cursor="Write"
                className="group inline-flex items-center gap-4 rounded-full bg-(--color-accent) px-9 py-5 text-lg font-medium text-(--color-canvas) transition-colors hover:bg-(--color-ink) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-ink) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-canvas)"
              >
                Request a consultation
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
          <dl className="cl-in grid grid-cols-2 gap-8 text-sm md:col-span-6">
            <div>
              <dt className="eyebrow mb-2">Clinic</dt>
              <dd className="text-(--color-muted)">Meridian Institute of Neurosciences<br />Tower B, Level 4</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Hours</dt>
              <dd className="text-(--color-muted)">Mon &ndash; Fri, 9:00 &ndash; 17:00<br />Emergency referrals 24/7</dd>
            </div>
          </dl>
        </div>

        <footer className="mt-28 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-(--color-muted) md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Bespoke Portfolios &mdash; a demo portfolio. All names, cases and figures are fictional.</p>
          <button
            type="button"
            onClick={scrollTop}
            data-cursor="Top"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-5 py-3 uppercase tracking-[0.18em] transition-colors hover:border-(--color-accent) hover:text-(--color-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
          >
            Back to the beginning <ArrowUp className="h-4 w-4" />
          </button>
        </footer>
      </div>
    </section>
  );
}
