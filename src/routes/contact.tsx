import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — El Nazer Sportswear" }, { name: "description", content: "Get in touch with El Nazer Sportswear." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl font-black mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">We'd love to hear from you. Reach us via WhatsApp for fastest reply.</p>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a href="https://wa.me/201104840113" className="p-4 border border-border rounded-lg flex items-center gap-3 hover:border-primary">
          <Phone className="h-6 w-6 text-primary" /><div><p className="font-bold text-sm">WhatsApp</p><p className="text-xs text-muted-foreground">+20 110 484 0113</p></div>
        </a>
        <div className="p-4 border border-border rounded-lg flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" /><div><p className="font-bold text-sm">Email</p><p className="text-xs text-muted-foreground">info@elnazer.com</p></div>
        </div>
        <div className="p-4 border border-border rounded-lg flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" /><div><p className="font-bold text-sm">Address</p><p className="text-xs text-muted-foreground">Cairo, Egypt</p></div>
        </div>
      </div>
    </div>
  );
}