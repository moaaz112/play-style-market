import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "NEW",
    title: "COLLECTION ARRIVAL",
    subtitle: "Egypt World Cup 26",
    cta: "Shop Now",
    to: "/category/football",
    bg: "https://picsum.photos/seed/hero-football/1600/600",
  },
  {
    eyebrow: "JUST IN",
    title: "BASKETBALL SEASON",
    subtitle: "Premium NBA Jerseys",
    cta: "Explore",
    to: "/category/basketball",
    bg: "https://picsum.photos/seed/hero-basket/1600/600",
  },
  {
    eyebrow: "UP TO 30% OFF",
    title: "BEST SELLERS",
    subtitle: "Limited time only",
    cta: "Shop Sale",
    to: "/products",
    bg: "https://picsum.photos/seed/hero-sale/1600/600",
  },
];

export function HeroBanner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[640px] overflow-hidden bg-secondary">
      <div
        key={i}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 animate-in fade-in"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.4)), url(${s.bg})` }}
      />
      <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4 text-white">
        <span className="text-primary font-bold tracking-[0.4em] text-sm mb-2">{s.eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">{s.title}</h1>
        <div className="mt-4 inline-block bg-primary text-primary-foreground italic font-black text-2xl md:text-3xl px-8 py-2 skew-x-[-10deg]">
          <span className="inline-block skew-x-[10deg]">EL NAZER</span>
        </div>
        <p className="mt-4 text-white/80 text-lg">{s.subtitle}</p>
        <Link to={s.to} className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded uppercase tracking-wider">
          {s.cta}
        </Link>
      </div>
      <button onClick={() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-primary text-white flex items-center justify-center"><ChevronLeft /></button>
      <button onClick={() => setI((p) => (p + 1) % SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-primary text-white flex items-center justify-center"><ChevronRight /></button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "bg-primary w-8" : "bg-white/50 w-2"}`} aria-label={`Slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}