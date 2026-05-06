"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Building, Camera, Loader2, Save, KeyRound, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

export default function ProfilePage() {
  const { showToast } = useToast()

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: "Ahmad",
    lastName: "Reza",
    email: "ahmad.reza@plantelligence.id",
    phone: "+62 812-3456-7890",
    address: "Jl. Raya Lembang No. 123, Bandung",
  })

  // Displayed name on sidebar (updated only after save)
  const [displayName, setDisplayName] = useState("Ahmad Reza")
  const [displayEmail, setDisplayEmail] = useState("ahmad.reza@plantelligence.id")

  // Password form state
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  })
  const [passwordError, setPasswordError] = useState("")

  // Loading states
  const [isSavingProfile, startSavingProfile] = useTransition()
  const [isSavingPassword, startSavingPassword] = useTransition()

  // Photo upload mock
  const [photoUploading, setPhotoUploading] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
    setPasswordError("")
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    startSavingProfile(async () => {
      await new Promise(r => setTimeout(r, 1500))
      setDisplayName(`${profile.firstName} ${profile.lastName}`)
      setDisplayEmail(profile.email)
      showToast("Profil berhasil diperbarui!", "success")
    })
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwords.current) {
      setPasswordError("Password saat ini wajib diisi.")
      return
    }
    if (passwords.newPass.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.")
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError("Konfirmasi password tidak cocok.")
      return
    }
    startSavingPassword(async () => {
      await new Promise(r => setTimeout(r, 1500))
      setPasswords({ current: "", newPass: "", confirm: "" })
      setPasswordError("")
      showToast("Password berhasil diperbarui!", "success")
    })
  }

  const handlePhotoClick = () => {
    setPhotoUploading(true)
    showToast("Mengupload foto profil...", "info")
    setTimeout(() => {
      setPhotoUploading(false)
      showToast("Foto profil berhasil diperbarui!", "success")
    }, 2000)
  }

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
              <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                <Avatar className="w-32 h-32 border-4 border-background shadow-md">
                  <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Profile picture" />
                  <AvatarFallback className="text-4xl">AR</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {photoUploading
                    ? <Loader2 className="w-8 h-8 text-white animate-spin" />
                    : <Camera className="w-8 h-8 text-white" />
                  }
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold">{displayName}</h3>
              <p className="text-sm text-muted-foreground">Admin Pertanian</p>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{displayEmail}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  {profile.phone}
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
          {/* Form Informasi Pribadi */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>
                Perbarui detail pribadi Anda di sini. Profil di sebelah kiri akan ikut diperbarui.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Depan</label>
                    <Input name="firstName" value={profile.firstName} onChange={handleProfileChange} disabled={isSavingProfile} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Belakang</label>
                    <Input name="lastName" value={profile.lastName} onChange={handleProfileChange} disabled={isSavingProfile} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" value={profile.email} onChange={handleProfileChange} type="email" disabled={isSavingProfile} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nomor Telepon</label>
                  <Input name="phone" value={profile.phone} onChange={handleProfileChange} type="tel" disabled={isSavingProfile} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alamat</label>
                  <Input name="address" value={profile.address} onChange={handleProfileChange} disabled={isSavingProfile} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6">
                <Button type="submit" disabled={isSavingProfile}>
                  {isSavingProfile
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</>
                    : <><Save className="mr-2 h-4 w-4" />Simpan Perubahan</>
                  }
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Form Keamanan / Ganti Password */}
          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>
                Kelola password akun Anda. Minimal 8 karakter.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdatePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Saat Ini</label>
                  <Input
                    name="current"
                    type="password"
                    placeholder="Masukkan password saat ini"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    disabled={isSavingPassword}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password Baru</label>
                    <Input
                      name="newPass"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={passwords.newPass}
                      onChange={handlePasswordChange}
                      disabled={isSavingPassword}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Konfirmasi Password</label>
                    <Input
                      name="confirm"
                      type="password"
                      placeholder="Ulangi password baru"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      disabled={isSavingPassword}
                    />
                  </div>
                </div>
                {/* Error message */}
                {passwordError && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-2">
                    ⚠ {passwordError}
                  </p>
                )}
                {/* Password strength hint */}
                {passwords.newPass.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Kekuatan Password:</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            passwords.newPass.length >= i * 3
                              ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-amber-400' : i <= 3 ? 'bg-yellow-400' : 'bg-green-500'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t p-6">
                <Button type="button" variant="ghost" onClick={() => {
                  setPasswords({ current: "", newPass: "", confirm: "" })
                  setPasswordError("")
                }}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSavingPassword}>
                  {isSavingPassword
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memperbarui...</>
                    : <><KeyRound className="mr-2 h-4 w-4" />Update Password</>
                  }
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
