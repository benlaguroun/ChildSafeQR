"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Branding & Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-2 text-blue-600">
            Child Safety QR
          </h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Safety bracelets for kids with QR & NFC technology. Give parents
            peace of mind.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-600 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 transition">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA & Social */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full">Create Account</Button>
            </Link>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Follow us</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="#" className="hover:text-blue-600 transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-sky-500 transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Child Safety QR. All rights reserved.
      </div>
    </footer>
  );
}
