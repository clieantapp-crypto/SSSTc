import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <div
      className="bg-gradient-to-tr from-purple-600 to-red-500 py-12 md:py-16 px-6 shadow-inner mt-12 animate-fadeInUp"
      style={{ animationDelay: "1.8s" }}
    >
      <div className="text-white text-center mb-8">
        <h3 className="font-bold text-2xl md:text-3xl heading-professional">انضم إلى نشرتنا الإخبارية</h3>
        <p className="text-lg mt-2 opacity-90 text-professional">احصل على آخر العروض والأخبار</p>
      </div>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          placeholder="البريد الإلكتروني"
          type="email"
          className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 text-right shadow-professional-lg focus:ring-2 focus:ring-white rounded-xl border-0 py-5 text-base focus:outline-none"
        />
        <Button className="bg-white text-slate-800 hover:bg-gray-200 flex-initial sm:flex-none shadow-professional-lg transition-all duration-300 hover:scale-105 font-semibold rounded-xl py-5 text-base px-8">
          اشترك الآن
        </Button>
      </form>
    </div>
  )
}
