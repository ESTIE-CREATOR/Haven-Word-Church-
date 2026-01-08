import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileAudio, FileVideo, Image as ImageIcon, File } from "lucide-react"

export default async function AdminUploadsPage() {
  await requireRole(["admin", "media"])

  const supabase = await createClient()
  const { data: uploads } = await supabase
    .from("upload_assets")
    .select("*")
    .order("created_at", { ascending: false })

  const getIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <FileAudio className="h-5 w-5" />
      case "video":
        return <FileVideo className="h-5 w-5" />
      case "image":
        return <ImageIcon className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Upload Manager</h1>
          <p className="text-muted-foreground">Manage uploaded media assets</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      {!uploads || uploads.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No uploads yet.</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First File
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {uploads.map((upload) => (
            <Card key={upload.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getIcon(upload.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{upload.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {(upload.size_bytes / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


