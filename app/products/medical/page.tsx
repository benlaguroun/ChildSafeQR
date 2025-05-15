import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MedicalAlertPage() {
  return (
    <section className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-red-100 p-4">
          <MapPin className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Medical Alert Bracelet</h1>
        <p className="text-lg text-gray-600 mb-6">
          In emergencies, every second counts. Our Medical Alert Bracelet makes
          crucial allergy and medical data instantly accessible to responders,
          ensuring your child gets the right care, fast.
        </p>

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

        <Button size="lg" className="text-lg px-8 py-6">
          Get Yours Today
        </Button>

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
