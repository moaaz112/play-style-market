import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { Heart, Minus, Plus, Star, ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return { meta: [{ title: p ? `${p.name} — El Nazer` : "Product" }, { name: "description", content: p?.description ?? "" }, { property: "og:image", content: p?.images[0] ?? "" }] };
  },
  component: ProductPage,
  notFoundComponent: () => <div className="container py-20 text-center">Product not found.</div>,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  if (!product) throw notFound();
  const nav = useNavigate();
  const { addItem, toggleWishlist, wishlist } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const wished = wishlist.includes(product.id);
  const onSale = product.salePrice && product.salePrice < product.price;

  const handleAdd = () => {
    addItem({ product, size, color, quantity: qty });
    toast.success(`${product.name} added to cart`);
  };
  const handleBuy = () => {
    addItem({ product, size, color, quantity: qty });
    nav({ to: "/checkout" });
  };

  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div>
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.images[img]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 mt-4">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} className={cn("h-20 w-20 rounded-md overflow-hidden border-2", i === img ? "border-primary" : "border-border")}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-black">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          {Array.from({length:5}).map((_,i)=><Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground")} />)}
          <span className="text-sm text-muted-foreground">({product.rating})</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          {onSale ? (
            <>
              <span className="text-3xl font-black text-primary">{product.salePrice} EGP</span>
              <span className="text-xl text-muted-foreground line-through">{product.price} EGP</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">SALE</span>
            </>
          ) : (
            <span className="text-3xl font-black">{product.price} EGP</span>
          )}
        </div>
        <p className="mt-4 text-muted-foreground">{product.description}</p>
        <p className={cn("mt-2 text-sm font-semibold", product.stock > 0 ? "text-green-600" : "text-destructive")}>
          {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
        </p>

        <div className="mt-6">
          <p className="font-semibold mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={cn("min-w-12 h-10 px-3 border-2 rounded font-semibold", size === s ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{s}</button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">Color: <span className="font-normal text-muted-foreground">{color}</span></p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button key={c.name} onClick={() => setColor(c.name)} title={c.name} className={cn("h-9 w-9 rounded-full border-2", color === c.name ? "border-primary ring-2 ring-primary/30" : "border-border")} style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <p className="font-semibold">Qty</p>
          <div className="flex items-center border border-border rounded-md">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2"><Minus className="h-4 w-4" /></button>
            <span className="px-4 font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button onClick={handleAdd} disabled={product.stock === 0} className="flex-1 bg-secondary text-secondary-foreground py-3 rounded font-bold uppercase flex items-center justify-center gap-2 hover:bg-secondary/90 disabled:opacity-50">
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
          <button onClick={handleBuy} disabled={product.stock === 0} className="flex-1 bg-primary text-primary-foreground py-3 rounded font-bold uppercase flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50">
            <Zap className="h-4 w-4" /> Buy Now
          </button>
          <button onClick={() => toggleWishlist(product.id)} className="h-12 w-12 border border-border rounded flex items-center justify-center">
            <Heart className={cn("h-5 w-5", wished && "fill-primary text-primary")} />
          </button>
        </div>
      </div>
    </div>
  );
}