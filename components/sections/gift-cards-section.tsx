import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import GiftCard from "@/components/cards/gift-card"

export default function GiftCardsSection() {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "1.2s" }}>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-3 py-2 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          المزيد <ChevronRight className="h-5 w-5 mr-1" />
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 heading-professional">تسوق البطاقات والألعاب</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <GiftCard imageUrl="/pla.webp" title="Google Play" />
        <GiftCard imageUrl="/itun.webp" title="iTunes" />
      </div>
    </div>
  )
}
