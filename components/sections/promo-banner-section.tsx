import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function PromoBannerSection() {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "1s" }}>
      <div className="relative rounded-3xl overflow-hidden shadow-professional-xl transition-transform duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10"></div>
        <img
          src="/samsung-banner.jpg"
          alt="Samsung Banner"
          width={700}
          height={200}
          className="w-full h-[180px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-between p-6 md:p-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl px-6 py-5 text-base font-semibold shadow-professional-lg transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
          >
            تسوق الآن
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
          <div className="text-white text-right">
            <h3 className="font-bold text-xl md:text-2xl drop-shadow-lg heading-professional">سامسونج جالكسي</h3>
            <p className="text-base md:text-lg mt-1 drop-shadow-md opacity-90 text-professional">
              اكتشف المجموعة الجديدة
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
