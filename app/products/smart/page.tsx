import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SmartBraceletPage() {
  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-100 p-4">
          <Bell className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Smart Bracelet</h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay connected and alert in real-time. The Smart Bracelet combines NFC
          and QR technology to instantly notify you when your child’s bracelet
          is scanned—anytime, anywhere.
        </p>

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

        <Button size="lg" className="text-lg px-8 py-6">
          Pre-Order Now
        </Button>

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
