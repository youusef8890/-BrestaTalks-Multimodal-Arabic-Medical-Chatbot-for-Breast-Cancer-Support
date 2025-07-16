"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, AlertCircle } from "lucide-react"

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [backendStatus, setBackendStatus] = useState<"connected" | "disconnected" | "checking">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkBackendConnection = async () => {
    setBackendStatus("checking")
    try {
      console.log("Testing backend connection through API route")

      // Test through our API route instead of directly to backend
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      try {
        const response = await fetch("/api/test-backend", {
          method: "GET",
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        clearTimeout(timeoutId)
        console.log("API test response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("API test response:", data)

          if (data.status === "success") {
            setBackendStatus("connected")
            console.log("Backend connection successful through API")
          } else {
            console.log("Backend connection failed:", data.error)
            setBackendStatus("disconnected")
          }
        } else {
          console.log("API test returned error status:", response.status)
          setBackendStatus("disconnected")
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        if (fetchError.name === "AbortError") {
          console.log("Backend connection test timeout")
        } else {
          console.error("API test fetch error:", fetchError)
        }
        setBackendStatus("disconnected")
      }

      setLastChecked(new Date())
    } catch (error) {
      console.error("Backend connection test failed:", error)
      setBackendStatus("disconnected")
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    const handleOnline = () => {
      console.log("Network came online")
      setIsOnline(true)
      // Recheck backend when network comes back
      setTimeout(checkBackendConnection, 2000)
    }

    const handleOffline = () => {
      console.log("Network went offline")
      setIsOnline(false)
      setBackendStatus("disconnected")
    }

    // Set initial online status
    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check connection after a longer delay to allow component to mount properly
    const timeoutId = setTimeout(() => {
      if (navigator.onLine) {
        checkBackendConnection()
      }
    }, 5000) // Increased to 5 seconds

    // Set up interval to check every 2 minutes (reduced frequency)
    const interval = setInterval(() => {
      if (navigator.onLine) {
        checkBackendConnection()
      }
    }, 120000) // Every 2 minutes

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearTimeout(timeoutId)
      clearInterval(interval)
    }
  }, [])

  if (!isOnline) {
    return (
      <div className="flex items-center space-x-2 text-red-600 text-sm" dir="rtl">
        <WifiOff className="h-4 w-4" />
        <span>لا يوجد اتصال بالإنترنت</span>
      </div>
    )
  }

  if (backendStatus === "disconnected") {
    return (
      <div className="flex items-center space-x-2 text-red-600 text-sm" dir="rtl">
        <AlertCircle className="h-4 w-4" />
        <span>الخادم غير متاح</span>
        {lastChecked && (
          <span className="text-xs">
            (آخر فحص:{" "}
            {lastChecked.toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            )
          </span>
        )}
        <button
          onClick={checkBackendConnection}
          className="text-xs underline hover:no-underline"
          disabled={backendStatus === "checking"}
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (backendStatus === "checking") {
    return (
      <div className="flex items-center space-x-2 text-yellow-600 text-sm" dir="rtl">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
        <span>جاري فحص الاتصال...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-green-600 text-sm" dir="rtl">
      <Wifi className="h-4 w-4" />
      <span>متصل</span>
      {lastChecked && (
        <span className="text-xs">
          (آخر فحص:{" "}
          {lastChecked.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          )
        </span>
      )}
    </div>
  )
}
