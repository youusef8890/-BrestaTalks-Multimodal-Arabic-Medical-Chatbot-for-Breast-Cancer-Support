"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Clock, Users, Award, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BrandHeader } from "@/components/branding/brand-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Header */}
      <BrandHeader currentPage="about" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">من نحن - BRESTA TALKS</h1>
          <p className="text-xl text-pink-100 leading-relaxed">
            نحن فريق BRESTA TALKS المتخصص في تقديم الدعم والمعلومات الطبية الموثوقة لمرضى سرطان الثدي وعائلاتهم
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div dir="rtl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">مهمة BRESTA TALKS</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                في BRESTA TALKS، نهدف إلى تقديم دعم شامل ومعلومات دقيقة وموثوقة لكل من يتأثر بسرطان الثدي. نؤمن بأن
                المعرفة قوة، وأن الدعم العاطفي جزء أساسي من رحلة الشفاء.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                من خلال التكنولوجيا المتقدمة والذكاء الاصطناعي، نسعى لجعل المعلومات الطبية متاحة ومفهومة للجميع، مع
                توفير الدعم العاطفي اللازم في كل خطوة.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/mission-support.png"
                alt="مهمتنا في تقديم الدعم"
                width={500}
                height={400}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl blur-3xl opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">قيمنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن نؤمن بهذه القيم الأساسية التي توجه عملنا وخدماتنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">التعاطف</h3>
                <p className="text-gray-600">
                  نتفهم التحديات العاطفية والجسدية التي تواجهينها ونقدم الدعم بكل تعاطف ومحبة
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Shield className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">الموثوقية</h3>
                <p className="text-gray-600">
                  جميع المعلومات التي نقدمها مبنية على أحدث الأبحاث الطبية والمصادر الموثوقة
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Clock className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">الإتاحة</h3>
                <p className="text-gray-600">خدماتنا متاحة 24/7 لأننا نعلم أن الحاجة للدعم لا تقتصر على أوقات معينة</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">المجتمع</h3>
                <p className="text-gray-600">نؤمن بقوة المجتمع والدعم المتبادل في رحلة الشفاء والتعافي</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Award className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">التميز</h3>
                <p className="text-gray-600">نسعى دائماً لتقديم أفضل الخدمات وأحدث التقنيات لخدمة مجتمعنا</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center" dir="rtl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                  <Lightbulb className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">الابتكار</h3>
                <p className="text-gray-600">نستخدم أحدث التقنيات والذكاء الاصطناعي لتطوير حلول مبتكرة ومفيدة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" dir="rtl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">ما يميزنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المصممة خصيصاً لدعمك في رحلتك
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div dir="rtl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">دعم متعدد الوسائط</h3>
                <p className="text-lg text-gray-600 mb-6">
                  يمكنك التفاعل معنا من خلال النص والصوت والصور. ارسلي صورة للحصول على تحليل أو استخدمي الصوت للتحدث
                  معنا بشكل طبيعي.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    تحليل الصور الطبية
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    التعرف على الصوت باللغة العربية
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    محادثة نصية تفاعلية
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/multimodal-support.png"
                  alt="دعم متعدد الوسائط"
                  width={500}
                  height={350}
                  className="w-full rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl blur-3xl opacity-10 -z-10"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <Image
                  src="/images/ai-technology.png"
                  alt="ذكاء اصطناعي متقدم"
                  width={500}
                  height={350}
                  className="w-full rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-300 rounded-2xl blur-3xl opacity-10 -z-10"></div>
              </div>
              <div dir="rtl" className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">ذكاء اصطناعي متقدم</h3>
                <p className="text-lg text-gray-600 mb-6">
                  نستخدم أحدث تقنيات الذكاء الاصطناعي لفهم احتياجاتك وتقديم إجابات دقيقة ومخصصة لحالتك الفردية.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    تحليل ذكي للأعراض
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    توصيات مخصصة
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full ml-3"></div>
                    تعلم مستمر من التفاعلات
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">ابدئي رحلتك معنا اليوم</h2>
          <p className="text-xl text-pink-100 mb-8">نحن هنا لدعمك في كل خطوة. لا تترددي في البدء</p>
          <Link href="/chat">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              ابدأ المحادثة الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
