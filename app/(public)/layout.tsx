import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageTransition } from "@/components/motion/PageTransition"
import { IntroWrapper } from "@/components/IntroWrapper"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <IntroWrapper>
      <PageTransition>
        <div className="flex min-h-screen flex-col relative">
          {/* Background - white for all pages, homepage will override with black sections */}
          <div className="fixed inset-0 -z-20 bg-white"></div>
          {/* Subtle curved lines pattern - hidden on homepage with video */}
          <div className="fixed inset-0 -z-20 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 200 Q 250 150, 500 200 T 1000 200" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="2" fill="none" />
                <path d="M 0 400 Q 250 350, 500 400 T 1000 400" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="2" fill="none" />
                <path d="M 0 600 Q 250 550, 500 600 T 1000 600" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="2" fill="none" />
                <circle cx="200" cy="300" r="150" stroke="rgba(59, 130, 246, 0.05)" strokeWidth="1" fill="none" />
                <circle cx="800" cy="700" r="200" stroke="rgba(234, 179, 8, 0.05)" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </PageTransition>
    </IntroWrapper>
  )
}


