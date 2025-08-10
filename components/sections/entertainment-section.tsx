import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import CategoryCard from "@/components/cards/category-card"

export default function EntertainmentSection() {
  return (
    <div className="animate-fadeInUp mb-12 md:mb-20" style={{ animationDelay: "1.6s" }}>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-3 py-2 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          المزيد <ChevronRight className="h-5 w-5 mr-1" />
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 heading-professional">تسوق خدمات الترفيه</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <CategoryCard
          imageUrl="/rgb.png"
          label="Netflix"
          bgColor="bg-gradient-to-br from-red-50 to-red-100"
        />
        <CategoryCard
          imageUrl="/Mbc_Shahid_logo.svg"
          label="Shahid"
          bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
        <CategoryCard
          imageUrl="/Spotify.png"
          label="Spotify"
          bgColor="bg-gradient-to-br from-green-50 to-green-100"
        />
      </div>
    </div>
  )
}
