import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
}

const sizeMap = {
  sm: { width: 60, height: 60, textSize: "text-lg" },
  md: { width: 80, height: 80, textSize: "text-xl" },
  lg: { width: 120, height: 120, textSize: "text-2xl" },
  xl: { width: 160, height: 160, textSize: "text-3xl" },
}

export function Logo({ size = "md", className, showText = false }: LogoProps) {
  const { width, height, textSize } = sizeMap[size]

  return (
    <div className={cn("flex items-center space-x-3 rtl:space-x-reverse", className)}>
      <Image
        src="/logo.png"
        alt="BRESTA TALKS Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <div className="flex flex-col" dir="ltr">
          <span className={cn("font-bold text-pink-600", textSize)}>BRESTA TALKS</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">Your Breast Cancer Chat Bot</span>
        </div>
      )}
    </div>
  )
}
