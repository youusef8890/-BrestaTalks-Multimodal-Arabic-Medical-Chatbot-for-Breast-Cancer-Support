"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Logo } from "@/components/branding/logo"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        // In a real app, check with your auth service
        const token = localStorage.getItem("auth_token")
        setIsAuthenticated(!!token)

        if (requireAuth && !token) {
          router.push("/auth/login")
          return
        }

        if (!requireAuth && token) {
          router.push("/chat")
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        if (requireAuth) {
          router.push("/auth/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [requireAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" className="justify-center mb-6 animate-pulse" />
          <Loader2 className="h-8 w-8 animate-spin text-pink-500 mx-auto" />
          <p className="text-gray-600 mt-4" dir="rtl">
            جاري التحميل...
          </p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect to login
  }

  if (!requireAuth && isAuthenticated) {
    return null // Will redirect to chat
  }

  return <>{children}</>
}
