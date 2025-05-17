"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/store/useCart";

export default function MedicalAlertPage() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = {
    id: "medical-alert-001",
    name: "Medical Alert Bracelet",
    price: 24.99,
    image:
      "https://i.pinimg.com/736x/24/fa/e4/24fae4f0e056ac31b20fd0a486eb74ca.jpg",
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
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-red-100 p-4">
          <MapPin className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-6">
          In emergencies, every second counts. Our Medical Alert Bracelet makes
          crucial allergy and medical data instantly accessible to responders,
          ensuring your child gets the right care, fast.
        </p>

        {/* Image */}
        <div className="mb-8">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Key Benefits</h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-700 space-y-2">
            <li>Instant access to allergy & medical information</li>
            <li>Secure and tamper-proof QR technology</li>
            <li>Customizable for specific medical conditions</li>
            <li>Visible "Medical Alert" icon for quick identification</li>
            <li>Durable, waterproof, and kid-friendly design</li>
          </ul>
        </div>

        {/* Add to Cart */}
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
            <span className="text-red-600 hover:underline">
              ← Back to all products
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
