"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  // Extract data (in a real app, you would validate with Zod and check DB)
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Set a mock session cookie
  const cookieStore = await cookies()
  cookieStore.set("session", "mock_jwt_token_12345", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  // Redirect to dashboard
  redirect("/")
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Set a mock session cookie
  const cookieStore = await cookies()
  cookieStore.set("session", "mock_jwt_token_12345", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  // Redirect to dashboard
  redirect("/")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
