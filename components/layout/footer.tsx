import type React from "react"
import { Facebook, Twitter, Instagram } from "lucide-react"

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="hover:text-white transition-colors text-professional">
        {children}
      </a>
    </li>
  )
}

function SocialIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <a
      href="#"
      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-professional"
    >
      <Icon className="w-6 h-6 text-white" />
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 sm:py-20 px-6 sm:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        <div>
          <h4 className="font-bold mb-6 text-lg heading-professional">خدمة العملاء</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <FooterLink>اتصل بنا</FooterLink>
            <FooterLink>الأسئلة الشائعة</FooterLink>
            <FooterLink>فروعنا</FooterLink>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg heading-professional">حسابي</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <FooterLink>تسجيل الدخول</FooterLink>
            <FooterLink>طلباتي</FooterLink>
            <FooterLink>إعدادات الحساب</FooterLink>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg heading-professional">عن الشركة</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <FooterLink>من نحن</FooterLink>
            <FooterLink>الوظائف</FooterLink>
            <FooterLink>الشروط والأحكام</FooterLink>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-lg heading-professional">تواصل معنا</h4>
          <div className="flex space-x-4 space-x-reverse mt-6">
            <SocialIcon icon={Facebook} />
            <SocialIcon icon={Twitter} />
            <SocialIcon icon={Instagram} />
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-700 text-center text-sm text-slate-400 text-professional">
        © {new Date().getFullYear()} جميع الحقوق محفوظة - شركة الاتصالات السعودية
      </div>
    </footer>
  )
}
