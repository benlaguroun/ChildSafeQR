"use client"

import type { SafeZone } from "@/types/safe-zones"

// In-memory storage for safe zones (this would be a database in a real app)
let safeZones: SafeZone[] = [
  {
    id: "zone1",
    name: "Home",
    type: "home",
    center: { lat: 40.7128, lng: -74.006 },
    radius: 200,
    address: "123 Main St, New York, NY",
    active: true,
    childIds: ["abc123", "def456"],
    createdAt: "2023-05-01T12:00:00.000Z",
  },
  {
    id: "zone2",
    name: "School",
    type: "school",
    center: { lat: 40.7282, lng: -73.9942 },
    radius: 300,
    address: "456 Education Ave, New York, NY",
    active: true,
    childIds: ["abc123", "def456"],
    createdAt: "2023-05-02T12:00:00.000Z",
  },
  {
    id: "zone3",
    name: "Grandma's House",
    type: "home",
    center: { lat: 40.7489, lng: -73.968 },
    radius: 150,
    address: "789 Family Ln, New York, NY",
    active: true,
    childIds: ["abc123"],
    createdAt: "2023-05-03T12:00:00.000Z",
  },
]

export async function getSafeZones(): Promise<SafeZone[]> {
  // In a real app, this would fetch from a database
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return safeZones
}

export async function getSafeZonesForChild(childId: string): Promise<SafeZone[]> {
  // In a real app, this would query the database for zones for a specific child
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return safeZones.filter((zone) => zone.childIds.includes(childId))
}

export async function createSafeZone(zoneData: Omit<SafeZone, "id">): Promise<SafeZone> {
  // Generate a unique ID for the zone
  const zoneId = `zone${Date.now()}`

  // Create the zone record
  const safeZone: SafeZone = {
    id: zoneId,
    ...zoneData,
  }

  // In a real app, this would be stored in a database
  // For this demo, we'll store it in memory
  safeZones = [safeZone, ...safeZones]

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return safeZone
}

export async function updateSafeZone(zoneData: SafeZone): Promise<SafeZone> {
  // In a real app, this would update the database
  // For this demo, we'll update it in memory
  safeZones = safeZones.map((zone) => (zone.id === zoneData.id ? zoneData : zone))

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return zoneData
}

export async function deleteSafeZone(zoneId: string): Promise<void> {
  // In a real app, this would delete from the database
  // For this demo, we'll delete it from memory
  safeZones = safeZones.filter((zone) => zone.id !== zoneId)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export function isLocationInSafeZone(location: { lat: number; lng: number }, safeZone: SafeZone): boolean {
  // Calculate distance between two points using the Haversine formula
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (location.lat * Math.PI) / 180
  const φ2 = (safeZone.center.lat * Math.PI) / 180
  const Δφ = ((safeZone.center.lat - location.lat) * Math.PI) / 180
  const Δλ = ((safeZone.center.lng - location.lng) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  // Check if the distance is within the safe zone radius
  return distance <= safeZone.radius
}

export async function checkLocationSafety(
  childId: string,
  location: { lat: number; lng: number },
): Promise<{
  isSafe: boolean
  safeZones: SafeZone[]
  nearestZone: SafeZone | null
  distance: number | null
}> {
  // Get all safe zones for the child
  const zones = await getSafeZonesForChild(childId)
  const activeZones = zones.filter((zone) => zone.active)

  if (activeZones.length === 0) {
    return { isSafe: false, safeZones: [], nearestZone: null, distance: null }
  }

  // Check if the location is within any safe zone
  let isSafe = false
  let nearestZone: SafeZone | null = null
  let minDistance = Number.MAX_VALUE

  for (const zone of activeZones) {
    // Calculate distance between location and zone center
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (location.lat * Math.PI) / 180
    const φ2 = (zone.center.lat * Math.PI) / 180
    const Δφ = ((zone.center.lat - location.lat) * Math.PI) / 180
    const Δλ = ((zone.center.lng - location.lng) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    // Update nearest zone
    if (distance < minDistance) {
      minDistance = distance
      nearestZone = zone
    }

    // Check if location is within this zone
    if (distance <= zone.radius) {
      isSafe = true
      break
    }
  }

  return {
    isSafe,
    safeZones: activeZones,
    nearestZone,
    distance: nearestZone ? minDistance : null,
  }
}
