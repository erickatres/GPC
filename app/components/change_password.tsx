"use client"

import type React from "react"

import { useState } from "react"
import { FormButton } from "@/app/components/button"
import { Eye, EyeOff } from "lucide-react"

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })
  const [errors, setErrors] = useState<string[]>([])

  const validatePassword = (password: string) => {
    const errors = []
    if (password.length < 7) {
      errors.push("Password must be at least 7 characters")
    }
    if (!/(?=.*[a-zA-Z])/.test(password)) {
      errors.push("Password must contain letters")
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain numbers")
    }
    if (!/(?=.*[!$@%])/.test(password)) {
      errors.push("Password must contain special characters (!$@%)")
    }
    return errors
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = []

    // Validate new password
    const passwordErrors = validatePassword(formData.newPassword)
    newErrors.push(...passwordErrors)

    // Check if new password is different from old password
    if (formData.oldPassword && formData.newPassword && formData.oldPassword === formData.newPassword) {
      newErrors.push("New password must be different from current password")
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Handle successful form submission
    console.log("Password update submitted:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Old Password */}
      <div className="relative">
        <input
          type={showPasswords.old ? "text" : "password"}
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={(e) => handleInputChange("oldPassword", e.target.value)}
          className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("old")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPasswords.old ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <input
          type={showPasswords.new ? "text" : "password"}
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("new")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showPasswords.confirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("confirm")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm text-left">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <FormButton
        type="submit"
        className="w-full h-14 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full text-base transition-colors"
      >
        Update Password
      </FormButton>
    </form>
  )
}