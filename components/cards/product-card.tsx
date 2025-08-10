import Image from "next/image"

interface ProductCardProps {
  imageUrl: string
  title: string
  price: string
  currency: string
  installment: string
  badge?: string
}

function ProductBadge({ text }: { text: string }) {
  const isBestSeller = text === "الأكثر مبيعاً"
  const badgeColor = isBestSeller
    ? "bg-gradient-to-r from-red-500 to-red-600"
    : "bg-gradient-to-r from-purple-500 to-purple-600"

  return (
    <div
      className={`absolute top-3 right-3 ${badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-professional`}
    >
      {text}
    </div>
  )
}

export default function ProductCard({ imageUrl, title, price, currency, installment, badge }: ProductCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-professional-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col">
      <div className="relative h-40 sm:h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
        {badge && <ProductBadge text={badge} />}
        <Image src={imageUrl || "/placeholder.svg"} alt={title} layout="fill" objectFit="contain" className="p-2" />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <h3 className="font-bold text-slate-800 mb-3 text-base sm:text-lg heading-professional">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="text-xs text-slate-500 font-medium text-professional">
            {installment} {currency}/شهر
          </div>
          <div className="font-bold text-red-600 text-lg sm:text-xl heading-professional">
            {price} {currency}
          </div>
        </div>
      </div>
    </div>
  )
}
