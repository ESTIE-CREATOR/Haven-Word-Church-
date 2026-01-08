import { requireRole } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { DollarSign } from "lucide-react"

export default async function AdminGivingPage() {
  await requireRole(["admin", "finance"])

  const supabase = await createClient()
  const { data: givingRecords } = await supabase
    .from("giving_records")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  const totalAmount = givingRecords?.reduce((sum, record) => sum + Number(record.amount || 0), 0) || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Giving Records</h1>
        <p className="text-muted-foreground">View giving records (read-only)</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Giving</p>
              <p className="text-2xl font-bold">₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!givingRecords || givingRecords.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No giving records yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {givingRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">₦{Number(record.amount).toLocaleString()}</p>
                    {record.donor_name && (
                      <p className="text-sm text-muted-foreground">{record.donor_name}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(record.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      record.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : record.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


