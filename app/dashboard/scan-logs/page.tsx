"use client"

import { useEffect, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MapPin, Clock, ExternalLink, Shield, ShieldAlert } from "lucide-react"
import { getScanRecords } from "@/lib/scan-actions"
import { LocationMap } from "@/components/location-map"

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

export default function ScanLogsPage() {
  const [scanLogs, setScanLogs] = useState<ScanRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null)

  useEffect(() => {
    async function loadScanLogs() {
      try {
        const records = await getScanRecords()
        setScanLogs(records)
      } catch (error) {
        console.error("Error loading scan logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadScanLogs()
  }, [])

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp)
    return {
      date: format(date, "MMM d, yyyy"),
      time: format(date, "h:mm a"),
      relative: formatDistanceToNow(date, { addSuffix: true }),
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Scan Logs</h1>
        <p className="text-muted-foreground">View when and where your QR codes were scanned</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Scans</TabsTrigger>
          <TabsTrigger value="emma">Emma</TabsTrigger>
          <TabsTrigger value="noah">Noah</TabsTrigger>
          <TabsTrigger value="outside">Outside Safe Zones</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ScanLogsList
            scanLogs={scanLogs}
            isLoading={isLoading}
            selectedScan={selectedScan}
            setSelectedScan={setSelectedScan}
          />
        </TabsContent>

        <TabsContent value="emma">
          <ScanLogsList
            scanLogs={scanLogs.filter((log) => log.childName === "Emma")}
            isLoading={isLoading}
            selectedScan={selectedScan}
            setSelectedScan={setSelectedScan}
          />
        </TabsContent>

        <TabsContent value="noah">
          <ScanLogsList
            scanLogs={scanLogs.filter((log) => log.childName === "Noah")}
            isLoading={isLoading}
            selectedScan={selectedScan}
            setSelectedScan={setSelectedScan}
          />
        </TabsContent>

        <TabsContent value="outside">
          <ScanLogsList
            scanLogs={scanLogs.filter((log) => log.safetyStatus && !log.safetyStatus.isSafe)}
            isLoading={isLoading}
            selectedScan={selectedScan}
            setSelectedScan={setSelectedScan}
          />
        </TabsContent>
      </Tabs>

      {selectedScan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Scan Details</CardTitle>
            <CardDescription>
              {selectedScan.childName}'s QR code was scanned {formatTimestamp(selectedScan.timestamp).relative}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium">Scan Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">
                        {formatTimestamp(selectedScan.timestamp).date} at {formatTimestamp(selectedScan.timestamp).time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{selectedScan.location?.name || "Location not available"}</p>
                    </div>
                  </div>

                  {selectedScan.safetyStatus && (
                    <div
                      className={`flex items-start gap-2 rounded-md p-2 ${
                        selectedScan.safetyStatus.isSafe ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      {selectedScan.safetyStatus.isSafe ? (
                        <Shield className="mt-0.5 h-4 w-4 text-green-600" />
                      ) : (
                        <ShieldAlert className="mt-0.5 h-4 w-4 text-red-600" />
                      )}
                      <div>
                        <p className={selectedScan.safetyStatus.isSafe ? "text-green-700" : "text-red-700"}>
                          {selectedScan.safetyStatus.isSafe
                            ? `Within safe zone: ${selectedScan.safetyStatus.nearestZoneName}`
                            : "Outside of safe zones"}
                        </p>
                        {!selectedScan.safetyStatus.isSafe && selectedScan.safetyStatus.nearestZoneName && (
                          <p className="text-muted-foreground">
                            Nearest zone: {selectedScan.safetyStatus.nearestZoneName}{" "}
                            {selectedScan.safetyStatus.distance &&
                              `(${Math.round(selectedScan.safetyStatus.distance)}m away)`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedScan.location && (
                    <div className="flex items-center gap-2 text-blue-600 hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${selectedScan.location.coordinates.lat},${selectedScan.location.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View in Google Maps
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {selectedScan.location && (
                <div className="h-48 overflow-hidden rounded-lg border">
                  <LocationMap location={selectedScan.location.coordinates} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ScanLogsListProps {
  scanLogs: ScanRecord[]
  isLoading: boolean
  selectedScan: ScanRecord | null
  setSelectedScan: (scan: ScanRecord | null) => void
}

function ScanLogsList({ scanLogs, isLoading, selectedScan, setSelectedScan }: ScanLogsListProps) {
  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp)
    return {
      date: format(date, "MMM d, yyyy"),
      time: format(date, "h:mm a"),
      relative: formatDistanceToNow(date, { addSuffix: true }),
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (scanLogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-3">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No scan logs yet</h3>
            <p className="text-sm text-muted-foreground">
              When someone scans your child's QR code, the activity will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>When someone scans your child's QR code, it will appear here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scanLogs.map((log) => (
            <div
              key={log.id}
              className={`flex gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                selectedScan?.id === log.id ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"
              }`}
              onClick={() => setSelectedScan(log.id === selectedScan?.id ? null : log)}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  log.safetyStatus && !log.safetyStatus.isSafe ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}
              >
                {log.safetyStatus && !log.safetyStatus.isSafe ? (
                  <ShieldAlert className="h-5 w-5" />
                ) : (
                  <Bell className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">
                    {log.childName}'s QR was scanned
                    {log.safetyStatus && !log.safetyStatus.isSafe && (
                      <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        Outside Safe Zone
                      </span>
                    )}
                  </h3>
                  <span className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp).relative}</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatTimestamp(log.timestamp).time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{log.location?.name || "Location not available"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
