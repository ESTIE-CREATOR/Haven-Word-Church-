import { notFound } from "next/navigation"
import { getBranchBySlug, getBranches } from "@/lib/supabase/queries/branches"
import { MapLocator } from "@/components/MapLocator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  try {
    const branches = await getBranches()
    return branches.map((branch) => ({
      slug: branch.slug,
    }))
  } catch {
    return []
  }
}

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let branch
  try {
    branch = await getBranchBySlug(slug)
  } catch (error) {
    notFound()
  }

  if (!branch.lat || !branch.lng) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Location coordinates not available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`
  }

  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{branch.name}</CardTitle>
              <CardDescription>{branch.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {branch.description && (
                <p className="text-muted-foreground">{branch.description}</p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Address
                    </h3>
                    <p className="text-sm text-muted-foreground">{branch.address}</p>
                    {branch.postcode && (
                      <p className="text-sm text-muted-foreground">{branch.postcode}</p>
                    )}
                  </div>

                  {branch.service_times && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Service Times
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {Object.entries(branch.service_times as Record<string, string>).map(
                          ([day, time]) => (
                            <p key={day}>
                              <span className="font-medium">{day}:</span> {time}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {branch.pastor_name && (
                    <div>
                      <h3 className="font-semibold mb-2">Pastor</h3>
                      <p className="text-sm text-muted-foreground">{branch.pastor_name}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {branch.contact_phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${branch.contact_phone}`}
                          className="text-primary hover:underline"
                        >
                          {branch.contact_phone}
                        </a>
                      </div>
                    )}
                    {branch.contact_email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${branch.contact_email}`}
                          className="text-primary hover:underline"
                        >
                          {branch.contact_email}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full">
                    <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </div>

                <div>
                  <MapLocator
                    lat={branch.lat}
                    lng={branch.lng}
                    name={branch.name}
                    address={branch.address}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}

