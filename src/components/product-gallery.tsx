import { useState } from "react";
import { colorMap } from "@/lib/colors";
import type { GalleryShade } from "@/lib/products";

export function ProductGallery({
  name,
  shades,
}: {
  name: string;
  shades: GalleryShade[];
}) {
  const [i, setI] = useState(0);
  const active = shades[i]!;
  const go = (n: number) => setI((n + shades.length) % shades.length);

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-blush/30 blur-2xl" aria-hidden />
      <div className="relative">
        <img
          key={active.image}
          src={active.image}
          alt={`${name} — ${active.label}`}
          width={1024}
          height={1024}
          className="relative aspect-square w-full rounded-2xl bg-blush/20 object-contain p-6 shadow-xl"
        />

        <button
          type="button"
          onClick={() => go(i - 1)}
          aria-label="Previous shade"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 px-3 py-2 text-primary shadow transition hover:bg-primary hover:text-primary-foreground"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(i + 1)}
          aria-label="Next shade"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 px-3 py-2 text-primary shadow transition hover:bg-primary hover:text-primary-foreground"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/85 px-4 py-1 text-[0.65rem] tracking-luxe text-primary shadow">
          {active.label}
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-3">
        {shades.map((s, idx) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setI(idx)}
            aria-label={s.label}
            aria-current={idx === i}
            title={s.label}
            className={
              "h-16 w-16 overflow-hidden rounded-xl border bg-blush/20 p-1 transition " +
              (idx === i ? "border-primary" : "border-border hover:border-primary/50")
            }
          >
            <img src={s.image} alt={s.label} loading="lazy" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>

      <div className="relative mt-3 flex items-center justify-center gap-2">
        {shades.map((s, idx) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show ${s.label}`}
            className={
              "h-3 w-3 rounded-full border transition " +
              (idx === i ? "border-primary scale-125" : "border-border")
            }
            style={{ backgroundColor: colorMap[s.label] ?? "transparent" }}
          />
        ))}
      </div>
    </div>
  );
}
