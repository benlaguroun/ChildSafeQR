"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, AlertTriangle, MapPin, Shield, ShieldAlert } from "lucide-react"
import { LocationMap } from "@/components/location-map"
import { recordScan } from "@/lib/scan-actions"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationName, setLocationName] = useState<string>("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [notificationSent, setNotificationSent] = useState(false)
  const [safetyStatus, setSafetyStatus] = useState<{
    isSafe: boolean
    nearestZoneName?: string
    distance?: number
  } | null>(null)

  // In a real app, you would fetch the child's data based on the ID
  const childData = {
    id: params.id,
    name: "Emma",
    hasPhoto: true,
    message: "If you found this child, please call the number below",
    emergencyContact: "Sarah (Parent)",
    emergencyPhone: "+1 (555) 123-4567",
  }

  useEffect(() => {
    // Request geolocation permission and get coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })

          try {
            // Reverse geocoding to get human-readable address
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { headers: { "Accept-Language": "en" } },
            )
            const data = await response.json()

            // Format the location name
            const address = data.address
            let locationString = ""

            if (address.road) {
              locationString += address.road
              if (address.house_number) {
                locationString = address.house_number + " " + locationString
              }
            }

            if (address.city || address.town || address.village) {
              const locality = address.city || address.town || address.village
              if (locationString) locationString += ", "
              locationString += locality
            }

            if (!locationString && address.county) {
              locationString = address.county
            }

            setLocationName(locationString || "Unknown location")

            // Record the scan with location data
            const scanResult = await recordScan({
              childId: childData.id,
              childName: childData.name,
              timestamp: new Date().toISOString(),
              location: {
                coordinates: { lat: latitude, lng: longitude },
                name: locationString || "Unknown location",
              },
            })

            // Set safety status from scan result
            if (scanResult.safetyStatus) {
              setSafetyStatus(scanResult.safetyStatus)
            }

            setNotificationSent(true)
          } catch (error) {
            console.error("Error getting location name:", error)
            setLocationName("Unknown location")

            // Still record the scan even if reverse geocoding fails
            const scanResult = await recordScan({
              childId: childData.id,
              childName: childData.name,
              timestamp: new Date().toISOString(),
              location: {
                coordinates: { lat: latitude, lng: longitude },
                name: "Unknown location",
              },
            })

            // Set safety status from scan result
            if (scanResult.safetyStatus) {
              setSafetyStatus(scanResult.safetyStatus)
            }

            setNotificationSent(true)
          }

          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Geolocation error:", error)
          setLocationError("Could not access your location. Please enable location services.")
          setIsLoadingLocation(false)

          // Record the scan without location data
          recordScan({
            childId: childData.id,
            childName: childData.name,
            timestamp: new Date().toISOString(),
            location: null,
          }).then((scanResult) => {
            setNotificationSent(true)
          })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setLocationError("Geolocation is not supported by your browser")
      setIsLoadingLocation(false)

      // Record the scan without location data
      recordScan({
        childId: childData.id,
        childName: childData.name,
        timestamp: new Date().toISOString(),
        location: null,
      }).then((scanResult) => {
        setNotificationSent(true)
      })
    }
  }, [childData.id, childData.name])

  return (
    <div className="flex min-h-screen flex-col bg-blue-50 p-4">
      <div className="container mx-auto max-w-md">
        <Card className="overflow-hidden">
          <div className="bg-blue-600 p-4 text-center text-white">
            <h1 className="text-2xl font-bold">Child Safety Profile</h1>
          </div>

          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              {childData.hasPhoto ? (
                <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt={childData.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50 text-4xl font-bold text-blue-600">
                  {childData.name[0]}
                </div>
              )}

              <h2 className="mb-6 text-2xl font-bold">{childData.name}</h2>

              {childData.message && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-amber-50 p-4 text-amber-700">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p>{childData.message}</p>
                </div>
              )}

              <div className="mb-6 w-full rounded-lg border p-4">
                <p className="mb-1 font-medium">Emergency Contact:</p>
                <p className="text-muted-foreground">{childData.emergencyContact}</p>
              </div>

              <Button className="w-full gap-2 mb-6" size="lg">
                <Phone className="h-5 w-5" />
                Call {childData.emergencyPhone}
              </Button>

              {/* Location information */}
              <div className="w-full mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Your Current Location</h3>
                </div>

                {isLoadingLocation ? (
                  <div className="text-center py-4">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Getting your location...</p>
                  </div>
                ) : locationError ? (
                  <div className="rounded-lg bg-red-50 p-3 text-red-700 text-sm">
                    <p>{locationError}</p>
                    <p className="mt-1">The parent will still be notified that you scanned this QR code.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-3">{locationName}</p>
                    {location && (
                      <div className="h-40 w-full overflow-hidden rounded-lg border">
                        <LocationMap location={location} />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Safety status */}
              {safetyStatus && (
                <div
                  className={`w-full mb-6 rounded-lg p-4 flex items-start gap-3 ${
                    safetyStatus.isSafe ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {safetyStatus.isSafe ? (
                    <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {safetyStatus.isSafe
                        ? `This location is within a safe zone (${safetyStatus.nearestZoneName})`
                        : "This location is outside of designated safe zones"}
                    </p>
                    {!safetyStatus.isSafe && safetyStatus.nearestZoneName && (
                      <p className="text-sm">
                        Nearest safe zone: {safetyStatus.nearestZoneName}{" "}
                        {safetyStatus.distance && `(${Math.round(safetyStatus.distance)}m away)`}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                className={`w-full rounded-lg p-4 text-center ${
                  safetyStatus && !safetyStatus.isSafe
                    ? "bg-red-50 text-red-700 font-medium"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {notificationSent ? (
                  <p className="text-sm">
                    <span className="font-medium">Alert sent!</span> {childData.name}'s parent has been notified that
                    you scanned this QR code
                    {location ? " with your location" : ""}.
                    {safetyStatus && !safetyStatus.isSafe && " This is outside of designated safe zones."}
                  </p>
                ) : (
                  <p className="text-sm">
                    <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500 mr-1"></span>
                    Sending alert notification to {childData.name}'s parent...
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Powered by ChildSafeQR • A child safety service
        </p>
      </div>
    </div>
  )
}
