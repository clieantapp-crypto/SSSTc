import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <header className="border-b shadow-sm py-4 px-6 flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold text-blue-700">الاتصالات العربية</h1>
        <nav className="space-x-4 rtl:space-x-reverse">
          <a href="#services" className="hover:text-blue-600 font-medium">الخدمات</a>
          <a href="#about" className="hover:text-blue-600 font-medium">من نحن</a>
          <a href="#contact" className="hover:text-blue-600 font-medium">اتصل بنا</a>
        </nav>
      </header>

      <main className="p-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">حلول اتصالات متكاملة وحديثة</h2>
        <p className="mb-6 text-lg text-gray-600 max-w-xl">
          نقدم لك خدمات الاتصالات المتطورة التي تلبي احتياجاتك الشخصية والتجارية بكفاءة واحترافية.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">ابدأ الآن</Button>
          <Button variant="outline">تعرف على المزيد</Button>
        </div>
      </main>

      <section id="services" className="mt-10 grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {[
          { title: "خدمة الإنترنت", icon: <Phone /> },
          { title: "دعم العملاء", icon: <Mail /> },
          { title: "الخطوط الذكية", icon: <Phone /> },
        ].map((service, idx) => (
          <Card key={idx} className="shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="text-blue-600 mb-2">{service.icon}</div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
            </CardContent>
          </Card>
        ))}
      </section>

      <footer className="mt-16 py-6 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} الاتصالات العربية. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
