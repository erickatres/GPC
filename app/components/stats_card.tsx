import Image from "next/image"

interface StatCardProps {
  value: number
  label: string
  icon: string
  highlighted?: boolean
  className?: string
}

export function StatCard({ value, label, icon, highlighted = false, className = "" }: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm border-2 ${
        highlighted ? "border-[#1a2456]" : "border-gray-300"
      } flex flex-col items-center justify-center min-h-[140px] ${className}`}
    >
      <div className="w-12 h-12 bg-[#1a2456] rounded-full flex items-center justify-center mb-3">
        <Image src={icon || "/placeholder.svg"} alt={label} width={24} height={24} className="w-6 h-6" />
      </div>
      <div className="text-4xl font-bold text-[#1a2456] mb-1">{value}</div>
      <div className="text-sm text-gray-600 text-center">{label}</div>
    </div>
  )
}
