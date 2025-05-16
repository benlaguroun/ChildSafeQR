import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BasicQRBraceletPage() {
  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
          <QrCode className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Basic QR Bracelet</h1>
        <p className="text-lg text-gray-600 mb-6">
          Peace of mind in a simple design. Our Basic QR Bracelet includes a
          static QR code linking to your child’s guardian contact info. It's
          waterproof, lightweight, and ideal for everyday use.
        </p>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto text-gray-700 space-y-2">
            <li>Durable and water-resistant silicone band</li>
            <li>Static QR code (no batteries needed)</li>
            <li>Links to guardian contact page instantly</li>
            <li>Customizable contact details</li>
            <li>Ideal for parks, trips, or everyday wear</li>
          </ul>
        </div>

        <Button size="lg" className="text-lg px-8 py-6">
          Order Now
        </Button>

        <div className="mt-6">
          <Link href="/page">
            <span className="text-blue-600 hover:underline">
              ← Back to all products
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
