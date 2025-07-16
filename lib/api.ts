interface ChatResponse {
  answer?: string
  الجواب?: string
  error?: string
}

interface ImageMetadata {
  size: number
  type: string
  width?: number
  height?: number
  complexity?: number
}

export async function sendChatMessage(question: string, image?: File, metadata?: ImageMetadata): Promise<string> {
  try {
    console.log("=== Sending Chat Message ===")
    console.log("Question:", question)
    console.log("Has image:", !!image)
    console.log("Image metadata:", metadata)

    const formData = new FormData()
    formData.append("question", question)

    if (image) {
      console.log("Image details:", {
        name: image.name,
        size: image.size,
        type: image.type,
      })
      formData.append("image", image)

      // Add metadata to help backend optimize processing
      if (metadata) {
        formData.append("imageMetadata", JSON.stringify(metadata))
      }
    }

    console.log("Making request to /api/chat")

    // Use shorter timeout for optimized images
    const timeoutDuration = image ? (image.size > 1024 * 1024 ? 120000 : 60000) : 30000

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
        signal: controller.signal,
        headers: {
          // Add processing hints
          "X-Processing-Priority": image ? "image" : "text",
          "X-Expected-Response-Time": image ? "fast" : "immediate",
        },
      })

      clearTimeout(timeoutId)
      console.log("Response status:", response.status)

      if (!response.ok) {
        let errorText: string
        try {
          errorText = await response.text()
          console.error("Error response text:", errorText)
        } catch {
          errorText = `HTTP ${response.status}`
        }

        throw new Error(`خطأ في الاتصال بالخادم: ${response.status} - ${errorText}`)
      }

      let data: ChatResponse
      try {
        const responseText = await response.text()
        console.log("Raw response length:", responseText.length)
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Failed to parse response:", parseError)
        throw new Error("خطأ في تحليل استجابة الخادم")
      }

      console.log("Parsed response:", data)

      if (data.error) {
        console.error("Backend Error:", data.error)
        throw new Error(data.error)
      }

      const answer = data.الجواب || data.answer

      if (!answer) {
        console.error("No answer in response:", data)
        throw new Error("لم نتلق إجابة من الخادم")
      }

      console.log("Successfully received answer")
      return answer
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      if (fetchError.name === "AbortError") {
        throw new Error(
          image ? "انتهت مهلة معالجة الصورة. يرجى المحاولة بصورة أصغر." : "انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.",
        )
      }
      throw fetchError
    }
  } catch (error) {
    console.error("=== Chat API Client Error ===")
    console.error("Error:", error)

    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.")
    }
  }
}
