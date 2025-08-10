import { ShieldCheck, ArrowRight, PlusCircle } from "lucide-react"
import type React from "react"

function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/70 backdrop-blur-md rounded-3xl shadow-professional border border-white/50 hover:shadow-professional-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 cursor-pointer">
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-3 text-purple-700 shadow-professional">
        {icon}
      </div>
      <span className="text-xs text-center font-semibold text-slate-700 leading-tight text-professional">{title}</span>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <ServiceCard icon={<ShieldCheck className="w-6 h-6" />} title="تحديث البطاقة المدنية" />
        <ServiceCard icon={<ArrowRight className="w-6 h-6" />} title="نقل إلى stc" />
        <ServiceCard icon={<PlusCircle className="w-6 h-6" />} title="احصل على خط جديد" />
      </div>
    </div>
  )
}
