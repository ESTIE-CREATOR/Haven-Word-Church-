import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Privacy Policy</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="text-muted-foreground">
                  Haven Word Church is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                </p>
                <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information that you provide directly to us, such as when you fill out forms, contact us, or submit testimonies.
                </p>
                <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  We use the information we collect to communicate with you, process your requests, and improve our services.
                </p>
                <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


