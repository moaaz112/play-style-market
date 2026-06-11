import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center font-black text-primary-foreground text-xl italic">Z</div>
            <span className="font-bold tracking-wider">EL NAZER</span>
          </div>
          <p className="text-sm text-white/60">Egypt's home for premium football jerseys, basketball gear and sportswear.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/category/football">Football Jerseys</Link></li>
            <li><Link to="/category/basketball">Basketball</Link></li>
            <li><Link to="/category/shoes">Shoes</Link></li>
            <li><Link to="/category/accessories">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Help</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="TikTok" className="h-9 w-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center"><Music2 className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} El Nazer Sportswear. All rights reserved.
      </div>
    </footer>
  );
}