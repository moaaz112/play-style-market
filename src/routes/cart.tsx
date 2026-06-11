import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — El Nazer Sportswear" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQty, removeItem, subtotal, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-black">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some jerseys to get started.</p>
        <Link to="/products" className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded font-bold uppercase">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-black mb-4">Shopping Cart</h1>
        {items.map((i) => {
          const price = i.product.salePrice ?? i.product.price;
          return (
            <div key={`${i.product.id}-${i.size}-${i.color}`} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
              <img src={i.product.images[0]} alt={i.product.name} className="h-24 w-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{i.product.name}</h3>
                <p className="text-sm text-muted-foreground">Size: {i.size} · Color: {i.color}</p>
                <p className="font-bold text-primary mt-1">{price} EGP</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateQty(i.product.id, i.size, i.color, i.quantity - 1)} className="p-1.5"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm font-semibold">{i.quantity}</span>
                    <button onClick={() => updateQty(i.product.id, i.size, i.color, i.quantity + 1)} className="p-1.5"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeItem(i.product.id, i.size, i.color)} className="text-destructive text-sm flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                </div>
              </div>
              <div className="font-bold">{(price * i.quantity).toFixed(0)} EGP</div>
            </div>
          );
        })}
      </div>
      <div className="bg-muted p-6 rounded-lg h-fit sticky top-24">
        <h2 className="font-black text-xl mb-4">Order Summary</h2>
        <div className="flex justify-between py-2 text-sm"><span>Subtotal</span><span>{subtotal.toFixed(0)} EGP</span></div>
        <div className="flex justify-between py-2 text-sm"><span>Shipping</span><span>{shipping} EGP</span></div>
        <div className="border-t border-border my-3" />
        <div className="flex justify-between py-2 font-black text-lg"><span>Total</span><span>{total.toFixed(0)} EGP</span></div>
        <Link to="/checkout" className="block text-center mt-4 bg-primary text-primary-foreground py-3 rounded font-bold uppercase">Checkout</Link>
      </div>
    </div>
  );
}