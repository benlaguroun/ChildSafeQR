"use client";

import { useEffect, useRef, useState } from "react";

interface SafeZoneMapProps {
  center: {
    lat: number;
    lng: number;
  };
  radius: number;
  interactive?: boolean;
  onLocationSelect?: (
    location: { lat: number; lng: number },
    address: string
  ) => void;
}

export function SafeZoneMap({
  center,
  radius,
  interactive = false,
  onLocationSelect,
}: SafeZoneMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // Load the Leaflet library dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      // Load Leaflet JS if not already loaded
      if (!window.L) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.integrity =
          "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        script.crossOrigin = "";
        script.async = true;

        const loadPromise = new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });

        document.head.appendChild(script);
        await loadPromise;
      }

      return window.L;
    };

    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const L = await loadLeaflet();
        setIsMapReady(true);

        // Initialize map if not already initialized
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapRef.current).setView(
            [center.lat, center.lng],
            15
          );

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstanceRef.current);

          // Add marker
          markerRef.current = L.marker([center.lat, center.lng]).addTo(
            mapInstanceRef.current
          );

          // Add circle for the safe zone radius
          circleRef.current = L.circle([center.lat, center.lng], {
            radius: radius,
            color: "#3b82f6",
            fillColor: "#93c5fd",
            fillOpacity: 0.3,
          }).addTo(mapInstanceRef.current);

          // Add click handler if interactive
          if (interactive && onLocationSelect) {
            mapInstanceRef.current.on("click", async (e: any) => {
              const { lat, lng } = e.latlng;

              // Update marker and circle
              markerRef.current.setLatLng([lat, lng]);
              circleRef.current.setLatLng([lat, lng]);

              // Get address from coordinates using Nominatim
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                  { headers: { "Accept-Language": "en" } }
                );
                const data = await response.json();

                // Format the address
                const address = data.address;
                let locationString = "";

                if (address.road) {
                  locationString += address.road;
                  if (address.house_number) {
                    locationString =
                      address.house_number + " " + locationString;
                  }
                }

                if (address.city || address.town || address.village) {
                  const locality =
                    address.city || address.town || address.village;
                  if (locationString) locationString += ", ";
                  locationString += locality;
                }

                if (!locationString && address.county) {
                  locationString = address.county;
                }

                onLocationSelect(
                  { lat, lng },
                  locationString || "Unknown location"
                );
              } catch (error) {
                console.error("Error getting location name:", error);
                onLocationSelect({ lat, lng }, "Unknown location");
              }
            });
          }
        } else {
          // Update existing map view, marker and circle
          mapInstanceRef.current.setView([center.lat, center.lng], 15);
          markerRef.current.setLatLng([center.lat, center.lng]);
          circleRef.current.setLatLng([center.lat, center.lng]);
          circleRef.current.setRadius(radius);
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
        circleRef.current = null;
      }
    };
  }, [center, radius, interactive, onLocationSelect]);

  // Update circle radius when radius prop changes
  useEffect(() => {
    if (isMapReady && circleRef.current) {
      circleRef.current.setRadius(radius);
    }
  }, [radius, isMapReady]);

  return <div ref={mapRef} className="h-full w-full" />;
}
