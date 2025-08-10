import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ProductCard from "@/components/cards/product-card"

export default function FeaturedProductsSection() {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-3 py-2 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          المزيد <ChevronRight className="h-5 w-5 mr-1" />
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 heading-professional">تسوق أجهزة الجوال</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <ProductCard
          imageUrl="/samsung-s22.png"
          title="Samsung S25 Ultra"
          price="255.00"
          currency="د.ك"
          installment="12.63"
          badge="الأكثر مبيعاً"
        />
        <ProductCard
          imageUrl="/samsung-s22.png"
          title="Samsung S25"
          price="225.00"
          currency="د.ك"
          installment="11.29"
          badge="جديد"
        />
      </div>
    </div>
  )
}
