"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

interface BrandHeaderProps {
  currentPage?: string
  onSidebarToggle?: () => void
  showSidebarToggle?: boolean
}

export function BrandHeader({ currentPage, onSidebarToggle, showSidebarToggle = false }: BrandHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "الرئيسية", key: "home" },
    { href: "/about", label: "حول", key: "about" },
    { href: "/contact", label: "اتصل بنا", key: "contact" },
    { href: "/profile", label: "الملف الشخصي", key: "profile" },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Sidebar Toggle (Only for chat page) */}
          {showSidebarToggle && (
            <Button variant="ghost" onClick={onSidebarToggle} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-medium transition-colors ${
                  currentPage === item.key ? "text-pink-600" : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Logo size="md" showText className="hover:opacity-80 transition-opacity" />
            </Link>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem("auth_token")
                window.location.href = "/auth/login"
              }}
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4" dir="rtl">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                    currentPage === item.key
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
