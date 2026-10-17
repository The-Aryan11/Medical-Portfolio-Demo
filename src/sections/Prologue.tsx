import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrubWords from "../components/ScrubWords";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "I was fourteen when I first understood that a hospital ward can be quiet in a way that is louder than any noise. My grandmother lay in the third bed from the window. A stroke had taken her words, but not her eyes. In that dawn light I decided to spend my life learning the language of the brain, so that no family would have to sit in that silence without an answer.";

export default function Prologue() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pro-img",
        { yPercent: -12 },
        { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-32 md:px-16 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img src="/img/ward.jpg" alt="An empty hospital corridor at dawn" className="pro-img absolute inset-0 h-[125%] w-full -translate-y-[10%] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-(--color-canvas)/60 to-transparent" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-(--color-muted)">Ward 3, dawn. Where it began.</p>
          </div>
        </div>
        <div className="md:col-span-8 md:pt-16">
          <p className="eyebrow mb-8">Chapter I &mdash; The quiet ward</p>
          <ScrubWords text={TEXT} className="display text-[clamp(1.7rem,3.6vw,3.4rem)] leading-[1.18] tracking-[-0.015em]" />
        </div>
      </div>
    </section>
  );
}
