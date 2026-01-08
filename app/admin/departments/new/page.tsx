"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  short_description: z.string().optional(),
  long_description: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal("")),
})

type DepartmentFormData = z.infer<typeof departmentSchema>

export default function NewDepartmentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  })

  const onSubmit = async (data: DepartmentFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate slug from name
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const response = await fetch("/api/admin/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug,
          short_description: data.short_description || null,
          long_description: data.long_description || null,
          contact_email: data.contact_email || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create department")
      }

      router.push("/admin/departments")
      router.refresh()
    } catch (err) {
      setError("Failed to create department. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/departments">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Department</CardTitle>
          <CardDescription>Create a new internal department</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name">Department Name *</Label>
              <Input id="name" {...register("name")} placeholder="Worship" />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="short_description">Short Description (Optional)</Label>
              <Input
                id="short_description"
                {...register("short_description")}
                placeholder="Brief description"
              />
            </div>

            <div>
              <Label htmlFor="long_description">Long Description (Optional)</Label>
              <Textarea
                id="long_description"
                {...register("long_description")}
                placeholder="Detailed description"
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="contact_email">Contact Email (Optional)</Label>
              <Input
                id="contact_email"
                type="email"
                {...register("contact_email")}
                placeholder="department@example.com"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Department"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


