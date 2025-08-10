import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, Wifi, Smartphone, Tv, Headphones } from "lucide-react"
import CategoryCard from "@/components/cards/category-card"

export default function QuickAccessSection() {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-3 py-2 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          المزيد <ChevronRight className="h-5 w-5 mr-1" />
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 heading-professional">الوصول السريع</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
        <CategoryCard icon={<Phone />} label="الأجهزة" />
        <CategoryCard icon={<Wifi />} label="الإنترنت" />
        <CategoryCard icon={<Smartphone />} label="الجوال" />
        <CategoryCard icon={<Tv />} label="التلفزيون" />
        <CategoryCard icon={<Headphones />} label="الترفيه" />
      </div>
    </div>
  )
}
