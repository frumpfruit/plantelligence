import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Building, Camera } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil User</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola informasi akun dan preferensi pribadi Anda.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar profil */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-background shadow-md">
                  <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Profile picture" />
                  <AvatarFallback className="text-4xl">AR</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">Ahmad Reza</h3>
              <p className="text-sm text-muted-foreground">Admin Pertanian</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                  ahmad.reza@plantelligence.id
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  +62 812-3456-7890
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                  Bandung, Jawa Barat
                </div>
                <div className="flex items-center text-sm">
                  <Building className="w-4 h-4 mr-3 text-muted-foreground" />
                  Kebun Sayur Lembang
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form konten */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Perbarui detail pribadi Anda di sini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Depan</label>
                  <Input defaultValue="Ahmad" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Belakang</label>
                  <Input defaultValue="Reza" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="ahmad.reza@plantelligence.id" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nomor Telepon</label>
                <Input defaultValue="+62 812-3456-7890" type="tel" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alamat</label>
                <Input defaultValue="Jl. Raya Lembang No. 123, Bandung" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button>Simpan Perubahan</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>
                Kelola password dan keamanan akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password Saat Ini</label>
                <Input type="password" placeholder="Masukkan password saat ini" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Baru</label>
                  <Input type="password" placeholder="Masukkan password baru" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Konfirmasi Password</label>
                  <Input type="password" placeholder="Ulangi password baru" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button variant="outline" className="mr-2">Batal</Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
