import Image from "next/image"

interface GiftCardProps {
  imageUrl: string
  title: string
}

export default function GiftCard({ imageUrl, title }: GiftCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-professional-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="relative h-32 sm:h-40 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} layout="fill" objectFit="contain" />
      </div>
      <h3 className="font-bold text-slate-800 text-center text-base sm:text-lg heading-professional">{title}</h3>
    </div>
  )
}
