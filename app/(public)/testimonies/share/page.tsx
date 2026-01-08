"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MotionInView } from "@/components/motion/MotionInView"
import { Textarea } from "@/components/ui/textarea"

const testimonySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().optional(),
  body: z.string().min(10, "Testimony must be at least 10 characters"),
})

type TestimonyFormData = z.infer<typeof testimonySchema>

export default function ShareTestimonyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonyFormData>({
    resolver: zodResolver(testimonySchema),
  })

  const onSubmit = async (data: TestimonyFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error("Failed to submit testimony")
      }
    } catch (error) {
      console.error("Error submitting testimony:", error)
      alert("Failed to submit testimony. Please try again.")
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
                Your testimony has been submitted and is pending approval. We'll review it and publish it soon.
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Share Your Testimony</CardTitle>
            <CardDescription>
              Tell us how God has worked in your life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="A short title for your testimony"
                />
              </div>

              <div>
                <Label htmlFor="body">Your Testimony *</Label>
                <Textarea
                  id="body"
                  {...register("body")}
                  placeholder="Share your story..."
                  rows={8}
                />
                {errors.body && (
                  <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Testimony"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </MotionInView>
    </div>
  )
}


