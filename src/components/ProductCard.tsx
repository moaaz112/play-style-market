import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.includes(product.id);
  const onSale = product.salePrice && product.salePrice < product.price;

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {onSale && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">SALE</span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center"
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("h-4 w-4", isWished && "fill-primary text-primary")} />
        </button>
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-sm uppercase tracking-wide">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 uppercase">{product.category}</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          {onSale ? (
            <>
              <span className="text-primary font-bold">{product.salePrice} EGP</span>
              <span className="text-muted-foreground text-sm line-through">{product.price} EGP</span>
            </>
          ) : (
            <span className="font-bold">{product.price} EGP</span>
          )}
        </div>
      </div>
    </Link>
  );
}