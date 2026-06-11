import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — El Nazer Sportswear" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const list = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-6">Your Wishlist</h1>
      {list.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No items in your wishlist yet.</p>
          <Link to="/products" className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded font-bold uppercase">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}