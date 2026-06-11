import type { CartItem } from "./cart-context";

export type CheckoutInfo = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
};

export function buildWhatsAppUrl(items: CartItem[], info: CheckoutInfo, total: number) {
  const lines: string[] = [];
  lines.push("====================================");
  lines.push("🛒 NEW ORDER");
  lines.push("");
  lines.push("Customer Name:");
  lines.push(info.fullName);
  lines.push("");
  lines.push("Phone:");
  lines.push(info.phone);
  lines.push("");
  lines.push("Address:");
  lines.push(info.address);
  lines.push("");
  lines.push("City:");
  lines.push(info.city);
  lines.push("");
  lines.push("Notes:");
  lines.push(info.notes || "-");
  lines.push("");
  lines.push("Products:");
  items.forEach((i, idx) => lines.push(`${idx + 1}. ${i.product.name}`));
  lines.push("");
  lines.push("Sizes:");
  items.forEach((i, idx) => lines.push(`${idx + 1}. ${i.size} / ${i.color}`));
  lines.push("");
  lines.push("Quantities:");
  items.forEach((i, idx) => lines.push(`${idx + 1}. x${i.quantity} — ${((i.product.salePrice ?? i.product.price) * i.quantity).toFixed(2)} EGP`));
  lines.push("");
  lines.push(`Total:`);
  lines.push(`${total.toFixed(2)} EGP`);
  lines.push("====================================");

  return `https://wa.me/201104840113?text=${encodeURIComponent(lines.join("\n"))}`;
}