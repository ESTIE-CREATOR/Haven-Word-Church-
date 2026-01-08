import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Haven Word Church",
  description: "Haven Word Church - The Spread City",
  icons: {
    icon: [
      { url: "/pictures/logo/20260103_114553_0000.png", type: "image/png" },
    ],
    apple: "/pictures/logo/20260103_114553_0000.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


