import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PlantDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Detail Tanaman</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Informasi spesifik dan riwayat pertumbuhan tanaman.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          Fitur Detail Tanaman sedang dalam tahap pengembangan.
        </CardContent>
      </Card>
    </div>
  )
}
