"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MotionInView } from "@/components/motion/MotionInView"
import { Users } from "lucide-react"

const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interests: z.string().min(5, "Please tell us your interests"),
})

type VolunteerFormData = z.infer<typeof volunteerSchema>

export default function GetInvolvedPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  })

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting:", error)
      alert("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container py-12">
        <MotionInView>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-muted-foreground">
                We've received your information and will contact you soon about getting involved.
              </p>
            </CardContent>
          </Card>
        </MotionInView>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <MotionInView>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-semibold">Get Involved</h1>
            </div>
            <p className="text-muted-foreground">
              Join us in spreading the Word of God and making a difference in our community
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer with Us</CardTitle>
              <CardDescription>
                Tell us how you'd like to get involved
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="+234-xxx-xxx-xxxx"
                  />
                </div>

                <div>
                  <Label htmlFor="interests">How would you like to get involved? *</Label>
                  <Textarea
                    id="interests"
                    {...register("interests")}
                    placeholder="Tell us about your interests, skills, and how you'd like to serve..."
                    rows={6}
                  />
                  {errors.interests && (
                    <p className="text-sm text-destructive mt-1">{errors.interests.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </MotionInView>
    </div>
  )
}


