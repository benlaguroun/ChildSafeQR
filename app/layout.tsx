import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import HeaderMenu from "@/components/HeaderMenu";
import { usePathname } from "next/navigation";
import ClientOnlyHeader from "@/components/ClientOnlyHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Child Safety QR",
  description: "Protect your child with a QR safety bracelet",
  generator: "mohamed ben",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderWrapper />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// This client-side wrapper handles conditional rendering of the header
function HeaderWrapper() {
  // Must be a separate client component to use `usePathname`
  return <ClientOnlyHeader />;
}
