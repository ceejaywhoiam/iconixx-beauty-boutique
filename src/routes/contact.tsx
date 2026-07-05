import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ICONIXX Beauty" },
      { name: "description", content: "Get in touch with ICONIXX Beauty for orders, press, or collaborations." },
      { property: "og:title", content: "Contact — ICONIXX Beauty" },
      { property: "og:description", content: "Reach out to the ICONIXX Beauty team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="tracking-luxe text-accent">Say Hello</div>
        <h1 className="mt-3 text-display text-5xl text-primary md:text-6xl">Contact</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          For orders, press inquiries, wholesale, or collaborations — we'd love to hear from you.
        </p>

        {sent ? (
          <div className="mt-10 rounded-2xl border border-accent/40 bg-secondary/60 p-8 text-center">
            <div className="text-display text-2xl text-primary">Thank you 💌</div>
            <p className="mt-2 text-sm text-muted-foreground">
              We've received your message and will reply within 1–2 business days.
            </p>
          </div>
        ) : (
          <form
            className="mt-10 grid gap-4"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className="rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent" />
              <input required type="email" placeholder="Email" className="rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent" />
            </div>
            <input placeholder="Subject" className="rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent" />
            <textarea required rows={6} placeholder="Your message" className="rounded-2xl border border-border bg-background px-5 py-4 text-sm outline-none focus:border-accent" />
            <button className="justify-self-start rounded-full bg-primary px-7 py-3 text-xs tracking-luxe text-primary-foreground hover:bg-primary/90">
              Send Message
            </button>
          </form>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
