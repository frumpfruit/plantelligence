import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, MoreHorizontal } from "lucide-react"

const plants = [
  {
    id: "PLN-001",
    name: "Selada A",
    type: "Selada (Lettuce)",
    age: "14 Hari",
    status: "Sehat",
    harvest: "16 Hari lagi",
    location: "Rack A-1",
  },
  {
    id: "PLN-002",
    name: "Pakcoy B",
    type: "Pakcoy",
    age: "20 Hari",
    status: "Sehat",
    harvest: "10 Hari lagi",
    location: "Rack B-2",
  },
  {
    id: "PLN-003",
    name: "Bayam Hijau",
    type: "Bayam",
    age: "18 Hari",
    status: "Warning",
    harvest: "12 Hari lagi",
    location: "Rack C-1",
  },
  {
    id: "PLN-004",
    name: "Kangkung",
    type: "Kangkung",
    age: "10 Hari",
    status: "Sehat",
    harvest: "20 Hari lagi",
    location: "Rack D-1",
  },
]

export default function PlantListPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daftar Tanaman</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola dan pantau seluruh tanaman di farm Anda.
          </p>
        </div>
        <Link href="/tanaman/tambah" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto gap-2">
            <Plus className="h-4 w-4" />
            Tambah Tanaman
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4 border-b">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari tanaman..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">ID</TableHead>
                  <TableHead className="whitespace-nowrap">Nama Tanaman</TableHead>
                  <TableHead className="whitespace-nowrap">Jenis</TableHead>
                  <TableHead className="whitespace-nowrap">Lokasi</TableHead>
                  <TableHead className="whitespace-nowrap">Umur</TableHead>
                  <TableHead className="whitespace-nowrap">Estimasi Panen</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plants.map((plant) => (
                  <TableRow key={plant.id}>
                    <TableCell className="font-medium whitespace-nowrap">{plant.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{plant.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{plant.type}</TableCell>
                    <TableCell className="whitespace-nowrap">{plant.location}</TableCell>
                    <TableCell className="whitespace-nowrap">{plant.age}</TableCell>
                    <TableCell className="whitespace-nowrap">{plant.harvest}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {plant.status === "Sehat" ? (
                        <Badge variant="success">Sehat</Badge>
                      ) : (
                        <Badge variant="warning">Warning</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
