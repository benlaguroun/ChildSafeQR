"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, PlusCircle, Users, History, Settings, LogOut, QrCode, Menu, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Add Child",
    href: "/dashboard/add-child",
    icon: PlusCircle,
  },
  {
    title: "My Children",
    href: "/dashboard/my-children",
    icon: Users,
  },
  {
    title: "Safe Zones",
    href: "/dashboard/safe-zones",
    icon: MapPin,
  },
  {
    title: "Scan Logs",
    href: "/dashboard/scan-logs",
    icon: History,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 px-2 py-4">
              <QrCode className="h-6 w-6 text-blue-500" />
              <span className="font-bold">ChildSafeQR</span>
            </div>
            <nav className="flex-1 space-y-2 px-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-100 hover:text-blue-700",
                    pathname === item.href ? "bg-blue-100 text-blue-700" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="border-t px-2 py-4">
              <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground">
                <LogOut className="h-5 w-5" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden h-screen w-64 flex-col border-r bg-white md:flex">
        <div className="flex items-center gap-2 px-6 py-4">
          <QrCode className="h-6 w-6 text-blue-500" />
          <span className="font-bold">ChildSafeQR</span>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-100 hover:text-blue-700",
                pathname === item.href ? "bg-blue-100 text-blue-700" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="border-t px-4 py-4">
          <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </div>
      </div>
    </>
  )
}
