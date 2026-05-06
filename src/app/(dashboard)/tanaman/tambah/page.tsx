import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"

export default function AddPlantPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/tanaman">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tambah Tanaman Baru</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Masukkan detail tanaman yang akan ditambahkan ke sistem.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Tanaman</CardTitle>
          <CardDescription>Isi data dengan lengkap untuk monitoring yang akurat.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Batch/Tanaman</label>
              <Input placeholder="Contoh: Selada A" className="w-full h-10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Jenis Tanaman</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="">Pilih Jenis</option>
                <option value="selada">Selada</option>
                <option value="pakcoy">Pakcoy</option>
                <option value="bayam">Bayam</option>
                <option value="kangkung">Kangkung</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Tanam</label>
              <Input type="date" className="w-full h-10 appearance-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estimasi Panen (Hari)</label>
              <Input type="number" placeholder="30" className="w-full h-10" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Lokasi Rack</label>
              <Input placeholder="Rack A-1" className="w-full h-10" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Catatan Khusus</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              placeholder="Catatan tambahan (opsional)"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Foto Tanaman</label>
            <div className="border-2 border-dashed rounded-lg p-6 md:p-10 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer border-muted-foreground/25">
              <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
              <p className="text-sm font-medium">Klik untuk upload foto</p>
              <p className="text-xs mt-1">SVG, PNG, JPG (Max. 2MB)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end gap-3 border-t p-6">
          <Link href="/tanaman" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">Batal</Button>
          </Link>
          <Button className="w-full sm:w-auto">Simpan Data</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
