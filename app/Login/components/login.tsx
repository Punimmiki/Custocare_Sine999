"use client" // This component needs to be a client component to handle state and routing

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react" // Import EyeOff for toggling

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [username, setUsername] = useState("") // Changed from email to username
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false) // State for password visibility
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    // Hardcoded credentials for demonstration
    const correctUsername = "Admin123@gmail.com" // Keeping the original email as username for logic
    const correctPassword = "123456"

    if (username === correctUsername && password === correctPassword) {
      // Simulate successful login
      console.log("Login successful! Redirecting to /orders")
      router.push("/orders") // Redirect to the /orders page
    } else {
      setError("Invalid username or password.") // Updated error message
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 lg:grid lg:grid-cols-2">
      {/* Left Column - Image */}
      <div className="hidden h-full items-center justify-center bg-blue-50 lg:flex">
        <Image
          src="/login.png"
          alt="Security illustration"
          width={600}
          height={600}
          className="max-h-[80vh] w-auto object-contain"
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="flex h-full items-center justify-center bg-white p-8 lg:p-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2">
            <p className="text-left font-light text-lg text-gray-700">ยินดีต้อนรับกลับมา! 👋</p>
            <h1 className="text-left font-thin text-2xl text-gray-900">กรอกข้อมูลเพื่อเข้าสู่ระบบ</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-normal text-gray-700">
                {" "}
                {/* Added Label */}
                Username
              </Label>
              <Input
                id="username"
                type="text" // Changed type to text for username
                placeholder="กรุณากรอกชื่อผู้ใช้ของคุณ"
                className="h-12 rounded-lg border border-gray-300 px-4 text-lg focus-visible:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="password" className="text-base font-normal text-gray-700">
                {" "}
                {/* Added Label */}
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle type based on state
                placeholder="กรุณาใส่รหัสผ่านของคุณ"
                className="h-12 rounded-lg border border-gray-300 px-4 pr-12 text-lg focus-visible:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="h-12 w-full rounded-lg bg-blue-500 text-lg font-normal text-white shadow-md hover:bg-blue-600 focus-visible:ring-blue-500"
            >
              เข้าสู่ระบบ
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
