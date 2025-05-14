"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { MapPin, Plus, Edit, Trash2, Home, School, ParkingMeterIcon as Park, ShoppingBag } from "lucide-react"
import { SafeZoneMap } from "@/components/safe-zone-map"
import { getSafeZones, createSafeZone, updateSafeZone, deleteSafeZone } from "@/lib/safe-zone-actions"
import type { SafeZone } from "@/types/safe-zones"

export default function SafeZonesPage() {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedZone, setSelectedZone] = useState<SafeZone | null>(null)
  const [selectedChild, setSelectedChild] = useState<string>("all")

  // Form state
  const [zoneName, setZoneName] = useState("")
  const [zoneType, setZoneType] = useState<string>("home")
  const [zoneRadius, setZoneRadius] = useState<number>(200)
  const [zoneCenter, setZoneCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [zoneAddress, setZoneAddress] = useState("")
  const [zoneActive, setZoneActive] = useState(true)

  const children = [
    { id: "abc123", name: "Emma" },
    { id: "def456", name: "Noah" },
  ]

  useEffect(() => {
    async function loadSafeZones() {
      setIsLoading(true)
      try {
        const zones = await getSafeZones()
        setSafeZones(zones)
      } catch (error) {
        console.error("Error loading safe zones:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSafeZones()
  }, [])

  const handleAddZone = () => {
    setZoneName("")
    setZoneType("home")
    setZoneRadius(200)
    setZoneCenter(null)
    setZoneAddress("")
    setZoneActive(true)
    setShowAddDialog(true)
  }

  const handleEditZone = (zone: SafeZone) => {
    setSelectedZone(zone)
    setZoneName(zone.name)
    setZoneType(zone.type)
    setZoneRadius(zone.radius)
    setZoneCenter(zone.center)
    setZoneAddress(zone.address)
    setZoneActive(zone.active)
    setShowEditDialog(true)
  }

  const handleDeleteZone = async (zoneId: string) => {
    if (confirm("Are you sure you want to delete this safe zone?")) {
      try {
        await deleteSafeZone(zoneId)
        setSafeZones(safeZones.filter((zone) => zone.id !== zoneId))
      } catch (error) {
        console.error("Error deleting safe zone:", error)
      }
    }
  }

  const handleMapClick = (location: { lat: number; lng: number }, address: string) => {
    setZoneCenter(location)
    setZoneAddress(address)
  }

  const handleSaveZone = async () => {
    if (!zoneName || !zoneCenter) return

    try {
      const newZone: Omit<SafeZone, "id"> = {
        name: zoneName,
        type: zoneType,
        center: zoneCenter,
        radius: zoneRadius,
        address: zoneAddress,
        active: zoneActive,
        childIds: selectedChild === "all" ? children.map((child) => child.id) : [selectedChild],
        createdAt: new Date().toISOString(),
      }

      const savedZone = await createSafeZone(newZone)
      setSafeZones([savedZone, ...safeZones])
      setShowAddDialog(false)
    } catch (error) {
      console.error("Error saving safe zone:", error)
    }
  }

  const handleUpdateZone = async () => {
    if (!selectedZone || !zoneName || !zoneCenter) return

    try {
      const updatedZone: SafeZone = {
        ...selectedZone,
        name: zoneName,
        type: zoneType,
        center: zoneCenter,
        radius: zoneRadius,
        address: zoneAddress,
        active: zoneActive,
        childIds: selectedChild === "all" ? children.map((child) => child.id) : [selectedChild],
      }

      await updateSafeZone(updatedZone)
      setSafeZones(safeZones.map((zone) => (zone.id === selectedZone.id ? updatedZone : zone)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("Error updating safe zone:", error)
    }
  }

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "school":
        return <School className="h-4 w-4" />
      case "park":
        return <Park className="h-4 w-4" />
      case "store":
        return <ShoppingBag className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const filteredZones =
    selectedChild === "all" ? safeZones : safeZones.filter((zone) => zone.childIds.includes(selectedChild))

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Safe Zones</h1>
          <p className="text-muted-foreground">Create and manage safe areas for your children</p>
        </div>
        <Button onClick={handleAddZone} className="mt-4 gap-2 sm:mt-0">
          <Plus className="h-4 w-4" />
          Add Safe Zone
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedChild}>
        <TabsList>
          <TabsTrigger value="all">All Children</TabsTrigger>
          {children.map((child) => (
            <TabsTrigger key={child.id} value={child.id}>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : filteredZones.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredZones.map((zone) => (
            <Card key={zone.id} className={zone.active ? "" : "opacity-60"}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1.5 ${getZoneTypeColor(zone.type)}`}>{getZoneIcon(zone.type)}</div>
                    <CardTitle className="text-xl">{zone.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditZone(zone)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteZone(zone.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{zone.address}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-40 overflow-hidden rounded-md border">
                  <SafeZoneMap center={zone.center} radius={zone.radius} interactive={false} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <div>Radius: {zone.radius}m</div>
                <div className="flex items-center gap-2">
                  <span>Active</span>
                  <Switch checked={zone.active} disabled />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No safe zones defined</h3>
            <p className="mb-4 text-muted-foreground">
              Create safe zones to get alerts when your child's QR code is scanned outside these areas
            </p>
            <Button onClick={handleAddZone}>Add Safe Zone</Button>
          </CardContent>
        </Card>
      )}

      {/* Add Safe Zone Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Safe Zone</DialogTitle>
            <DialogDescription>
              Create a safe zone by selecting a location on the map and setting a radius.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zone-name">Zone Name</Label>
                <Input
                  id="zone-name"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  placeholder="Home, School, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone-type">Zone Type</Label>
                <Select value={zoneType} onValueChange={setZoneType}>
                  <SelectTrigger id="zone-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="park">Park</SelectItem>
                    <SelectItem value="store">Store</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zone-address">Address</Label>
              <Input
                id="zone-address"
                value={zoneAddress}
                onChange={(e) => setZoneAddress(e.target.value)}
                placeholder="Click on the map to set location"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="zone-radius">Radius (meters)</Label>
                <span className="text-sm text-muted-foreground">{zoneRadius}m</span>
              </div>
              <Slider
                id="zone-radius"
                min={50}
                max={1000}
                step={50}
                value={[zoneRadius]}
                onValueChange={(value) => setZoneRadius(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Location</Label>
              <div className="h-60 overflow-hidden rounded-md border">
                <SafeZoneMap
                  center={zoneCenter || { lat: 40.7128, lng: -74.006 }} // Default to NYC
                  radius={zoneRadius}
                  interactive={true}
                  onLocationSelect={handleMapClick}
                />
              </div>
              <p className="text-xs text-muted-foreground">Click on the map to set the center of the safe zone</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="zone-active" checked={zoneActive} onCheckedChange={setZoneActive} />
              <Label htmlFor="zone-active">Active</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zone-child">Apply to</Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger id="zone-child">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveZone} disabled={!zoneName || !zoneCenter}>
              Save Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Safe Zone Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Safe Zone</DialogTitle>
            <DialogDescription>
              Modify this safe zone by updating the location, radius, or other settings.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-zone-name">Zone Name</Label>
                <Input
                  id="edit-zone-name"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  placeholder="Home, School, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-zone-type">Zone Type</Label>
                <Select value={zoneType} onValueChange={setZoneType}>
                  <SelectTrigger id="edit-zone-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="park">Park</SelectItem>
                    <SelectItem value="store">Store</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-zone-address">Address</Label>
              <Input
                id="edit-zone-address"
                value={zoneAddress}
                onChange={(e) => setZoneAddress(e.target.value)}
                placeholder="Click on the map to set location"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="edit-zone-radius">Radius (meters)</Label>
                <span className="text-sm text-muted-foreground">{zoneRadius}m</span>
              </div>
              <Slider
                id="edit-zone-radius"
                min={50}
                max={1000}
                step={50}
                value={[zoneRadius]}
                onValueChange={(value) => setZoneRadius(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Location</Label>
              <div className="h-60 overflow-hidden rounded-md border">
                <SafeZoneMap
                  center={zoneCenter || { lat: 40.7128, lng: -74.006 }}
                  radius={zoneRadius}
                  interactive={true}
                  onLocationSelect={handleMapClick}
                />
              </div>
              <p className="text-xs text-muted-foreground">Click on the map to update the center of the safe zone</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="edit-zone-active" checked={zoneActive} onCheckedChange={setZoneActive} />
              <Label htmlFor="edit-zone-active">Active</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-zone-child">Apply to</Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger id="edit-zone-child">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateZone} disabled={!zoneName || !zoneCenter}>
              Update Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
