import Image from "next/image"
import type React from "react"

interface CategoryCardProps {
  icon?: React.ReactNode
  label: string
  imageUrl?: string
  bgColor?: string
}

export default function CategoryCard({ icon, label, imageUrl, bgColor = "bg-white/80" }: CategoryCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 ${bgColor} backdrop-blur-sm rounded-3xl shadow-professional border border-white/50 hover:shadow-professional-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={label}
          width={56}
          height={56}
          className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
        />
      ) : icon ? (
        <div className="text-purple-700 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">{icon}</div>
      ) : null}
      <span className="text-xs sm:text-sm text-center font-semibold text-slate-700 text-professional">{label}</span>
    </div>
  )
}
