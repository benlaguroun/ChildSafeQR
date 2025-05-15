import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, QrCode, MapPin, Bell } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <QrCode className="h-6 w-6 text-blue-500" />
            <span>ChildSafeQR</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium hover:underline"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Protect Your Child with a{" "}
              <span className="text-blue-600">QR Safety Bracelet</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A simple, effective way to keep your children safe. Generate a
              unique QR code that links to emergency contact information.
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <QrCode className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    1. Create a QR Code
                  </h3>
                  <p className="text-muted-foreground">
                    Register your child and generate a unique QR code with their
                    information.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    2. Attach to Bracelet
                  </h3>
                  <p className="text-muted-foreground">
                    Print the QR code and attach it to your child's bracelet or
                    clothing.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <Bell className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    3. Get Instant Alerts
                  </h3>
                  <p className="text-muted-foreground">
                    Receive immediate notifications when someone scans your
                    child's QR code.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Product Versions
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 border-blue-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-blue-100 p-3">
                    <QrCode className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Basic QR Bracelet</h3>
                  <p className="text-muted-foreground mb-4">
                    Static QR code with guardian contact info, simple and
                    reliable.
                  </p>
                  <Link href="/products/basic">
                    <Button variant="outline">See Details</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <Bell className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Bracelet</h3>
                  <p className="text-muted-foreground mb-4">
                    NFC + QR scan with real-time alerts when the bracelet is
                    scanned.
                  </p>
                  <Link href="/products/smart">
                    <Button variant="outline">See Details</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-red-100 p-3">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Medical Alert</h3>
                  <p className="text-muted-foreground mb-4">
                    Includes important allergy or medical data in case of
                    emergencies.
                  </p>
                  <Link href="/products/medical">
                    <Button variant="outline">See Details</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-100">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-yellow-100 p-3">
                    <QrCode className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Event Pack</h3>
                  <p className="text-muted-foreground mb-4">
                    Bulk-customized bracelets for schools, parks, or public
                    events.
                  </p>
                  <Link href="/products/event-pack">
                    <Button variant="outline">See Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to protect your child?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of parents who trust ChildSafeQR to help keep their
              children safe.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Create Your Free Account</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
