import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Men", to: "/category/men" },
  { label: "Women", to: "/category/women" },
  { label: "Kids", to: "/category/kids" },
  { label: "Football Jerseys", to: "/category/football" },
  { label: "Basketball", to: "/category/basketball" },
  { label: "Shoes", to: "/category/shoes" },
  { label: "Accessories", to: "/category/accessories" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { count, wishlist } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      nav({ to: "/products", search: { q: q.trim() } as never });
      setSearchOpen(false);
      setQ("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center font-black text-primary-foreground text-xl italic">Z</div>
          <span className="font-bold tracking-wider hidden sm:inline">EL NAZER</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search"><Search className="h-5 w-5" /></button>
          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{count}</span>
            )}
          </Link>
          <User className="h-5 w-5 hidden sm:block" />
        </div>
      </div>
      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-white/10 px-4 py-3 bg-secondary">
          <div className="container mx-auto flex gap-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jerseys, shoes, accessories..."
              className="flex-1 rounded-md px-3 py-2 bg-white text-foreground placeholder:text-muted-foreground"
            />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold">Search</button>
          </div>
        </form>
      )}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-secondary p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">EL NAZER</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-6 w-6" /></button>
            </div>
            <nav className="flex flex-col gap-4 text-sm font-semibold uppercase">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="hover:text-primary">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}