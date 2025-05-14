export interface SafeZone {
  id: string
  name: string
  type: string
  center: {
    lat: number
    lng: number
  }
  radius: number
  address: string
  active: boolean
  childIds: string[]
  createdAt: string
}
