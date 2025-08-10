import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative mx-1 md:mx-6 my-8 rounded-3xl overflow-hidden shadow-professional-xl animate-fadeInUp">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-purple-900/20 to-red-500/70 z-10"></div>
      <Image
        src="/hero-banner.jpg"
        alt="Hero Banner"
        width={1200}
        height={400}
        className="w-full h-[400px] object-cover"
        priority
      />
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
        <div className=" animate-scaleIn">
          <div className="text-red-300 text-sm mt-1 font-medium text-professional">   </div>
        </div>
        <div className="space-y-4 animate-slideInRight self-end text-right">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight drop-shadow-2xl heading-professional">
            تواصل بدون انقطاع
            <br />
            <span className="text-red-300">مع باقات الدفع الآجل</span>
          </h1>
          <div className="flex justify-end pt-2">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-8 py-6 font-semibold text-lg shadow-professional-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
            >
              اعرف أكثر
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
