import { MessageSquare } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl p-4 shadow-professional-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300">
        <MessageSquare className="w-7 h-7" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </button>
    </div>
  )
}
