"use client"

import { useEffect, useRef } from "react"

interface LocationMapProps {
  location: {
    lat: number
    lng: number
  }
  zoom?: number
}

export function LocationMap({ location, zoom = 15 }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    // Load the Leaflet library dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }

      // Load Leaflet JS if not already loaded
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""
        script.async = true

        const loadPromise = new Promise<void>((resolve) => {
          script.onload = () => resolve()
        })

        document.head.appendChild(script)
        await loadPromise
      }

      return window.L
    }

    const initMap = async () => {
      if (!mapRef.current) return

      try {
        const L = await loadLeaflet()

        // Initialize map if not already initialized
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = L.map(mapRef.current).setView([location.lat, location.lng], zoom)

          // Add OpenStreetMap tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstanceRef.current)

          // Add marker
          markerRef.current = L.marker([location.lat, location.lng]).addTo(mapInstanceRef.current)
        } else {
          // Update existing map view and marker
          mapInstanceRef.current.setView([location.lat, location.lng], zoom)
          markerRef.current.setLatLng([location.lat, location.lng])
        }
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    initMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  }, [location, zoom])

  return <div ref={mapRef} className="h-full w-full" />
}
