import { requireRole } from "@/lib/supabase/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

export default async function AdminSettingsPage() {
  await requireRole(["admin"])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage site settings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>Site Information</CardTitle>
          </div>
          <CardDescription>Update site name, social links, and CTA links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site_name">Site Name</Label>
            <Input id="site_name" defaultValue="HAVEN WORD CHURCH" />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook URL</Label>
            <Input id="facebook" type="url" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input id="twitter" type="url" placeholder="https://twitter.com/..." />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input id="instagram" type="url" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <Label htmlFor="youtube">YouTube URL</Label>
            <Input id="youtube" type="url" placeholder="https://youtube.com/..." />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}


