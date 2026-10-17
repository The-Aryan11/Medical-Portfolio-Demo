import { scrollToId } from "../lib/lenis";

export default function Nav({ chapter }: { chapter: string }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-16">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="display text-lg tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)">
          A<span className="italic text-(--color-accent)">.</span>Mehra
        </a>
        <p key={chapter} className="hidden animate-[fadeUp_.6s_ease-out] text-xs uppercase tracking-[0.22em] text-(--color-muted) md:block">{chapter}</p>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm transition-colors hover:border-(--color-accent) hover:text-(--color-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
        >
          Consult
        </a>
      </header>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
        <div className="progress h-full origin-left scale-x-0 bg-(--color-accent)" />
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}
