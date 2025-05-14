"use client"

import { useEffect, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Users, History, Bell, MapPin, ShieldAlert, Shield, MapIcon } from "lucide-react"
import { getScanRecords } from "@/lib/scan-actions"
import { getSafeZones } from "@/lib/safe-zone-actions"
import type { SafeZone } from "@/types/safe-zones"

interface ScanRecord {
  id: string
  childId: string
  childName: string
  timestamp: string
  location: {
    coordinates: {
      lat: number
      lng: number
    }
    name: string
  } | null
  safetyStatus?: {
    isSafe: boolean
    nearestZoneName?: string
    distance?: number
  }
}

export default function DashboardPage() {
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([])
  const [safeZones, setSafeZones] = useState<SafeZone[]>([])
  const [isLoadingScans, setIsLoadingScans] = useState(true)
  const [isLoadingZones, setIsLoadingZones] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [records, zones] = await Promise.all([getScanRecords(), getSafeZones()])
        setRecentScans(records.slice(0, 3)) // Get the 3 most recent scans
        setSafeZones(zones)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoadingScans(false)
        setIsLoadingZones(false)
      }
    }

    loadData()
  }, [])

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp)
    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      time: format(date, "h:mm a"),
    }
  }

  // Count alerts (scans outside safe zones)
  const alertCount = recentScans.filter((scan) => scan.safetyStatus && !scan.safetyStatus.isSafe).length

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, Sarah</h1>
        <p className="text-muted-foreground">Manage your children's safety QR codes</p>
      </div>

      {alertCount > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-red-100 p-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-red-800">Alert: QR Code Scanned Outside Safe Zone</h3>
              <p className="mt-1 text-sm text-red-700">
                {alertCount === 1
                  ? "There is 1 recent scan outside of designated safe zones."
                  : `There are ${alertCount} recent scans outside of designated safe zones.`}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2 border-red-300 bg-red-100 hover:bg-red-200">
                <Link href="/dashboard/scan-logs?filter=outside">View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/dashboard/add-child">
                  <PlusCircle className="h-4 w-4" />
                  Add a new child
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/dashboard/safe-zones">
                  <MapIcon className="h-4 w-4" />
                  Manage safe zones
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/dashboard/scan-logs">
                  <History className="h-4 w-4" />
                  View scan history
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Scans</CardTitle>
            <CardDescription>QR code scan activity</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingScans ? (
              <div className="flex justify-center py-8">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              </div>
            ) : recentScans.length > 0 ? (
              recentScans.map((scan) => (
                <div key={scan.id} className="mb-3 flex items-start gap-3 rounded-md border p-3 last:mb-0">
                  <div
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                      scan.safetyStatus && !scan.safetyStatus.isSafe
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {scan.safetyStatus && !scan.safetyStatus.isSafe ? (
                      <ShieldAlert className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {scan.childName}'s QR was scanned
                      {scan.safetyStatus && !scan.safetyStatus.isSafe && (
                        <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          Outside Zone
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(scan.timestamp).relative} • {formatTimestamp(scan.timestamp).time}
                    </p>
                    {scan.location && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{scan.location.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No recent scans</p>
              </div>
            )}

            {recentScans.length > 0 && (
              <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                <Link href="/dashboard/scan-logs">View all scan logs</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Safe Zones</CardTitle>
            <CardDescription>Designated safe areas for your children</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingZones ? (
              <div className="flex justify-center py-8">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              </div>
            ) : safeZones.length > 0 ? (
              <>
                {safeZones.slice(0, 3).map((zone) => (
                  <div key={zone.id} className="mb-3 flex items-center gap-3 rounded-md border p-3 last:mb-0">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${getZoneTypeColor(zone.type)}`}
                    >
                      {getZoneTypeIcon(zone.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-muted-foreground">{zone.address}</p>
                    </div>
                    <div className="flex h-6 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
                      <Shield className="mr-1 h-3 w-3" />
                      Active
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                  <Link href="/dashboard/safe-zones">Manage safe zones</Link>
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="mb-2 text-muted-foreground">No safe zones defined</p>
                <Button asChild size="sm">
                  <Link href="/dashboard/safe-zones">Add Safe Zone</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getZoneTypeColor(type: string): string {
  switch (type) {
    case "home":
      return "bg-blue-100 text-blue-600"
    case "school":
      return "bg-green-100 text-green-600"
    case "park":
      return "bg-emerald-100 text-emerald-600"
    case "store":
      return "bg-purple-100 text-purple-600"
    default:
      return "bg-slate-100 text-slate-600"
  }
}

function getZoneTypeIcon(type: string) {
  switch (type) {
    case "home":
      return <Users className="h-4 w-4" />
    case "school":
      return <Users className="h-4 w-4" />
    case "park":
      return <MapPin className="h-4 w-4" />
    case "store":
      return <MapPin className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}
