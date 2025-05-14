"use client"

import { checkLocationSafety } from "./safe-zone-actions"

// This is a client-side mock of what would normally be a server action
// In a real app, this would be a server action that stores data in a database

interface ScanLocation {
  coordinates: {
    lat: number
    lng: number
  }
  name: string
}

interface ScanRecord {
  id: string
  childId: string
  childName: string
  timestamp: string
  location: ScanLocation | null
  safetyStatus?: {
    isSafe: boolean
    nearestZoneName?: string
    distance?: number
  }
}

// In-memory storage for scan records (this would be a database in a real app)
let scanRecords: ScanRecord[] = [
  {
    id: "scan1",
    childId: "abc123",
    childName: "Emma",
    timestamp: "2023-05-12T14:34:00.000Z",
    location: {
      coordinates: { lat: 40.7812, lng: -73.9665 },
      name: "Central Park, New York",
    },
    safetyStatus: {
      isSafe: false,
      nearestZoneName: "Home",
      distance: 1200,
    },
  },
  {
    id: "scan2",
    childId: "def456",
    childName: "Noah",
    timestamp: "2023-05-11T17:12:00.000Z",
    location: {
      coordinates: { lat: 40.758, lng: -73.9855 },
      name: "School, 123 Education St",
    },
    safetyStatus: {
      isSafe: true,
      nearestZoneName: "School",
      distance: 150,
    },
  },
  {
    id: "scan3",
    childId: "abc123",
    childName: "Emma",
    timestamp: "2023-05-10T15:45:00.000Z",
    location: {
      coordinates: { lat: 40.7527, lng: -73.9772 },
      name: "Library, 456 Reading Ave",
    },
    safetyStatus: {
      isSafe: false,
      nearestZoneName: "Home",
      distance: 850,
    },
  },
]

interface ScanData {
  childId: string
  childName: string
  timestamp: string
  location: ScanLocation | null
}

export async function recordScan(data: ScanData): Promise<ScanRecord> {
  // Generate a unique ID for the scan
  const scanId = `scan${Date.now()}`

  // Create the scan record
  const scanRecord: ScanRecord = {
    id: scanId,
    ...data,
  }

  // Check if the location is within any safe zones
  if (data.location) {
    try {
      const safetyCheck = await checkLocationSafety(data.childId, data.location.coordinates)

      scanRecord.safetyStatus = {
        isSafe: safetyCheck.isSafe,
        nearestZoneName: safetyCheck.nearestZone?.name,
        distance: safetyCheck.distance,
      }

      // Log safety status for debugging
      console.log(`Safety check for ${data.childName}:`, scanRecord.safetyStatus)

      // In a real app, this would trigger different types of notifications based on safety status
      if (!safetyCheck.isSafe) {
        console.warn(`⚠️ ALERT: ${data.childName}'s QR code was scanned OUTSIDE of safe zones!`)
        // This would trigger a high-priority notification in a real app
      } else {
        console.log(`✅ ${data.childName}'s QR code was scanned within a safe zone.`)
        // This would trigger a standard notification in a real app
      }
    } catch (error) {
      console.error("Error checking location safety:", error)
    }
  }

  // In a real app, this would be stored in a database
  // For this demo, we'll store it in memory
  scanRecords = [scanRecord, ...scanRecords]

  // Simulate sending a notification to the parent
  console.log(
    `Notification sent to parent of ${data.childName}: QR code scanned at ${data.location?.name || "unknown location"}`,
  )

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return scanRecord
}

export async function getScanRecords(): Promise<ScanRecord[]> {
  // In a real app, this would fetch from a database
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return scanRecords
}

export async function getScanRecordsForChild(childId: string): Promise<ScanRecord[]> {
  // In a real app, this would query the database for scans for a specific child
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return scanRecords.filter((record) => record.childId === childId)
}
