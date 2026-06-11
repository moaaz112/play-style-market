import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppUrl, type CheckoutInfo } from "@/lib/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — El Nazer Sportswear" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const nav = useNavigate();
  const [info, setInfo] = useState<CheckoutInfo>({ fullName: "", phone: "", city: "", address: "", notes: "" });

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black">Your cart is empty</h1>
        <Link to="/products" className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded font-bold uppercase">Shop Now</Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.fullName || !info.phone || !info.city || !info.address) {
      toast.error("Please fill all required fields");
      return;
    }
    const url = buildWhatsAppUrl(items, info, total);
    toast.success("Opening WhatsApp...");
    window.open(url, "_blank");
    setTimeout(() => { clear(); nav({ to: "/" }); }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-black mb-4">Checkout</h1>
        {[
          { k: "fullName", label: "Full Name *", type: "text" },
          { k: "phone", label: "Phone Number *", type: "tel" },
          { k: "city", label: "City *", type: "text" },
          { k: "address", label: "Address *", type: "text" },
        ].map((f) => (
          <div key={f.k}>
            <label className="block text-sm font-semibold mb-1">{f.label}</label>
            <input
              type={f.type}
              required
              value={(info as never)[f.k]}
              onChange={(e) => setInfo({ ...info, [f.k]: e.target.value })}
              className="w-full border border-border rounded-md px-3 py-2 bg-card"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold mb-1">Notes (optional)</label>
          <textarea
            value={info.notes}
            onChange={(e) => setInfo({ ...info, notes: e.target.value })}
            rows={3}
            className="w-full border border-border rounded-md px-3 py-2 bg-card"
          />
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded font-black uppercase tracking-wider hover:bg-primary/90">
          Confirm Order via WhatsApp
        </button>
        <p className="text-xs text-muted-foreground text-center">Your order will be sent to our team on WhatsApp for confirmation.</p>
      </form>
      <div className="bg-muted p-6 rounded-lg h-fit">
        <h2 className="font-black text-xl mb-4">Your Order</h2>
        <div className="space-y-3 mb-4">
          {items.map((i) => (
            <div key={`${i.product.id}-${i.size}-${i.color}`} className="flex gap-3 text-sm">
              <img src={i.product.images[0]} alt="" className="h-12 w-12 rounded object-cover" />
              <div className="flex-1">
                <p className="font-semibold">{i.product.name}</p>
                <p className="text-muted-foreground text-xs">{i.size} · {i.color} · x{i.quantity}</p>
              </div>
              <p className="font-semibold">{((i.product.salePrice ?? i.product.price) * i.quantity).toFixed(0)} EGP</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(0)} EGP</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping} EGP</span></div>
          <div className="flex justify-between font-black text-base pt-2"><span>Total</span><span>{total.toFixed(0)} EGP</span></div>
        </div>
      </div>
    </div>
  );
}