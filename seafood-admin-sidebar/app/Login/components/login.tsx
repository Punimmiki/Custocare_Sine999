"use client" // This component needs to be a client component to handle state and routing

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    // Hardcoded credentials for demonstration
    const correctEmail = "Admin123@gmail.com"
    const correctPassword = "123456"

    if (email === correctEmail && password === correctPassword) {
      // Simulate successful login
      console.log("Login successful! Redirecting to /pos")
      router.push("/pos") // Redirect to the /pos page
    } else {
      setError("Invalid email or password.")
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: 'url("/underwater-blurred.png")' }}

    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
      <Card className="relative z-10 mx-auto w-full max-w-md rounded-[2rem] bg-white/80 p-8 shadow-2xl backdrop-blur-md">
        <CardHeader className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-400 text-white shadow-lg">
            <User className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">User Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-12 rounded-full border-none bg-gray-100 px-5 text-lg focus-visible:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-12 rounded-full border-none bg-gray-100 px-5 text-lg focus-visible:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-blue-400 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:ring-blue-400"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
