"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"
import { BrandHeader } from "@/components/branding/brand-header"
import { Logo } from "@/components/branding/logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <BrandHeader currentPage="home" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right" dir="rtl">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                مرحباً بك في
                <span className="text-pink-600 block">BRESTA TALKS</span>
                <span className="text-2xl md:text-3xl font-normal text-gray-600 block mt-2">
                  روبوت دعم سرطان الثدي الذكي
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                رفيقك الموثوق للحصول على معلومات ودعم حول سرطان الثدي
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Link href="/chat">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <MessageCircle className="ml-2 h-6 w-6" />
                    ابدأ المحادثة
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  تعرف أكثر
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                <Logo size="xl" className="animate-float" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">لماذا تختارنا؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن هنا لنقدم لك الدعم والمعلومات التي تحتاجينها في رحلتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">دعم عاطفي</h3>
                <p className="text-gray-600">نقدم استجابات متعاطفة ومتفهمة لمساعدتك في التعامل مع التحديات</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Shield className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات موثوقة</h3>
                <p className="text-gray-600">معلومات طبية دقيقة ومحدثة من مصادر موثوقة</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">متاح دائماً</h3>
                <p className="text-gray-600">خدمة متاحة 24/7 لتقديم الدعم عندما تحتاجينه</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ابدئي رحلتك نحو الشفاء اليوم</h2>
          <p className="text-xl text-pink-100 mb-8">لا تترددي في طلب المساعدة. نحن هنا لدعمك في كل خطوة</p>
          <Link href="/chat">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              <MessageCircle className="ml-2 h-6 w-6" />
              ابدأ المحادثة الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
