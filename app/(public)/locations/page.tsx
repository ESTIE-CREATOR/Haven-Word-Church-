import Link from "next/link"
import { getBranches } from "@/lib/supabase/queries/branches"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MotionStagger } from "@/components/motion/MotionStagger"
import { MapPin, Phone, Mail } from "lucide-react"

export default async function LocationsPage() {
  const branches = await getBranches()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Our Locations</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Find a branch near you
        </p>
      </div>

      {branches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No branches available yet.</p>
        </div>
      ) : (
        <MotionStagger>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <Card key={branch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{branch.name}</CardTitle>
                  <CardDescription>{branch.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{branch.address}</p>
                    </div>
                    {branch.contact_phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{branch.contact_phone}</p>
                      </div>
                    )}
                    {branch.contact_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{branch.contact_email}</p>
                      </div>
                    )}
                    {branch.pastor_name && (
                      <p className="text-sm">
                        <span className="font-medium">Pastor:</span> {branch.pastor_name}
                      </p>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/locations/${branch.slug}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionStagger>
      )}
    </div>
  )
}


