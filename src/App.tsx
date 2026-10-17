import { useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis } from "./lib/lenis";
import NeuralCanvas from "./components/NeuralCanvas";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Prologue from "./sections/Prologue";
import Surgeon from "./sections/Surgeon";
import Path from "./sections/Path";
import Descent from "./sections/Descent";
import Hours from "./sections/Hours";
import Numbers from "./sections/Numbers";
import Craft from "./sections/Craft";
import Teaching from "./sections/Teaching";
import Voices from "./sections/Voices";
import Close from "./sections/Close";

gsap.registerPlugin(ScrollTrigger);

const Chapter = ({ label, children }: { label: string; children: ReactNode }) => (
  <div data-chapter={label}>{children}</div>
);

export default function App() {
  const [chapter, setChapter] = useState("Prologue");

  useEffect(() => {
    const stop = initLenis();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    const bar = gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
    const triggers = gsap.utils.toArray<HTMLElement>("[data-chapter]").map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setChapter(el.dataset.chapter ?? ""),
      })
    );
    return () => {
      window.removeEventListener("load", refresh);
      triggers.forEach((t) => t.kill());
      bar.scrollTrigger?.kill();
      bar.kill();
      stop();
    };
  }, []);

  return (
    <div className="grain" id="top">
      <NeuralCanvas />
      <Cursor />
      <Nav chapter={chapter} />
      <main className="relative z-10">
        <Chapter label="Prologue"><Hero /></Chapter>
        <Chapter label="I · The quiet ward"><Prologue /></Chapter>
        <Chapter label="II · The surgeon"><Surgeon /></Chapter>
        <Chapter label="III · The path"><Path /></Chapter>
        <Chapter label="IV · The descent"><Descent /></Chapter>
        <Chapter label="V · Nine hours"><Hours /></Chapter>
        <Chapter label="VI · By the numbers"><Numbers /></Chapter>
        <Chapter label="VII · The craft"><Craft /></Chapter>
        <Chapter label="VIII · Handing it on"><Teaching /></Chapter>
        <Chapter label="IX · In their words"><Voices /></Chapter>
        <Chapter label="X · Begin"><Close /></Chapter>
      </main>
    </div>
  );
}
