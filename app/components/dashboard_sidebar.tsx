"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

interface SidebarProps {
  userName: string
  userRole: string
  userImage: string
}

export function DashboardSidebar({ userName, userRole, userImage }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", icon: "/images/dashboardsidebar_logo.png", href: "/employment/dashboard", hasSubmenu: false },
    { name: "Employees", icon: "/images/employeesidebar_logo.png", href: "/employment/employees", hasSubmenu: true },
    {
      name: "Organization",
      icon: "/images/organizationsidebar_logo.png",
      href: "/employment/organization",
      hasSubmenu: true,
    },
    { name: "Attendance", icon: "/images/attendancesidebar_logo.png", href: "/employment/attendance", hasSubmenu: true },
    { name: "Documents", icon: "/images/documentsidebar_logo.png", href: "/employment/documents", hasSubmenu: true },
    { name: "Settings", icon: "/images/settingsidebar_logo.png", href: "/employment/settings", hasSubmenu: true },
    { name: "Logout", icon: "/images/logoutsidebar_logo.png", href: "/logout", hasSubmenu: true },
  ]

  return (
    <aside className="w-[240px] bg-[#1a2456] text-white min-h-screen flex flex-col fixed left-0 top-0 lg:w-[240px] md:w-[200px] sm:w-[180px]">
      {/* Profile Section */}
      <div className="p-6 border-b-2 border-white flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 bg-white">
          <Image
            src={userImage || "/placeholder.svg"}
            alt={userName}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-sm text-center">{userName}</h3>
        <p className="text-xs text-white/70">{userRole}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center justify-between px-6 py-3 hover:bg-white/10 transition-colors ${
              pathname === item.href ? "bg-white/10" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Image src={item.icon || "/placeholder.svg"} alt={item.name} width={20} height={20} className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </div>
            {item.hasSubmenu && <ChevronRight className="w-4 h-4" />}
          </Link>
        ))}
      </nav>
    </aside>
  )
}