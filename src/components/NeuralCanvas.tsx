import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Signal = { a: number; b: number; t: number };

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999 };
    let lastY = window.scrollY;
    let vel = 0;
    let frame = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(80, (w * h) / 24000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.7,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const link = Math.min(170, Math.max(110, w * 0.11));

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      vel += (sy - lastY) * 0.02;
      lastY = sy;
      vel *= 0.9;
      const D = Math.max(110, Math.min(170, w * 0.11));
      const pairs: [number, number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy - vel * 0.35;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const md = Math.hypot(dx, dy);
        if (md < 180) {
          n.x += (dx / md) * 0.35;
          n.y += (dy / md) * 0.35;
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < D) pairs.push([i, j, d]);
        }
      }

      ctx.lineWidth = 1;
      for (const [i, j, d] of pairs) {
        const a = nodes[i];
        const b = nodes[j];
        ctx.strokeStyle = `rgba(244,184,96,${(1 - d / D) * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(244,200,140,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame % 28 === 0 && pairs.length && signals.length < 14) {
        const p = pairs[Math.floor(Math.random() * pairs.length)];
        signals.push({ a: p[0], b: p[1], t: 0 });
      }
      for (let k = signals.length - 1; k >= 0; k--) {
        const s = signals[k];
        s.t += 0.025;
        if (s.t >= 1) {
          signals.splice(k, 1);
          continue;
        }
        const a = nodes[s.a];
        const b = nodes[s.b];
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, "rgba(255,214,150,0.95)");
        g.addColorStop(1, "rgba(244,184,96,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    void link;
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
