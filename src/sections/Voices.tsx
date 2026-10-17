import ScrubWords from "../components/ScrubWords";

const VOICES = [
  { q: "He told me exactly what he was afraid of, and then he told me exactly what he would do about it. I have never trusted anyone so quickly.", who: "Priya, teacher. Awake craniotomy patient" },
  { q: "Arjun operates like he is listening. The room goes quiet and every person in it knows what is needed next.", who: "Dr. R. Sen, Head of Neurosciences, Meridian Institute" },
  { q: "He let me hold the instrument on my first awake case, and then stood behind me for six hours without saying a word.", who: "Resident, 2023 cohort" },
];

export default function Voices() {
  return (
    <section className="relative px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-16">Chapter IX &mdash; In their words</p>
        <div className="space-y-28 md:space-y-40">
          {VOICES.map((v) => (
            <figure key={v.who}>
              <ScrubWords text={`“${v.q}”`} className="display text-[clamp(1.8rem,4vw,3.8rem)] leading-[1.15] tracking-[-0.015em]" start="top 85%" end="bottom 60%" />
              <figcaption className="mt-8 text-sm uppercase tracking-[0.18em] text-(--color-accent)">{v.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
