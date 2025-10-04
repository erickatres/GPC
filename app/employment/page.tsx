"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { FormInput } from "@/app/components/line_input"
import { FormButton } from "@/app/components/button"

export default function HomePage() {
  const [formData, setFormData] = useState({
    employeeId: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    console.log("Login attempt:", formData)
  }

  return (
    <main className="min-h-screen relative flex items-center justify-start p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background_image.png')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md ml-8 lg:ml-16">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-gray-700">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="The Great Plebeian College Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h1 className="text-white text-lg font-medium mb-2">The Great Plebeian College</h1>
            <h2 className="text-gray-300 text-xl font-semibold">Sign In</h2>
          </div>

          {/* Login Form using individual reusable components */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Employee ID"
              type="text"
              placeholder="Enter your employee ID"
              value={formData.employeeId}
              onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
              required
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              showPasswordToggle
              required
            />

            <FormButton type="submit" className="w-full" loading={loading} variant="primary" size="md">
              Sign In
            </FormButton>

            <div className="text-center">
              <button type="button" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
