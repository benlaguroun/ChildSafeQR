import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function BasicQRBraceletPage() {
  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/images/basic-qr-bracelet.png" // Replace with your image path
            alt="Basic QR Bracelet"
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-contain"
          />
        </div>

        {/* Product Info Section */}
        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 p-4">
            <QrCode className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Basic QR Bracelet</h1>

          <p className="text-lg text-gray-600 mb-6">
            Peace of mind in a simple design. Our Basic QR Bracelet includes a
            static QR code linking to your child’s guardian contact info. It's
            waterproof, lightweight, and ideal for everyday use.
          </p>

          {/* Features */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Durable and water-resistant silicone band</li>
              <li>Static QR code (no batteries needed)</li>
              <li>Links to guardian contact page instantly</li>
              <li>Customizable contact details</li>
              <li>Ideal for parks, trips, or everyday wear</li>
            </ul>
          </div>

          {/* Product Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <select className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto">
              <option>Choose Size</option>
              <option>Small (Kids)</option>
              <option>Medium</option>
              <option>Large</option>
            </select>

            <input
              type="number"
              min={1}
              defaultValue={1}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-24"
            />

            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to Cart
            </Button>
          </div>

          <p className="text-xl font-semibold text-gray-800 mb-4">$9.99</p>

          <Link href="/page" className="text-blue-600 hover:underline">
            ← Back to all products
          </Link>
        </div>
      </div>
    </section>
  );
}
