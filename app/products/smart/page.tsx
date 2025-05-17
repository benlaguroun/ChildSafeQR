"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/store/useCart";

export default function SmartBraceletPage() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = {
    id: "smart-bracelet-001",
    name: "Smart Bracelet",
    price: 39.99,
    image:
      "https://i.pinimg.com/736x/6d/e0/b2/6de0b2eeb5eb6a7b6a092b701228963c.jpg",
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-100 p-4">
          <Bell className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay connected and alert in real-time. The Smart Bracelet combines NFC
          and QR technology to instantly notify you when your child’s bracelet
          is scanned—anytime, anywhere.
        </p>

        {/* Product Image */}
        <div className="mb-8">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-700 space-y-2">
            <li>NFC + QR scanning technology</li>
            <li>Real-time alerts to guardian devices</li>
            <li>Cloud-linked contact and medical info</li>
            <li>Rechargeable with 7-day battery life</li>
            <li>Comfortable, adjustable silicone strap</li>
          </ul>
        </div>

        {/* Pricing and Add to Cart */}
        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-900 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex justify-center items-center space-x-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded text-center"
            />
            <Button
              size="lg"
              className="text-lg px-6 py-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/products">
            <span className="text-green-600 hover:underline">
              ← Back to all products
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
