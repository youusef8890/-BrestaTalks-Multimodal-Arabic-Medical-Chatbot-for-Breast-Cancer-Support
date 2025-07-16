import { NextResponse } from "next/server"

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      return NextResponse.json(
        {
          status: "error",
          message: "Backend URL not configured",
          backendUrl: null,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    console.log("Testing backend connection to:", backendUrl)

    const testFormData = new FormData()
    testFormData.append("question", "connection test")

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    try {
      const response = await fetch(backendUrl + "/ask", {
        method: "POST",
        body: testFormData,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "User-Agent": "BRESTA-TALKS-Test/1.0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("Backend response status:", response.status)
      console.log("Backend response headers:", Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        // Try to read a small portion of the response to verify it's working
        const responseText = await response.text()
        const preview = responseText.substring(0, 100)

        return NextResponse.json({
          status: "success",
          backendUrl,
          responseStatus: response.status,
          responsePreview: preview,
          timestamp: new Date().toISOString(),
        })
      } else {
        const errorText = await response.text()
        return NextResponse.json({
          status: "error",
          backendUrl,
          responseStatus: response.status,
          error: `Backend returned ${response.status}: ${errorText.substring(0, 200)}`,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId)

      let errorMessage = "Unknown fetch error"
      let errorType = "unknown"

      if (fetchError.name === "AbortError") {
        errorMessage = "Request timeout (15 seconds)"
        errorType = "timeout"
      } else if (fetchError.message?.includes("fetch")) {
        errorMessage = "Network connection failed - cannot reach backend"
        errorType = "network"
      } else if (fetchError.code === "ECONNREFUSED") {
        errorMessage = "Connection refused - backend server not running"
        errorType = "connection_refused"
      } else if (fetchError.code === "ENOTFOUND") {
        errorMessage = "Backend URL not found - check ngrok URL"
        errorType = "not_found"
      } else {
        errorMessage = fetchError.message || "Unknown error"
        errorType = fetchError.name || "unknown"
      }

      return NextResponse.json({
        status: "error",
        backendUrl,
        error: errorMessage,
        errorType,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error: any) {
    console.error("Backend test error:", error)

    return NextResponse.json({
      status: "error",
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      error: error.message || "Unexpected error in test route",
      timestamp: new Date().toISOString(),
    })
  }
}
