"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Child {
  id: number;
  name: string;
  avatarUrl?: string;
  qrCodeUrl?: string;
}

export default function MyChildrenPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Simulated fetch from localStorage or API call
    const storedChildren =
      typeof window !== "undefined" ? localStorage.getItem("myChildren") : null;

    if (storedChildren) {
      try {
        const parsed = JSON.parse(storedChildren);
        setChildren(parsed);
      } catch (error) {
        console.error("Failed to parse children data:", error);
      }
    } else {
      // fallback or fetch from API
      setChildren([
        {
          id: 1,
          name: "Ali",
          avatarUrl: "/avatars/ali.png",
          qrCodeUrl: "/qrcodes/ali.png",
        },
        {
          id: 2,
          name: "Sara",
          avatarUrl: "/avatars/sara.png",
          qrCodeUrl: "/qrcodes/sara.png",
        },
      ]);
    }
  }, []);

  if (!isClient) {
    return null; // prevent SSR from trying to access window
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Children</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-lg shadow p-4 dark:bg-gray-800"
          >
            <div className="flex items-center space-x-4">
              {child.avatarUrl && (
                <Image
                  src={child.avatarUrl}
                  alt={`${child.name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{child.name}</h2>
                <Link href={`/dashboard/child/${child.id}`}>
                  <span className="text-blue-500 hover:underline text-sm">
                    View Profile
                  </span>
                </Link>
              </div>
            </div>

            {child.qrCodeUrl && (
              <div className="mt-4">
                <Image
                  src={child.qrCodeUrl}
                  alt={`${child.name}'s QR Code`}
                  width={128}
                  height={128}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
