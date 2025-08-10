import Image from "next/image"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-professional">
      <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
        <Menu className="w-5 h-5 text-slate-700" />
      </button>
      <div className="flex items-center">
        <Image src="/stc.png" alt="STC Logo" width={100} height={40} />
      </div>
      <div className="flex items-center space-x-reverse space-x-2">
        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <Search className="w-5 h-5 text-slate-600" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <ShoppingCart className="w-5 h-5 text-slate-600" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          <User className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </header>
  )
}
