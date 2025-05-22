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
          <Link href="/" className="hover:underline">
            ChildSafeQR
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Support</NavLink>
          <Link
            href="/login"
            className="px-4 py-1 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-6 space-y-4 text-sm font-medium text-gray-700 text-center shadow-md">
          <MobileLink href="/" onClick={() => setMenuOpen(false)}>
            Home
          </MobileLink>
          <MobileLink href="/products" onClick={() => setMenuOpen(false)}>
            Products
          </MobileLink>
          <MobileLink href="/about" onClick={() => setMenuOpen(false)}>
            About
          </MobileLink>
          <MobileLink href="/contact" onClick={() => setMenuOpen(false)}>
            Support
          </MobileLink>
          <MobileLink
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-blue-600"
          >
            Login
          </MobileLink>
          <MobileLink
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full block"
          >
            Sign Up
          </MobileLink>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-gray-700 hover:text-blue-600 transition">
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block hover:text-blue-600 transition ${className}`}
    >
      {children}
    </Link>
  );
}
