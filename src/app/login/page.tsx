"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Plantelligence</span>
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-foreground">
            {isLogin ? "Masuk ke akun Anda" : "Buat akun baru"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin 
              ? "Platform manajemen hidroponik cerdas" 
              : "Daftar untuk mulai mengelola pertanian Anda"}
          </p>

          <div className="mt-10">
            <form action="#" method="POST" className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                    Nama Lengkap
                  </label>
                  <div className="mt-2">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                  Alamat Email
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={isLogin ? "admin@plantelligence.com" : ""}
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-foreground">
                  Kata Sandi
                </label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    defaultValue={isLogin ? "admin123" : ""}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-muted-foreground">
                      Ingat saya
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-primary hover:text-primary/80">
                      Lupa kata sandi?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <Link href="/">
                  <Button type="button" className="w-full">
                    {isLogin ? "Masuk" : "Daftar"}
                  </Button>
                </Link>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              </span>
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {isLogin ? "Daftar sekarang" : "Masuk ke akun"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Visual/Hero */}
      <div className="relative hidden w-0 flex-1 lg:block bg-muted">
        <div className="absolute inset-0 bg-primary/10"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-50 grayscale-[30%]"
          src="https://images.unsplash.com/photo-1530836369250-ef71a4eb5bf2?q=80&w=2070&auto=format&fit=crop"
          alt="Hydroponic farming"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-10 text-white p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="mt-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Panen Lebih Optimal
            </h1>
            <p className="text-lg max-w-lg mb-8 opacity-90">
              Pantau nutrisi, atur pencahayaan, dan kendalikan sistem hidroponik Anda dari mana saja, kapan saja.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
