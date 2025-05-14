"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Copy, Upload } from "lucide-react"

export default function AddChildPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [childName, setChildName] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [childId, setChildId] = useState("")
  const [profileUrl, setProfileUrl] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate a unique ID for the child
    const generatedId = Math.random().toString(36).substring(2, 10)
    const generatedUrl = `${window.location.origin}/profile/${generatedId}`

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setChildId(generatedId)
      setProfileUrl(generatedUrl)
    }, 1500)
  }

  const handleDownload = () => {
    // Create a canvas element
    const canvas = document.createElement("canvas")
    const svg = document.getElementById("qr-code-svg")

    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const pngFile = canvas.toDataURL("image/png")

          // Create download link
          const downloadLink = document.createElement("a")
          downloadLink.download = `${childName}-qr-code.png`
          downloadLink.href = pngFile
          downloadLink.click()
        }
      }
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
      img.crossOrigin = "anonymous"
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl)
    alert("Profile link copied to clipboard!")
  }

  return (
    <div className="container max-w-3xl p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add a Child</h1>
        <p className="text-muted-foreground">Create a safety QR code for your child</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="photo">Child's Photo (Optional)</Label>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg border bg-muted">
                {previewUrl ? (
                  <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">No photo</div>
                )}
              </div>
              <div className="flex-1">
                <Input id="photo" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("photo")?.click()}
                  className="w-full gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload photo
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  This photo will be visible on the public profile page when someone scans the QR code.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Child's First Name</Label>
            <Input
              id="name"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter first name only"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-name">Emergency Contact Name</Label>
            <Input id="emergency-name" placeholder="Your name or another guardian" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
            <Input id="emergency-phone" type="tel" placeholder="Phone number" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea
              id="message"
              placeholder="If you found this child, please call the number below"
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Generating QR Code..." : "Generate QR Code"}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold">QR Code Generated!</h2>
                <p className="text-muted-foreground">{childName}'s safety QR code is ready</p>
              </div>

              <div className="mb-6 rounded-xl border-2 border-dashed border-blue-200 p-4">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={profileUrl}
                  size={192}
                  bgColor={"#ffffff"}
                  fgColor={"#2563eb"}
                  level={"H"}
                  includeMargin={true}
                />
              </div>

              <div className="mb-4 w-full text-center">
                <p className="text-sm text-muted-foreground break-all">{profileUrl}</p>
              </div>

              <div className="grid w-full gap-2 sm:grid-cols-2">
                <Button onClick={handleDownload} variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download QR
                </Button>
                <Button onClick={handleCopy} variant="outline" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Profile Link
                </Button>
              </div>

              <div className="mt-6 w-full rounded-md bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-700">
                  When someone scans this QR code, you'll receive an instant notification with their location.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false)
                setChildName("")
                setPreviewUrl(null)
                setChildId("")
                setProfileUrl("")
              }}
            >
              Add Another Child
            </Button>
            <Button onClick={() => router.push("/dashboard/my-children")}>View All Children</Button>
          </div>
        </div>
      )}
    </div>
  )
}
