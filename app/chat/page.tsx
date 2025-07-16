"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  Mic,
  MicOff,
  ImageIcon,
  X,
  Loader2,
  MessageCircle,
  Plus,
  Copy,
  Check,
  Clock,
  Zap,
  Gauge,
  Sparkles,
} from "lucide-react"
import { BrandHeader } from "@/components/branding/brand-header"
import { Logo } from "@/components/branding/logo"
import { sendChatMessage } from "@/lib/api"
import { ImageOptimizer } from "@/lib/image-optimizer"
import Image from "next/image"
import { ConnectionStatus } from "@/components/ui/connection-status"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  isArabic?: boolean
  image?: string
  imageFile?: File
  processingTime?: number
  hasImage?: boolean
  optimized?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [processingStartTime, setProcessingStartTime] = useState<number | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null)
  const [optimizationStats, setOptimizationStats] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced timer for processing estimation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading && processingStartTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - processingStartTime
        if (selectedImage && optimizationStats) {
          // Much more accurate estimation based on optimization
          const baseTime = 15000 // 15 seconds base
          const sizeMultiplier = optimizationStats.optimizedSize / (1024 * 1024) // MB
          const estimatedTotal = baseTime + sizeMultiplier * 5000 // 5 seconds per MB
          setEstimatedTime(Math.max(0, estimatedTotal - elapsed))
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLoading, processingStartTime, selectedImage, optimizationStats])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "ar-SA"

        recognitionInstance.onstart = () => setIsListening(true)
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputValue(transcript)
          setIsListening(false)
          setIsRecording(false)
        }
        recognitionInstance.onerror = (event: any) => {
          setIsListening(false)
          setIsRecording(false)
          let errorMessage = "حدث خطأ في التعرف على الصوت"
          switch (event.error) {
            case "no-speech":
              errorMessage = "لم يتم اكتشاف صوت. يرجى المحاولة مرة أخرى."
              break
            case "audio-capture":
              errorMessage = "لا يمكن الوصول إلى الميكروفون."
              break
            case "not-allowed":
              errorMessage = "تم رفض الوصول إلى الميكروفون."
              break
          }
          alert(errorMessage)
        }
        recognitionInstance.onend = () => {
          setIsListening(false)
          setIsRecording(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [])

  const isArabicText = (text: string) => {
    const arabicPattern = /[\u0600-\u06FF]/
    return arabicPattern.test(text)
  }

  // Enhanced message formatting
  const formatMessageContent = (content: string) => {
    if (!content) return <p>لا يوجد محتوى</p>

    const sections = content.split(/\n\s*\n/).filter((section) => section.trim())

    if (sections.length === 0) {
      return <p className="text-gray-500">لا يوجد محتوى متاح</p>
    }

    return sections
      .map((section, index) => {
        const trimmedSection = section.trim()
        if (trimmedSection.length < 2) return null

        if (trimmedSection.match(/^\d+[.\-)]/)) {
          const items = trimmedSection.split(/\n/).filter((item) => item.trim())
          return (
            <div key={index} className="mb-4">
              <ol className="space-y-2 pr-4">
                {items.map((item, itemIndex) => {
                  const cleanItem = item.replace(/^\d+[.\-)]\s*/, "").trim()
                  if (cleanItem.length < 2) return null
                  return (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-pink-500 ml-3 font-medium min-w-[20px]">{itemIndex + 1}.</span>
                      <span className="flex-1 leading-relaxed">{cleanItem}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        }

        if (trimmedSection.match(/^[-•*]/m)) {
          const items = trimmedSection.split(/\n/).filter((item) => item.trim())
          return (
            <div key={index} className="mb-4">
              <ul className="space-y-2 pr-4">
                {items.map((item, itemIndex) => {
                  const cleanItem = item.replace(/^[-•*]\s*/, "").trim()
                  if (cleanItem.length < 2) return null
                  return (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-pink-500 ml-3 mt-1">•</span>
                      <span className="flex-1 leading-relaxed">{cleanItem}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }

        const paragraphLines = trimmedSection.split(/\n/).filter((line) => line.trim())
        return (
          <div key={index} className="mb-4">
            <div className="leading-relaxed text-gray-800 space-y-1">
              {paragraphLines.map((line, lineIndex) => (
                <div key={lineIndex}>{line.trim()}</div>
              ))}
            </div>
          </div>
        )
      })
      .filter(Boolean)
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return

    let imageDataUrl = null
    let optimizedImage = selectedImage
    let imageMetadata = null

    if (selectedImage) {
      setIsOptimizing(true)
      try {
        console.log("Starting advanced image optimization...")
        const optimization = await ImageOptimizer.optimizeImage(selectedImage)
        optimizedImage = optimization.optimized
        imageDataUrl = optimization.thumbnail
        setOptimizationStats(optimization.stats)

        // Create metadata for backend
        imageMetadata = {
          size: optimization.optimized.size,
          type: optimization.optimized.type,
          originalSize: selectedImage.size,
          compressionRatio: optimization.stats.compressionRatio,
        }

        console.log("Image optimization completed:", optimization.stats)
      } catch (error) {
        console.error("Image optimization failed:", error)
        // Fallback to original image
        const reader = new FileReader()
        imageDataUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(selectedImage)
        })
      } finally {
        setIsOptimizing(false)
      }
    }

    const startTime = Date.now()
    setProcessingStartTime(startTime)

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue || "تم إرسال صورة محسنة",
      timestamp: new Date(),
      isArabic: isArabicText(inputValue),
      image: imageDataUrl,
      imageFile: optimizedImage || selectedImage,
      hasImage: !!selectedImage,
      optimized: !!optimizationStats,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    const currentImage = optimizedImage || selectedImage
    setInputValue("")
    setSelectedImage(null)
    setImagePreview(null)
    setOptimizationStats(null)
    setIsLoading(true)

    // Set realistic estimated time for optimized images
    if (currentImage && optimizationStats) {
      const sizeInMB = optimizationStats.optimizedSize / (1024 * 1024)
      const estimated = Math.max(15000, sizeInMB * 5000) // 5 seconds per MB, minimum 15 seconds
      setEstimatedTime(estimated)
    }

    try {
      console.log("Sending optimized message...")
      const answer = await sendChatMessage(currentInput, currentImage || undefined, imageMetadata)

      const processingTime = Date.now() - startTime
      console.log("Optimized processing completed in:", processingTime, "ms")

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: answer,
        timestamp: new Date(),
        isArabic: true,
        processingTime,
        hasImage: !!currentImage,
        optimized: true,
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error in sendMessage:", error)

      let errorMessage = "عذراً، حدث خطأ أثناء معالجة طلبك."

      if (error instanceof Error) {
        if (error.message.includes("timeout") || error.message.includes("انتهت مهلة")) {
          errorMessage = currentImage
            ? "معالجة الصورة المحسنة استغرقت وقتاً أطول من المتوقع. يرجى المحاولة مرة أخرى."
            : "انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى."
        } else {
          errorMessage = error.message
        }
      }

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: errorMessage,
        timestamp: new Date(),
        isArabic: true,
      }

      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
      setProcessingStartTime(null)
      setEstimatedTime(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صحيح")
        return
      }

      const maxSize = 20 * 1024 * 1024 // 20MB max before optimization
      if (file.size > maxSize) {
        alert("حجم الصورة كبير جداً. يرجى اختيار صورة أصغر من 20 ميجابايت")
        return
      }

      setSelectedImage(file)

      // Generate immediate preview
      try {
        const thumbnail = await ImageOptimizer.generateThumbnail(file, 200)
        setImagePreview(thumbnail)
      } catch (error) {
        console.error("Failed to generate thumbnail:", error)
        // Fallback to FileReader
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target?.result as string)
        reader.readAsDataURL(file)
      }
    }
  }

  const removeSelectedImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setOptimizationStats(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleRecording = useCallback(() => {
    if (!recognition) {
      alert("التعرف على الصوت غير مدعوم في هذا المتصفح. يرجى استخدام Chrome أو Edge.")
      return
    }

    if (isRecording || isListening) {
      recognition.stop()
      setIsRecording(false)
      setIsListening(false)
    } else {
      try {
        setIsRecording(true)
        recognition.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        setIsRecording(false)
        alert("خطأ في بدء التعرف على الصوت.")
      }
    }
  }, [recognition, isRecording, isListening])

  const quickReplies = [
    "ما أنواع أمراض الثدي؟",
    "ما أسباب آلام الثدي؟",
    "ما هي العوامل التي تزيد من احتمالية الإصابة بسرطان الثدي؟",
    "ما هي علامات سرطان الثدي؟",
    "كيف يمكن تقليل خطر الإصابة بسرطان الثدي؟",
  ]

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }
    return `${seconds}s`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Logo size="sm" />
              <h2 className="text-xl font-bold text-pink-600" dir="rtl">
                BRESTA TALKS
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <Button
            className="w-full mb-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-md"
            onClick={() => {
              setMessages([])
              setInputValue("")
              setSelectedImage(null)
              setImagePreview(null)
              setOptimizationStats(null)
            }}
          >
            <Plus className="h-4 w-4 mr-2 rtl:ml-2" />
            محادثة جديدة
          </Button>

          {/* Speed Optimization Notice */}
          <div
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6"
            dir="rtl"
          >
            <h4 className="font-medium text-green-800 mb-2 flex items-center">
              <Sparkles className="h-4 w-4 ml-2" />
              معالجة فائقة السرعة
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• ضغط تلقائي ذكي للصور</li>
              <li>• تحويل إلى WebP للسرعة</li>
              <li>• معالجة في أقل من دقيقة</li>
              <li>• تحسين تلقائي للجودة</li>
            </ul>
          </div>

          {/* Performance Stats */}
          {optimizationStats && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" dir="rtl">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Gauge className="h-4 w-4 ml-2" />
                إحصائيات التحسين
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>الحجم الأصلي: {Math.round(optimizationStats.originalSize / 1024)} KB</div>
                <div>الحجم المحسن: {Math.round(optimizationStats.optimizedSize / 1024)} KB</div>
                <div>نسبة الضغط: {optimizationStats.compressionRatio}%</div>
                <div>وقت التحسين: {optimizationStats.processingTime}ms</div>
              </div>
            </div>
          )}

          {/* Chat History Section */}
          <div dir="rtl">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">سجل المحادثات</h3>
            <div className="space-y-3">
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد محادثات سابقة</p>
                <p className="text-sm text-gray-400 mt-2">ابدأ محادثة جديدة لرؤية السجل هنا</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="transition-all duration-300 lg:ml-80">
        {/* Header */}
        <BrandHeader currentPage="chat" />

        {/* Chat Container */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center py-12" dir="rtl">
                  <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 p-2">
                    <Logo size="md" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">مرحباً! أنا BRESTA TALKS</h3>
                  <p className="text-gray-600 mb-8">مساعدك الذكي لدعم سرطان الثدي. كيف يمكنني مساعدتك اليوم؟</p>

                  {/* Ultra-Fast Processing Notice */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <Sparkles className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800" dir="rtl">
                        <p className="font-medium mb-1">معالجة فائقة السرعة:</p>
                        <p>تحسين تلقائي للصور + ضغط ذكي = إجابات في ثوانٍ!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-6 group`}
                >
                  <div
                    className={`max-w-xs lg:max-w-3xl px-5 py-4 rounded-2xl shadow-sm relative ${
                      message.type === "user"
                        ? "bg-pink-500 text-white"
                        : "bg-white border border-gray-100 text-gray-800"
                    } ${message.isArabic ? "text-right" : "text-left"}`}
                    dir={message.isArabic ? "rtl" : "ltr"}
                  >
                    {/* Copy button for bot messages */}
                    {message.type === "bot" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                        onClick={() => copyMessage(message.content, message.id)}
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    )}

                    {message.image && (
                      <div className="mb-3">
                        <div className="relative rounded-lg overflow-hidden bg-white/20 p-1">
                          <Image
                            src={message.image || "/placeholder.svg"}
                            alt="صورة مرفقة"
                            width={200}
                            height={200}
                            className="w-full h-auto max-h-48 object-cover rounded-lg"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=200&width=200"
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center">
                            {message.optimized && <Zap className="h-3 w-3 ml-1" />}
                            {message.imageFile?.name || "صورة"}
                          </div>
                        </div>
                      </div>
                    )}

                    {message.content && (
                      <div className="text-content">
                        {message.type === "bot" ? (
                          <div className="space-y-1">{formatMessageContent(message.content)}</div>
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        )}
                      </div>
                    )}

                    <div
                      className={`text-xs mt-3 flex items-center justify-between ${message.type === "user" ? "text-pink-100" : "text-gray-400"}`}
                    >
                      <span>
                        {message.timestamp.toLocaleTimeString("ar-EG", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div className="flex items-center space-x-2">
                        {message.type === "bot" && (
                          <>
                            <span>{message.content.length} حرف</span>
                            {message.processingTime && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 ml-1" />
                                {formatTime(message.processingTime)}
                                {message.hasImage && <span className="mr-1">📷</span>}
                                {message.optimized && <Zap className="h-3 w-3 mr-1 text-green-500" />}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Loading Indicator */}
              {(isLoading || isOptimizing) && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white shadow-md rounded-2xl px-4 py-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-pink-500" />
                    <div className="text-gray-600" dir="rtl">
                      {isOptimizing ? (
                        <span>جاري تحسين الصورة...</span>
                      ) : selectedImage ? (
                        <div className="flex flex-col">
                          <span>جاري معالجة الصورة المحسنة...</span>
                          {estimatedTime && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Sparkles className="h-3 w-3 ml-1" />
                              الوقت المتبقي: {formatTime(estimatedTime)}
                            </span>
                          )}
                        </div>
                      ) : (
                        "جاري الكتابة..."
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Recording Indicator */}
              {(isRecording || isListening) && (
                <div className="flex justify-center mb-4">
                  <div className="bg-red-100 border border-red-300 rounded-2xl px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-700 text-sm" dir="rtl">
                      {isListening ? "جاري الاستماع... تحدث الآن" : "جاري التحضير..."}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-2 text-center" dir="rtl">
                <p className="text-sm text-gray-600">اقتراحات سريعة:</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-sm border-pink-200 text-pink-700 hover:bg-pink-50 rounded-full bg-transparent"
                    onClick={() => {
                      setInputValue(reply)
                      setTimeout(() => sendMessage(), 100)
                    }}
                    disabled={isLoading || isOptimizing}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Input Area */}
          <div className="border-t bg-white/80 backdrop-blur-lg p-4">
            <div className="max-w-4xl mx-auto">
              {selectedImage && imagePreview && (
                <div className="mb-4 p-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg border border-pink-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-pink-700 font-medium flex items-center">
                      <Sparkles className="h-4 w-4 ml-1" />
                      صورة محسنة:
                    </span>
                    <Button variant="ghost" size="sm" onClick={removeSelectedImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative rounded-lg overflow-hidden bg-white p-2">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="معاينة الصورة"
                      width={150}
                      height={150}
                      className="w-full max-w-xs h-auto max-h-32 object-cover rounded-lg mx-auto"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=150&width=150"
                      }}
                    />
                    <div className="text-xs text-gray-600 mt-2 text-center">
                      {selectedImage.name} ({Math.round(selectedImage.size / 1024)} KB)
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-600 text-center flex items-center justify-center" dir="rtl">
                    <Zap className="h-3 w-3 ml-1" />
                    سيتم تحسين الصورة تلقائياً للحصول على أسرع معالجة ممكنة
                  </div>
                </div>
              )}

              {/* Connection Status */}
              <div className="mb-2 flex justify-center">
                <ConnectionStatus />
              </div>

              <div className="flex items-end space-x-2 rtl:space-x-reverse">
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب سؤالك هنا..."
                    className="rounded-full border-pink-200 focus:border-pink-500 text-right"
                    dir="rtl"
                    disabled={isLoading || isOptimizing}
                  />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full border-pink-200 hover:bg-pink-50"
                  disabled={isLoading || isOptimizing}
                  title="رفع صورة (سيتم تحسينها تلقائياً)"
                >
                  <ImageIcon className="h-5 w-5 text-pink-600" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleRecording}
                  className={`rounded-full border-pink-200 hover:bg-pink-50 ${
                    isRecording || isListening ? "bg-red-100 border-red-300" : ""
                  }`}
                  disabled={isLoading || isOptimizing}
                  title={isRecording || isListening ? "اضغط لإيقاف التسجيل" : "اضغط للتحدث"}
                >
                  {isRecording || isListening ? (
                    <MicOff className="h-5 w-5 text-red-600" />
                  ) : (
                    <Mic className="h-5 w-5 text-pink-600" />
                  )}
                </Button>

                <Button
                  onClick={sendMessage}
                  disabled={(!inputValue.trim() && !selectedImage) || isLoading || isOptimizing}
                  className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6"
                >
                  {isLoading || isOptimizing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-2" dir="rtl">
                ⚡ معالجة فائقة السرعة • تحسين تلقائي للصور • ضغط ذكي • إجابات في ثوانٍ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
