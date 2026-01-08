import { MotionInView } from "@/components/motion/MotionInView"
import { Card, CardContent } from "@/components/ui/card"

export default function MarriagePage() {
  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Marriage & Family</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg">
                  We believe in the sanctity of marriage and the importance of strong families. Our marriage and family resources are designed to help couples build healthy, God-centered relationships.
                </p>
                <p className="text-muted-foreground">
                  Whether you're engaged, newly married, or have been together for years, we have resources to help strengthen your relationship.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


