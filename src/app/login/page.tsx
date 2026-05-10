"use client"

import { useState, useTransition } from "react"
import { Leaf, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { loginAction, signupAction } from "@/lib/actions/auth"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isPending, startTransition] = useTransition()

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (isLogin) {
        await loginAction(formData)
      } else {
        await signupAction(formData)
      }
    })
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      {/* Left side - Auth Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          className="mx-auto w-full max-w-sm lg:w-96"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-8">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Leaf className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold text-primary tracking-tight">Plantelligence</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold leading-9 tracking-tight text-foreground">
            {isLogin ? "Masuk ke akun Anda" : "Buat akun baru"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin 
              ? "Platform manajemen hidroponik cerdas" 
              : "Daftar untuk mulai mengelola pertanian Anda"}
          </p>

          <div className="mt-10">
            <form action={handleSubmit} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                      Nama Lengkap
                    </label>
                    <div className="mt-2">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required={!isLogin}
                        placeholder="Masukkan nama Anda"
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                        disabled={isPending}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout>
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
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    disabled={isPending}
                  />
                </div>
              </motion.div>

              <motion.div layout>
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
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    disabled={isPending}
                  />
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {isLogin && (
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary transition-all duration-300"
                        disabled={isPending}
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-muted-foreground">
                        Ingat saya
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                        Lupa kata sandi?
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout whileHover={!isPending ? { scale: 1.02 } : {}} whileTap={!isPending ? { scale: 0.98 } : {}}>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full transition-all duration-300 shadow-md hover:shadow-primary/25"
                >
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLogin 
                    ? (isPending ? "Masuk..." : "Masuk") 
                    : (isPending ? "Mendaftar..." : "Daftar")}
                </Button>
              </motion.div>
            </form>

            <motion.div layout className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              </span>
              <button
                type="button"
                onClick={toggleAuthMode}
                disabled={isPending}
                className="font-semibold text-primary hover:text-primary/80 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 disabled:opacity-50"
              >
                {isLogin ? "Daftar sekarang" : "Masuk ke akun"}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Visual/Hero */}
      <div className="relative hidden w-0 flex-1 lg:block bg-muted overflow-hidden">
        {/* Subtle gradient overlay to blend left and right sides smoothly */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply"></div>
        
        {/* Slowly zooming background image */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/smart_farming_hero.png"
          alt="Smart Hydroponic Farming"
        />
        
        {/* Hero text content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20 text-white p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4 drop-shadow-lg">
              Panen Lebih Optimal
            </h1>
            <p className="text-xl max-w-lg mb-8 opacity-90 drop-shadow-md leading-relaxed">
              Pantau nutrisi, atur pencahayaan, dan kendalikan sistem hidroponik Anda dari mana saja, kapan saja dengan kecerdasan buatan.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
