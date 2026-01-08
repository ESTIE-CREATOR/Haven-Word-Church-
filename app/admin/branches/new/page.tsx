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

const branchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal("")),
  contact_phone: z.string().optional(),
  pastor_name: z.string().optional(),
  description: z.string().optional(),
})

type BranchFormData = z.infer<typeof branchSchema>

export default function NewBranchPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
  })

  const onSubmit = async (data: BranchFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate slug from name
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const response = await fetch("/api/admin/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          slug,
          lat: data.lat ? parseFloat(data.lat) : null,
          lng: data.lng ? parseFloat(data.lng) : null,
          contact_email: data.contact_email || null,
          postcode: data.postcode || null,
          contact_phone: data.contact_phone || null,
          pastor_name: data.pastor_name || null,
          description: data.description || null,
          service_times: {},
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create branch")
      }

      router.push("/admin/branches")
      router.refresh()
    } catch (err) {
      setError("Failed to create branch. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/branches">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Branch</CardTitle>
          <CardDescription>Create a new church branch</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="name">Branch Name *</Label>
              <Input id="name" {...register("name")} placeholder="Haven Word Church Ibadan" />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input id="country" {...register("country")} placeholder="Nigeria" />
                {errors.country && (
                  <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" {...register("city")} placeholder="Ibadan" />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Input id="category" {...register("category")} placeholder="Main Campus" />
              {errors.category && (
                <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Full address"
                rows={2}
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="postcode">Postcode (Optional)</Label>
              <Input id="postcode" {...register("postcode")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lat">Latitude (Optional)</Label>
                <Input id="lat" type="number" step="any" {...register("lat")} />
              </div>
              <div>
                <Label htmlFor="lng">Longitude (Optional)</Label>
                <Input id="lng" type="number" step="any" {...register("lng")} />
              </div>
            </div>

            <div>
              <Label htmlFor="pastor_name">Pastor Name (Optional)</Label>
              <Input id="pastor_name" {...register("pastor_name")} />
            </div>

            <div>
              <Label htmlFor="contact_phone">Contact Phone (Optional)</Label>
              <Input id="contact_phone" {...register("contact_phone")} />
            </div>

            <div>
              <Label htmlFor="contact_email">Contact Email (Optional)</Label>
              <Input id="contact_email" type="email" {...register("contact_email")} />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Branch description"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Branch"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


