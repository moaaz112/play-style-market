import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { products, getByCollection } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "El Nazer Sportswear — Premium Football Jerseys & Sports Gear in Egypt" },
      { name: "description", content: "Shop authentic football jerseys, basketball gear, shoes and accessories. World Cup 26 collection out now." },
      { property: "og:title", content: "El Nazer Sportswear" },
      { property: "og:description", content: "Premium sportswear and football jerseys in Egypt." },
    ],
  }),
  component: Index,
});

function Index() {
  const egypt = getByCollection("egypt");
  const worldcup = getByCollection("worldcup");
  const newArr = getByCollection("new");
  const best = getByCollection("best");

  return (
    <div>
      <HeroBanner />

      <section className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { Icon: Truck, t: "Fast Delivery", d: "All across Egypt" },
          { Icon: ShieldCheck, t: "Authentic", d: "100% original" },
          { Icon: RefreshCw, t: "Easy Returns", d: "14-day policy" },
          { Icon: Star, t: "Top Rated", d: "Trusted by fans" },
        ].map(({ Icon, t, d }) => (
          <div key={t} className="flex items-center gap-3 p-4 rounded-lg border border-border">
            <Icon className="h-8 w-8 text-primary" />
            <div>
              <p className="font-bold text-sm">{t}</p>
              <p className="text-xs text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-muted py-10">
        <div className="container mx-auto px-4">
          <SectionTitle>EGYPT WORLD CUP 26</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {egypt.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <SectionTitle accent="WORLD CUP 26">COLLECTION</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {worldcup.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <SectionTitle accent="NEW">ARRIVALS</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArr.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-4">
          {[
            { name: "Football", img: "https://picsum.photos/seed/cat-football/600/400", to: "/category/football" },
            { name: "Basketball", img: "https://picsum.photos/seed/cat-basket/600/400", to: "/category/basketball" },
            { name: "Shoes", img: "https://picsum.photos/seed/cat-shoes/600/400", to: "/category/shoes" },
          ].map((c) => (
            <Link key={c.name} to={c.to} className="group relative h-48 rounded-lg overflow-hidden">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-2xl font-black tracking-widest">{c.name.toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <SectionTitle accent="BEST">SELLERS</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
          {products.slice(0, 4 - best.length).map((p) => <ProductCard key={`f-${p.id}`} product={p} />)}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <SectionTitle accent="CUSTOMER">REVIEWS</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Ahmed M.", t: "Quality jerseys, fast delivery. Will order again!" },
              { n: "Sara K.", t: "The Egypt kit feels premium. Love the fit." },
              { n: "Omar A.", t: "Best sportswear store in Egypt, hands down." },
            ].map((r) => (
              <div key={r.n} className="bg-card p-6 rounded-lg border border-border">
                <div className="flex gap-1 mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
                <p className="text-sm">"{r.t}"</p>
                <p className="mt-3 font-bold text-sm">— {r.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
