import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Users } from "lucide-react"

export default async function AdminDepartmentsPage() {
  await requireRole(["admin"])

  const supabase = await createClient()
  const { data: departments } = await supabase
    .from("departments")
    .select("*")
    .order("name", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-muted-foreground">Manage internal departments (not shown on public site)</p>
        </div>
        <Button asChild>
          <Link href="/admin/departments/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Link>
        </Button>
      </div>

      {!departments || departments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No departments yet.</p>
            <Button asChild>
              <Link href="/admin/departments/new">Add Your First Department</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((dept) => (
            <Card key={dept.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{dept.name}</h3>
                    {dept.short_description && (
                      <p className="text-sm text-muted-foreground">{dept.short_description}</p>
                    )}
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/admin/departments/${dept.id}/edit`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


