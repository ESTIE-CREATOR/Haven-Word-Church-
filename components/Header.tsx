"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Logo } from "./Logo"
import { Button } from "./ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/messages", label: "Messages" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/giving", label: "Giving" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-2">
      <div 
        className={`flex items-center justify-between mx-auto max-w-7xl backdrop-blur-md shadow-lg border transition-all duration-300 ${
          isScrolled ? "rounded-[2rem] px-3 py-1.5" : "rounded-[2rem] px-4 py-2.5"
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <div className={`transition-all duration-300 ${isScrolled ? "scale-85" : "scale-95"}`}>
          <Logo size="sm" />
        </div>
        
        {/* Desktop Navigation - moved to the right */}
        <nav className={`hidden md:flex items-center transition-all duration-300 ml-auto ${
          isScrolled ? "gap-3" : "gap-5"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium text-white transition-colors hover:text-primary ${
                isScrolled ? "text-xs" : "text-sm"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav 
          className={`md:hidden border-t backdrop-blur-md transition-all duration-300 ${
            isScrolled ? "mt-2" : "mt-4"
          }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <div className={`container flex flex-col transition-all duration-300 ${
            isScrolled ? "py-3 gap-3" : "py-4 gap-4"
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-white transition-colors hover:text-primary ${
                  isScrolled ? "text-xs" : "text-sm"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
