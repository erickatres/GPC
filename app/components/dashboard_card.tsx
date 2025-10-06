import Image from "next/image"
import Link from "next/link"

interface DashboardCardProps {
  title: string
  subtitle: string
  icon: string
  href: string
}

export function DashboardCard({ title, subtitle, icon, href }: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-4 h-[90px]">
        <div className="w-12 h-12 bg-[#1a2456] rounded-full flex items-center justify-center flex-shrink-0">
          <Image src={icon || "/placeholder.svg"} alt={title} width={24} height={24} className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1a2456] text-base">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}