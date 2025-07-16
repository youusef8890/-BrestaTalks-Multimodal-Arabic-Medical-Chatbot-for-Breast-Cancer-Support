"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import { BrandHeader } from "@/components/branding/brand-header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.")
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Header */}
      <BrandHeader currentPage="contact" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">تواصل مع BRESTA TALKS</h1>
          <p className="text-xl text-pink-100 leading-relaxed">
            نحن هنا للإجابة على أسئلتك وتقديم الدعم الذي تحتاجينه. لا تترددي في التواصل معنا
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8" dir="rtl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">أرسل لنا رسالة</h2>
                  <p className="text-gray-600">املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      الاسم الكامل
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-right"
                      dir="rtl"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      البريد الإلكتروني
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-right"
                      dir="rtl"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      الرسالة
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="text-right resize-none"
                      dir="rtl"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                        جاري الإرسال...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="ml-2 h-5 w-5" />
                        إرسال الرسالة
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center lg:text-right" dir="rtl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">معلومات التواصل</h2>
                <p className="text-gray-600 text-lg">يمكنك التواصل معنا من خلال الطرق التالية</p>
              </div>

              <div className="space-y-6">
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse" dir="rtl">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <Mail className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">البريد الإلكتروني</h3>
                        <p className="text-gray-600">support@brestatalks.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse" dir="rtl">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <Phone className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">الهاتف</h3>
                        <p className="text-gray-600">+20 01091801810</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse" dir="rtl">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <MapPin className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">العنوان</h3>
                        <p className="text-gray-600">6th of October City</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse" dir="rtl">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <Clock className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">ساعات العمل</h3>
                        <p className="text-gray-600">متاح 24/7 للدعم الفوري</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Chat Option */}
              <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                <CardContent className="p-6 text-center" dir="rtl">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">تحتاجين مساعدة فورية؟</h3>
                  <p className="mb-4 text-pink-100">ابدئي محادثة مع الروبوت الآن للحصول على إجابات سريعة</p>
                  <Link href="/chat">
                    <Button className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105">
                      ابدأ المحادثة
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">الأسئلة الشائعة</h2>
            <p className="text-xl text-gray-600">إجابات على أكثر الأسئلة شيوعاً حول خدماتنا</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6" dir="rtl">
                <h3 className="text-lg font-bold text-gray-800 mb-3">كيف يمكنني الوثوق بالمعلومات المقدمة؟</h3>
                <p className="text-gray-600">
                  جميع المعلومات مبنية على أحدث الأبحاث الطبية والمصادر الموثوقة. ننصح دائماً بمراجعة الطبيب المختص
                  للحصول على تشخيص دقيق.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6" dir="rtl">
                <h3 className="text-lg font-bold text-gray-800 mb-3">هل الخدمة مجانية؟</h3>
                <p className="text-gray-600">
                  نعم، جميع خدماتنا الأساسية مجانية تماماً. نهدف إلى جعل المعلومات والدعم متاحين للجميع.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6" dir="rtl">
                <h3 className="text-lg font-bold text-gray-800 mb-3">كيف تحمون خصوصية بياناتي؟</h3>
                <p className="text-gray-600">
                  نحن ملتزمون بحماية خصوصيتك. جميع المحادثات مشفرة ولا نشارك معلوماتك الشخصية مع أي طرف ثالث.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
