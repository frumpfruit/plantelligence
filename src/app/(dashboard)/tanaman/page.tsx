"use client"

import { useState } from "react"
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
import { Plus, Search, Edit2, Trash2, X, Settings2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Initial mock data
const initialPlants = [
  {
    id: "PLN-001",
    name: "Selada A",
    type: "Selada",
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
]

const initialPlantTypes = ["Selada", "Pakcoy", "Bayam", "Kangkung", "Tomat", "Cabai"]

export default function PlantListPage() {
  const [plants, setPlants] = useState(initialPlants)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Master Types State
  const [plantTypes, setPlantTypes] = useState(initialPlantTypes)
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false)
  const [newType, setNewType] = useState("")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  
  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "Selada",
    age: "",
    status: "Sehat",
    harvest: "",
    location: "",
  })

  // Filter plants based on search
  const filteredPlants = plants.filter((plant) => 
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenAdd = () => {
    setModalMode("add")
    const randomId = Math.floor(Math.random() * 900) + 100
    setFormData({
      id: `PLN-${randomId}`,
      name: "",
      type: plantTypes[0] || "",
      age: "",
      status: "Sehat",
      harvest: "",
      location: "",
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (plant: any) => {
    setModalMode("edit")
    setFormData(plant)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if(confirm("Apakah Anda yakin ingin menghapus tanaman ini?")) {
      setPlants(plants.filter(p => p.id !== id))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (modalMode === "add") {
      setPlants([...plants, formData])
    } else {
      setPlants(plants.map(p => p.id === formData.id ? formData : p))
    }
    setIsModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Master Types Handlers
  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault()
    if(newType.trim() && !plantTypes.includes(newType.trim())) {
      setPlantTypes([...plantTypes, newType.trim()])
      setNewType("")
    }
  }

  const handleDeleteType = (typeToRemove: string) => {
    setPlantTypes(plantTypes.filter(t => t !== typeToRemove))
    // Also optional: prompt if we want to delete plants of this type?
    // We will keep it simple for now.
  }

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, duration: 0.5, bounce: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daftar Tanaman</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola dan pantau seluruh tanaman di farm Anda.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsTypeModalOpen(true)} className="w-full sm:w-auto gap-2">
            <Settings2 className="h-4 w-4" />
            Kelola Jenis
          </Button>
          <Button onClick={handleOpenAdd} className="w-full sm:w-auto gap-2">
            <Plus className="h-4 w-4" />
            Tambah Tanaman
          </Button>
        </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                {filteredPlants.length > 0 ? (
                  filteredPlants.map((plant) => (
                    <TableRow key={plant.id}>
                      <TableCell className="font-medium whitespace-nowrap">{plant.id}</TableCell>
                      <TableCell className="whitespace-nowrap">{plant.name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="bg-primary/5">{plant.type}</Badge>
                      </TableCell>
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
                      <TableCell className="text-right whitespace-nowrap space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(plant)}>
                          <Edit2 className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(plant.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Tanaman tidak ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {/* Modal Tambah/Edit Tanaman */}
        {isModalOpen && (
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-background rounded-xl shadow-2xl w-full max-w-md overflow-hidden border"
            >
              <div className="flex items-center justify-between p-5 border-b bg-muted/30">
                <h2 className="text-lg font-semibold">
                  {modalMode === "add" ? "Tambah Tanaman Baru" : "Edit Data Tanaman"}
                </h2>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <form onSubmit={handleSave} className="p-5 space-y-5">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nama Tanaman</label>
                  <Input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Contoh: Selada A" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Jenis</label>
                    {/* DROPDOWN UNTUK JENIS TANAMAN */}
                    <select 
                      name="type" 
                      value={formData.type} 
                      onChange={handleInputChange}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {plantTypes.length === 0 && <option value="" disabled>Belum ada jenis</option>}
                      {plantTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Lokasi Rak</label>
                    <Input required name="location" value={formData.location} onChange={handleInputChange} placeholder="Contoh: Rack A-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Umur Tanam</label>
                    <Input required name="age" value={formData.age} onChange={handleInputChange} placeholder="Contoh: 14 Hari" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Estimasi Panen</label>
                    <Input required name="harvest" value={formData.harvest} onChange={handleInputChange} placeholder="Contoh: 16 Hari lagi" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status Kesehatan</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="Sehat">Sehat</option>
                    <option value="Warning">Warning</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    Simpan Data
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Kelola Master Jenis Tanaman */}
        {isTypeModalOpen && (
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-background rounded-xl shadow-2xl w-full max-w-md overflow-hidden border"
            >
              <div className="flex items-center justify-between p-5 border-b bg-muted/30">
                <h2 className="text-lg font-semibold">Kelola Master Jenis Tanaman</h2>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsTypeModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-5 space-y-5">
                <form onSubmit={handleAddType} className="flex gap-2">
                  <Input 
                    value={newType} 
                    onChange={(e) => setNewType(e.target.value)} 
                    placeholder="Tambah jenis baru..." 
                  />
                  <Button type="submit">Tambah</Button>
                </form>

                <div className="border rounded-md divide-y overflow-hidden max-h-[300px] overflow-y-auto">
                  {plantTypes.length > 0 ? plantTypes.map((type) => (
                    <div key={type} className="flex items-center justify-between p-3 bg-card hover:bg-muted/50 transition-colors">
                      <span className="font-medium">{type}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteType(type)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">Belum ada jenis tanaman.</div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
