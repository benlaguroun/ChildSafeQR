"use client";

import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/useCart";

const products = [
  {
    id: "event-pack-10",
    name: "10-Pack Event Bracelets",
    image: "/products/event-pack-10.jpg",
    price: 29.99,
  },
  {
    id: "event-pack-50",
    name: "50-Pack Event Bracelets",
    image: "/products/event-pack-50.jpg",
    price: 129.99,
  },
  {
    id: "event-pack-100",
    name: "100-Pack Event Bracelets",
    image: "/products/event-pack-100.jpg",
    price: 229.99,
  },
];

export default function EventPackPage() {
  const { addToCart } = useCart(); // assumes useCart has addToCart(item)

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center bg-yellow-100 p-4 rounded-full mb-6">
            <QrCode className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Event Pack Bracelets</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Perfect for schools, parks, or large public events. Keep every child
            or participant easily identifiable and secure with customizable,
            scannable bracelets.
          </p>
          <div className="mt-6">
            <Button size="lg" className="text-lg px-8 py-6">
              Request a Bulk Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Event Packs?
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              [
                "Custom QR Codes",
                "Each bracelet comes with a scannable QR code...",
              ],
              [
                "Color & Logo Options",
                "Choose your brand colors or event theme...",
              ],
              [
                "Bulk Discounts",
                "Special pricing available for orders of 100+ units...",
              ],
              [
                "Durable & Waterproof",
                "Designed to last through full-day events...",
              ],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Order Your Pack
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-xl overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700 text-md">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-yellow-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perfect for Every Occasion
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              ["School Field Trips", "Easily identify students..."],
              ["Theme Parks & Camps", "Quickly reunite lost kids..."],
              ["Community Festivals", "Organize large groups..."],
            ].map(([title, desc]) => (
              <div key={title}>
                <h4 className="font-semibold text-lg mb-2">{title}</h4>
                <p className="text-sm text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Start your bulk order today or reach out to customize your Event
            Pack based on your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Get a Custom Quote
            </Button>
            <Link href="/products">
              <Button variant="outline" size="lg">
                Explore Other Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
