import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventPackPage() {
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
            <div>
              <h3 className="text-xl font-semibold mb-2">Custom QR Codes</h3>
              <p>
                Each bracelet comes with a scannable QR code that links to
                individual or group profiles, emergency contacts, or event
                check-ins.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Color & Logo Options
              </h3>
              <p>
                Choose your brand colors or event theme. Add your logo for a
                professional, cohesive identity across all attendees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Bulk Discounts</h3>
              <p>
                Special pricing available for orders of 100+ units. The more you
                order, the more you save.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Durable & Waterproof
              </h3>
              <p>
                Designed to last through full-day events, outdoor activities,
                and even poolside fun.
              </p>
            </div>
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
            <div>
              <h4 className="font-semibold text-lg mb-2">School Field Trips</h4>
              <p className="text-sm text-gray-700">
                Easily identify students and access emergency contact info in
                seconds.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Theme Parks & Camps
              </h4>
              <p className="text-sm text-gray-700">
                Quickly reunite lost kids with guardians and enable fast
                check-ins.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Community Festivals
              </h4>
              <p className="text-sm text-gray-700">
                Organize large groups, enable digital interaction, and promote
                your event brand.
              </p>
            </div>
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
