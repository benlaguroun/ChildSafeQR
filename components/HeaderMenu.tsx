"use client";

import Link from "next/link";
import { QrCode, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <QrCode className="h-6 w-6" />
          <Link href="/">ChildSafeQR</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Support
          </Link>
          <Link href="/login" className="hover:text-blue-600 transition">
            Login
          </Link>
          <Link href="/signup" className="hover:text-blue-600 transition">
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-sm border-t px-4 py-4 space-y-4 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Products
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Support
          </Link>
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
