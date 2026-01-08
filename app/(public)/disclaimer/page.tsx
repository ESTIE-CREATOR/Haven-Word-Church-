import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function DisclaimerPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Disclaimer</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground">
                  The information on this website is provided on an "as is" basis. Haven Word Church makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
                </p>
                <p className="text-muted-foreground">
                  Any reliance you place on such information is strictly at your own risk. In no event will Haven Word Church be liable for any loss or damage arising from the use of this website.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


