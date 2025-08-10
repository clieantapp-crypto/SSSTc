"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, ArrowRight } from "lucide-react"

interface QuickPaymentSectionProps {
  onSubmit: (amount: string, phone: string) => void
}

export default function QuickPaymentSection({ onSubmit }: QuickPaymentSectionProps) {
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(amount, phone)
  }

  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-professional-xl border border-white/50 transition-shadow duration-300 hover:shadow-professional-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-professional">
            <CreditCard className="w-7 h-7 text-purple-700" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 heading-professional">الدفع السريع</h2>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={12}
              placeholder="رقم الجوال/البطاقة المدنية أو رقم العقد"
              className="text-right border-2 border-gray-200 rounded-xl focus:ring-0 py-5 px-4 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 text-base focus:shadow-md"
            />
          </div>
          {phone.length >= 8 && (
            <div className="relative animate-scaleIn">
              <Input
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                maxLength={3}
                placeholder="القيمة بالدينار الكويتي"
                type="tel"
                className="text-right border-2 border-gray-200 rounded-xl focus:ring-0 py-5 px-4 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 text-base focus:shadow-md"
              />
            </div>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white rounded-xl py-6 font-semibold text-lg shadow-professional-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
          >
            تابع الآن
            <ArrowRight className="mr-3 h-6 w-6" />
          </Button>
        </div>
      </form>
    </div>
  )
}
