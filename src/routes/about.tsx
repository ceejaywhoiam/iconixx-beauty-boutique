import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ICONIXX Beauty by Shara Frison" },
      { name: "description", content: "The story behind ICONIXX Beauty and its founder & CEO Shara Frison — soft luxury cosmetics made for every woman." },
      { property: "og:title", content: "About — ICONIXX Beauty" },
      { property: "og:description", content: "The story behind ICONIXX Beauty and CEO Shara Frison." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="tracking-luxe text-accent">Our Story</div>
        <h1 className="mt-4 text-display text-5xl text-primary md:text-6xl">
          Founded on confidence.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-foreground/80">
          ICONIXX Beauty was created by <span className="text-primary">Shara Frison</span> — a
          founder who believes beauty should feel like a signature, not a costume. Every
          shade, every finish, every detail is designed for the woman who walks in confidence
          and leaves a lasting impression.
        </p>
        <p className="mt-6 leading-relaxed text-foreground/80">
          From velvet-matte lip glosses to buttery neutral palettes and precision liners,
          ICONIXX is soft luxury made accessible — highly pigmented, cruelty-free, and
          beautiful on every skin tone.
        </p>

        <div className="mt-16 grid gap-6 border-t border-border pt-12 sm:grid-cols-3">
          <div>
            <div className="text-display text-3xl text-accent">Soft</div>
            <div className="tracking-luxe mt-1">Luxury</div>
            <p className="mt-2 text-sm text-muted-foreground">Feminine, elegant, timeless finishes.</p>
          </div>
          <div>
            <div className="text-display text-3xl text-accent">Bold</div>
            <div className="tracking-luxe mt-1">Confidence</div>
            <p className="mt-2 text-sm text-muted-foreground">Pigment that speaks before you do.</p>
          </div>
          <div>
            <div className="text-display text-3xl text-accent">Made</div>
            <div className="tracking-luxe mt-1">For Every Tone</div>
            <p className="mt-2 text-sm text-muted-foreground">Inclusive shades. Cruelty-free formulas.</p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-secondary/60 p-10 text-center">
          <p className="text-display text-2xl leading-snug text-primary md:text-3xl">
            "I built ICONIXX for the girl who knows her worth — the one who walks in
            softly and leaves everyone remembering her."
          </p>
          <div className="mt-4 tracking-luxe text-accent">Shara Frison, Founder & CEO</div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/shop" className="inline-flex rounded-full bg-primary px-7 py-3 text-xs tracking-luxe text-primary-foreground hover:bg-primary/90">
            Explore the Collection
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
