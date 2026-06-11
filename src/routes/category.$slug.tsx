import { createFileRoute, notFound } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const CATS: Record<string, { title: string; filter: (p: typeof products[number]) => boolean }> = {
  men: { title: "Men", filter: (p) => ["football", "basketball", "shoes", "accessories"].includes(p.category) },
  women: { title: "Women", filter: (p) => ["shoes", "accessories"].includes(p.category) },
  kids: { title: "Kids", filter: (p) => p.category === "kids" },
  football: { title: "Football Jerseys", filter: (p) => p.category === "football" },
  basketball: { title: "Basketball", filter: (p) => p.category === "basketball" },
  shoes: { title: "Shoes", filter: (p) => p.category === "shoes" },
  accessories: { title: "Accessories", filter: (p) => p.category === "accessories" },
};

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${CATS[params.slug]?.title ?? "Category"} — El Nazer Sportswear` }] }),
  component: CategoryPage,
  notFoundComponent: () => <div className="container py-20 text-center">Category not found.</div>,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = CATS[slug];
  if (!cat) throw notFound();
  const list = products.filter(cat.filter);
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase">{cat.title}</h1>
      <p className="text-muted-foreground mb-8">{list.length} products</p>
      {list.length === 0 ? (
        <p className="text-center py-20 text-muted-foreground">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}