import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

export default function GovernancePage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Governance & Policies</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  Haven Word Church is committed to transparency, accountability, and biblical governance. Our policies and procedures ensure that we operate with integrity and in accordance with God's Word.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Policy Documents
              </h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Our policy documents are available upon request. Please contact us for more information.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


