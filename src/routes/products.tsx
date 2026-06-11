import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const search = z.object({ q: z.string().optional(), cat: z.string().optional() });

export const Route = createFileRoute("/products")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "All Products — El Nazer Sportswear" }, { name: "description", content: "Browse all jerseys, shoes and accessories." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q, cat } = Route.useSearch();
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [category, setCategory] = useState<string>(cat || "all");

  const list = useMemo(() => {
    let res = products;
    if (q) res = res.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (category !== "all") res = res.filter((p) => p.category === category);
    if (sort === "price-asc") res = [...res].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "price-desc") res = [...res].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (sort === "rating") res = [...res].sort((a, b) => b.rating - a.rating);
    return res;
  }, [q, category, sort]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-2">{q ? `Results for "${q}"` : "All Products"}</h1>
      <p className="text-muted-foreground mb-6">{list.length} products</p>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-border rounded-md px-3 py-2 bg-card">
          <option value="all">All Categories</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="kids">Kids</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as never)} className="border border-border rounded-md px-3 py-2 bg-card">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      {list.length === 0 ? (
        <p className="text-center py-20 text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}