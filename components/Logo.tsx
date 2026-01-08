import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="/pictures/logo/20260103_114553_0000.png"
          alt="Haven Word Church Logo"
          width={size === "sm" ? 48 : size === "md" ? 64 : 96}
          height={size === "sm" ? 48 : size === "md" ? 64 : 96}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </Link>
  )
}


