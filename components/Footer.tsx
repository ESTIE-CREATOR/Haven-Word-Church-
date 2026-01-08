import Link from "next/link"
import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-gray-300">
              Haven Word Church - The Spread City
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/messages" className="text-gray-300 hover:text-white">
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Opposite Gate 5, Behind Adamasingba Stadium</li>
              <li>Ibadan, Oyo State, Nigeria</li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Get Directions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Haven Word Church. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
