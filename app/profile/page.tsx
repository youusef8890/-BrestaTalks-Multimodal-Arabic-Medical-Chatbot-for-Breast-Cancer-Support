"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Calendar, MapPin, Edit3, Save, X, Camera, MessageCircle, Clock, Shield } from "lucide-react"
import { BrandHeader } from "@/components/branding/brand-header"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "سارة أحمد",
    email: "sara.ahmed@example.com",
    phone: "+20 01234567890",
    birthDate: "1985-03-15",
    location: "القاهرة، مصر",
    bio: "أم لطفلين، مهتمة بالصحة والعافية. أؤمن بأهمية الدعم المجتمعي في رحلة الشفاء.",
    joinDate: "2024-01-15",
    totalChats: 45,
    lastActive: "منذ ساعتين",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsEditing(false)
      alert("تم حفظ التغييرات بنجاح!")
    } catch (error) {
      alert("حدث خطأ أثناء حفظ التغييرات")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Header */}
      <BrandHeader currentPage="profile" />

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 rtl:md:space-x-reverse">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-pink-200">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="صورة الملف الشخصي" />
                  <AvatarFallback className="text-2xl bg-pink-100 text-pink-600">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-pink-500 hover:bg-pink-600 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-right" dir="rtl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{profileData.name}</h1>
                  <div className="flex space-x-2 rtl:space-x-reverse justify-center md:justify-start">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="bg-pink-500 hover:bg-pink-600 text-white">
                        <Edit3 className="ml-2 h-4 w-4" />
                        تعديل الملف الشخصي
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Save className="ml-2 h-4 w-4" />
                          حفظ
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="border-gray-300">
                          <X className="ml-2 h-4 w-4" />
                          إلغاء
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{profileData.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 justify-center md:justify-start">
                  <div className="flex items-center">
                    <Calendar className="ml-2 h-4 w-4" />
                    انضمت في {new Date(profileData.joinDate).toLocaleDateString("ar-EG")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="ml-2 h-4 w-4" />
                    آخر نشاط: {profileData.lastActive}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{profileData.totalChats}</h3>
              <p className="text-gray-600" dir="rtl">
                إجمالي المحادثات
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">آمن</h3>
              <p className="text-gray-600" dir="rtl">
                حالة الحساب
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <User className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">عضو</h3>
              <p className="text-gray-600" dir="rtl">
                نوع العضوية
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800" dir="rtl">
              المعلومات الشخصية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block text-gray-700">
                  الاسم الكامل
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="pl-10 text-right"
                    dir="rtl"
                    disabled={!isEditing}
                  />
                </div>
              </div>

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
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="pl-10 text-right"
                    dir="rtl"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block text-gray-700">
                  رقم الهاتف
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="pl-10 text-right"
                    dir="rtl"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-right block text-gray-700">
                  تاريخ الميلاد
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={profileData.birthDate}
                    onChange={handleInputChange}
                    className="pl-10 text-right"
                    dir="rtl"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location" className="text-right block text-gray-700">
                  الموقع
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="pl-10 text-right"
                    dir="rtl"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-right block text-gray-700">
                  نبذة شخصية
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="text-right resize-none"
                  dir="rtl"
                  disabled={!isEditing}
                  placeholder="اكتبي نبذة عن نفسك..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800" dir="rtl">
              إعدادات الحساب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" dir="rtl">
              <div>
                <h4 className="font-medium text-gray-800">تغيير كلمة المرور</h4>
                <p className="text-sm text-gray-600">قم بتحديث كلمة المرور الخاصة بك</p>
              </div>
              <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                تغيير
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg" dir="rtl">
              <div>
                <h4 className="font-medium text-gray-800">إعدادات الخصوصية</h4>
                <p className="text-sm text-gray-600">إدارة إعدادات الخصوصية والأمان</p>
              </div>
              <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                إدارة
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg" dir="rtl">
              <div>
                <h4 className="font-medium text-red-800">حذف الحساب</h4>
                <p className="text-sm text-red-600">حذف حسابك نهائياً من النظام</p>
              </div>
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                حذف
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
