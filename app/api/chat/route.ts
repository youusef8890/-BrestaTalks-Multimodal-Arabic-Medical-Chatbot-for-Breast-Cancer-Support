import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("=== Chat API Route Called ===")

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      console.error("Backend URL not configured")
      return NextResponse.json(
        {
          error: "عذراً، لم يتم تكوين الخادم بشكل صحيح. يرجى التحقق من إعدادات الاتصال.",
        },
        { status: 500 },
      )
    }

    console.log("Backend URL:", backendUrl)

    let formData: FormData
    try {
      formData = await request.formData()
    } catch (parseError) {
      console.error("Failed to parse form data:", parseError)
      return NextResponse.json(
        {
          error: "خطأ في تحليل البيانات المرسلة",
        },
        { status: 400 },
      )
    }

    const question = formData.get("question") as string
    const image = formData.get("image") as File | null
    const imageMetadata = formData.get("imageMetadata") as string | null

    console.log("Question received:", question)
    console.log("Image received:", !!image)

    if (image) {
      console.log("Image details:", {
        name: image.name,
        size: image.size,
        type: image.type,
      })

      // Enhanced validation with better error messages
      const maxSize = 5 * 1024 * 1024 // 5MB max after optimization
      if (image.size > maxSize) {
        return NextResponse.json(
          {
            error: "حجم الصورة كبير جداً حتى بعد التحسين. يرجى استخدام صورة أصغر.",
          },
          { status: 413 },
        )
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          {
            error: "نوع الصورة غير مدعوم. يرجى استخدام صورة بصيغة JPG، PNG، أو WebP.",
          },
          { status: 422 },
        )
      }
    }

    if (!question || question.trim() === "") {
      console.error("No question provided")
      return NextResponse.json(
        {
          error: "السؤال مطلوب",
        },
        { status: 400 },
      )
    }

    // Prepare optimized request data
    const requestData = new FormData()
    requestData.append("question", question.trim())
    if (image) {
      requestData.append("image", image)
    }
    if (imageMetadata) {
      requestData.append("metadata", imageMetadata)
    }

    console.log("Sending optimized request to backend:", backendUrl + "/ask")

    // Optimized timeout based on image size and optimization
    let timeoutDuration = 30000 // 30 seconds for text
    if (image) {
      const sizeInMB = image.size / (1024 * 1024)
      // Much shorter timeout for optimized images
      timeoutDuration = Math.min(120000, Math.max(45000, sizeInMB * 8000)) // 8 seconds per MB, max 2 minutes
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration)

    let response: Response
    try {
      response = await fetch(backendUrl + "/ask", {
        method: "POST",
        body: requestData,
        signal: controller.signal,
        headers: {
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json, text/plain, */*",
          "Cache-Control": "no-cache",
          // Enhanced headers for faster processing
          "X-Image-Optimized": image ? "true" : "false",
          "X-Image-Size": image ? image.size.toString() : "0",
          "X-Processing-Mode": "fast",
          "X-Response-Format": "json",
          ...(imageMetadata && { "X-Image-Metadata": imageMetadata }),
        },
      })

      clearTimeout(timeoutId)
      console.log("Backend response status:", response.status)
      console.log("Backend response time:", Date.now())
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error("Fetch error:", fetchError)

      if (fetchError.name === "AbortError") {
        const timeoutMessage = image
          ? `انتهت مهلة معالجة الصورة (${Math.round(timeoutDuration / 1000)} ثانية). الصورة محسنة ولكن قد تحتاج وقت أكثر.`
          : "انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى."

        return NextResponse.json(
          {
            error: timeoutMessage,
          },
          { status: 408 },
        )
      }

      if (fetchError.message?.includes("fetch")) {
        return NextResponse.json(
          {
            error: "لا يمكن الاتصال بالخادم. يرجى التأكد من تشغيل الخادم الخلفي وصحة رابط ngrok.",
          },
          { status: 503 },
        )
      }

      return NextResponse.json(
        {
          error: `خطأ في الاتصال: ${fetchError.message}`,
        },
        { status: 500 },
      )
    }

    // Enhanced error handling
    if (!response.ok) {
      let errorText: string
      try {
        errorText = await response.text()
      } catch {
        errorText = "Unknown error"
      }

      console.error("Backend error response:", errorText)

      const errorMessages: { [key: number]: string } = {
        404: "لم يتم العثور على الخدمة. يرجى التأكد من تشغيل الخادم الخلفي.",
        502: "الخادم مشغول حالياً. يرجى المحاولة مرة أخرى خلال 30 ثانية.",
        503: "الخادم غير متاح مؤقتاً. يرجى المحاولة مرة أخرى.",
        413: "الصورة كبيرة جداً للمعالجة حتى بعد التحسين.",
        422: "لا يمكن معالجة هذه الصورة. يرجى المحاولة بصورة أخرى.",
        429: "تم تجاوز الحد المسموح. يرجى الانتظار 60 ثانية.",
      }

      const errorMessage = errorMessages[response.status] || `خطأ من الخادم (${response.status})`

      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: Math.min(response.status, 500) },
      )
    }

    // Fast response parsing
    let responseText: string
    try {
      responseText = await response.text()
      console.log("Backend response received, length:", responseText.length)

      if (image) {
        console.log("Optimized image processing completed successfully")
      }
    } catch (readError) {
      console.error("Failed to read response:", readError)
      return NextResponse.json(
        {
          error: "خطأ في قراءة الاستجابة من الخادم. يرجى المحاولة مرة أخرى.",
        },
        { status: 500 },
      )
    }

    // Validate response
    if (!responseText || responseText.trim().length === 0) {
      console.error("Empty response received")
      return NextResponse.json(
        {
          error: image
            ? "لم نتمكن من تحليل الصورة المحسنة. يرجى المحاولة مرة أخرى."
            : "تلقينا استجابة فارغة من الخادم.",
        },
        { status: 500 },
      )
    }

    // Parse response
    let data: any
    try {
      data = JSON.parse(responseText)
      console.log("Response parsed successfully")
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError)

      if (responseText.trim()) {
        const cleanedText = cleanArabicText(responseText.trim())
        console.log("Returning plain text response")
        return NextResponse.json({
          answer: cleanedText,
          processingMode: "optimized",
          responseType: "text",
        })
      }

      return NextResponse.json(
        {
          error: "تلقينا استجابة غير صحيحة من الخادم.",
        },
        { status: 500 },
      )
    }

    // Extract answer
    const answer = data.الجواب || data.answer || data.response || data.text

    if (!answer) {
      console.error("No answer found in response:", data)
      return NextResponse.json(
        {
          error: image ? "لم نتمكن من تحليل الصورة المحسنة بشكل صحيح." : "لم نتلق إجابة من الخادم.",
        },
        { status: 500 },
      )
    }

    const cleanedAnswer = cleanArabicText(answer)
    console.log("Sending optimized response back to client")

    return NextResponse.json({
      answer: cleanedAnswer,
      processingMode: "optimized",
      responseType: "json",
      hasImage: !!image,
      optimized: true,
    })
  } catch (error: any) {
    console.error("=== API Route Error ===")
    console.error("Error:", error)

    const errorMessages: { [key: string]: string } = {
      ECONNREFUSED: "لا يمكن الاتصال بالخادم. يرجى التأكد من تشغيل الخادم الخلفي.",
      ENOTFOUND: "عنوان الخادم غير صحيح. يرجى التحقق من إعدادات الاتصال.",
    }

    const errorMessage = errorMessages[error.code] || "حدث خطأ غير متوقع في الخادم."

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 503 },
    )
  }
}

// Enhanced text cleaning function
function cleanArabicText(text: string): string {
  if (!text) return text

  let cleaned = text
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\s*([،؛:.!?؟])\s*/g, "$1 ")
    .replace(/[ \t]+/g, " ")
    .replace(/^\s*:\s*/gm, "")
    .replace(/\s*:\s*$/gm, "")

  const lines = cleaned.split("\n")
  const filteredLines = lines.filter((line) => {
    const trimmedLine = line.trim()
    return trimmedLine.length > 0 && !/^[:\s،؛.!?؟]*$/.test(trimmedLine)
  })

  cleaned = filteredLines.join("\n")
  cleaned = cleaned
    .replace(/\n{3,}/g, "\n\n")
    .replace(/([.!?؟])\s*([أ-ي])/g, "$1 $2")
    .trim()

  return cleaned
}
