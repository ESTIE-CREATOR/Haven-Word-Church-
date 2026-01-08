import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function GivingPage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">Giving</h1>
            <p className="text-muted-foreground">
              Your generous giving helps us spread the Word of God and impact lives
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-secondary" />
                <CardTitle>Ways to Give</CardTitle>
              </div>
              <CardDescription>
                We offer multiple convenient ways for you to give
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bank Transfer</h3>
                <p className="text-sm text-muted-foreground">
                  You can make a direct bank transfer to our account. Please contact us for account details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Online Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Secure online payment options will be available soon.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">In-Person</h3>
                <p className="text-sm text-muted-foreground">
                  You can give during our services at any of our locations.
                </p>
              </div>
              <Button asChild className="w-full">
                <a href="/contact">Contact Us for More Information</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


