"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/branding/logo"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("البريد الإلكتروني مطلوب")
      return
    }

    if (!validateEmail(email)) {
      setError("البريد الإلكتروني غير صحيح")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      setError("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Logo size="lg" showText className="justify-center" />
          </div>

          <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4" dir="rtl">
                تم إرسال الرسالة
              </h2>
              <p className="text-gray-600 mb-6" dir="rtl">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد والبريد المزعج.
              </p>
              <div className="space-y-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl">
                    <ArrowRight className="ml-2 h-5 w-5" />
                    العودة لتسجيل الدخول
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  إرسال مرة أخرى
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-40 animate-bounce"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Logo size="lg" showText className="justify-center" />
          <p className="text-gray-600 mt-4" dir="rtl">
            استعادة كلمة المرور
          </p>
        </div>

        {/* Forgot Password Form */}
        <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800" dir="rtl">
              نسيت كلمة المرور؟
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2" dir="rtl">
              أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center"
                dir="rtl"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block text-gray-700">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    className={`pl-10 text-right ${error ? "border-red-500" : ""}`}
                    dir="rtl"
                    placeholder="أدخل بريدك الإلكتروني"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 ml-2" />
                    جاري الإرسال...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Mail className="ml-2 h-5 w-5" />
                    إرسال رابط الاستعادة
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                href="/auth/login"
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors inline-flex items-center"
                dir="rtl"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors text-sm" dir="rtl">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
