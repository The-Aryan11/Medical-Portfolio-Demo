import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Word = ({ children, className = "" }: { children: string; className?: string }) => (
  <span className="mask-line mr-[0.22em]">
    <span className={`hw inline-block ${className}`}>{children}</span>
  </span>
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hw", { yPercent: 115 }, { yPercent: 0, duration: 1.5, ease: "power4.out", stagger: 0.09, delay: 0.25 });
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.2, stagger: 0.12 },
      );
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", scrub: 0.8, pin: true, anticipatePin: 1 },
      });
      tl.to(".hero-bg", { scale: 1.6, ease: "none", duration: 1 }, 0)
        .to(".hero-hint", { opacity: 0, duration: 0.1 }, 0)
        .to(".hero-act1", { scale: 1.3, opacity: 0, ease: "none", duration: 0.4 }, 0.15)
        .to(".hero-act2", { opacity: 1, scale: 1, ease: "none", duration: 0.35 }, 0.6)
        .to(".hero-shade", { opacity: 0.85, ease: "none", duration: 0.6 }, 0.4);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden" >
      <img
        src="/img/neurons.jpg"
        alt=""
        className="hero-bg absolute inset-0 h-full w-full object-cover opacity-80"
        fetchPriority="high"
      />
      <div className="hero-shade absolute inset-0 bg-gradient-to-b from-(--color-canvas)/70 via-(--color-canvas)/20 to-(--color-canvas) opacity-60" />

      <div className="hero-act1 absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="hero-fade eyebrow mb-8">A story told in neurons</p>
        <h1 className="display text-[clamp(2.9rem,9.2vw,9.5rem)]">
          <span className="block">
            <Word>Twelve</Word>
            <Word>billion</Word>
            <Word>neurons.</Word>
          </span>
          <span className="block">
            <Word>One</Word>
            <Word className="italic text-(--color-accent)">steady</Word>
            <Word>hand.</Word>
          </span>
        </h1>
      </div>

      <div className="hero-act2 absolute inset-0 flex scale-90 flex-col items-center justify-center px-6 text-center opacity-0">
        <p className="eyebrow mb-6">Meridian Institute of Neurosciences</p>
        <h2 className="display text-[clamp(3rem,10vw,10rem)]">
          Dr. Arjun <span className="italic text-(--color-accent)">Mehra</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-(--color-muted) md:text-xl">
          Neurosurgeon. I operate where the mind lives, and I have learned to be very, very quiet there.
        </p>
      </div>

      <div className="hero-hint hero-fade absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.25em] text-(--color-muted)">
        <span>Scroll to begin</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[drop_1.8s_ease-in-out_infinite] bg-(--color-accent)" />
        </span>
      </div>
      <style>{`@keyframes drop{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
