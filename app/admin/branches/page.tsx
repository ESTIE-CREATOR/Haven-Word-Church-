import { requireRole } from "@/lib/supabase/auth"
import { getBranches } from "@/lib/supabase/queries/branches"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, MapPin } from "lucide-react"

export default async function AdminBranchesPage() {
  await requireRole(["admin"])

  const branches = await getBranches()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Branches</h1>
          <p className="text-muted-foreground">Manage church branches</p>
        </div>
        <Button asChild>
          <Link href="/admin/branches/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Branch
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {branches.map((branch) => (
          <Card key={branch.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{branch.name}</h3>
                  <p className="text-sm text-muted-foreground">{branch.address}</p>
                  <p className="text-sm text-muted-foreground">{branch.city}, {branch.country}</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/admin/branches/${branch.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


