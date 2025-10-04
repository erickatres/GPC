"use client"

import type React from "react"
import { useState } from "react"
import { FormButton } from "@/app/components/button"
import { Eye, EyeOff } from "lucide-react"

export default function ChangePasswordValidationForm() {
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
  const [validationChecks, setValidationChecks] = useState({
    length: false,
    letters: false,
    numbers: false,
    special: false,
    different: false,
    match: false,
  })

  const validatePassword = (password: string, oldPassword = "", confirmPassword = "") => {
    const checks = {
      length: password.length >= 7,
      letters: /(?=.*[a-zA-Z])/.test(password),
      numbers: /(?=.*\d)/.test(password),
      special: /(?=.*[!$@%])/.test(password),
      different: oldPassword ? password !== oldPassword : true,
      match: confirmPassword ? password === confirmPassword : true,
    }

    setValidationChecks(checks)

    const errors = []
    if (!checks.length) errors.push("Password must be at least 7 characters")
    if (!checks.letters) errors.push("Password must contain letters")
    if (!checks.numbers) errors.push("Password must contain numbers")
    if (!checks.special) errors.push("Password must contain special characters (!$@%)")
    if (!checks.different && oldPassword) errors.push("New password must be different from current password")
    if (!checks.match && confirmPassword) errors.push("Passwords do not match")

    return errors
  }

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    // Real-time validation for new password
    if (field === "newPassword" || field === "oldPassword" || field === "confirmPassword") {
      const errors = validatePassword(newFormData.newPassword, newFormData.oldPassword, newFormData.confirmPassword)
      setErrors(errors)
    }
  }

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalErrors = validatePassword(formData.newPassword, formData.oldPassword, formData.confirmPassword)

    if (finalErrors.length > 0) {
      setErrors(finalErrors)
      return
    }

    // Handle successful form submission
    console.log("Password update submitted:", formData)
  }

  return (
    <div className="text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-balance">Change Password?</h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          Your password must be at least 7 characters and should include a combination of numbers, letters and special
          characters (!$@%).
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div className="relative">
          <input
            type={showPasswords.old ? "text" : "password"}
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            className="w-full h-12 md:h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm md:text-base"
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
            className="w-full h-12 md:h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm md:text-base"
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
            className="w-full h-12 md:h-14 px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent text-sm md:text-base"
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
              <p key={index} className="text-red-500 text-xs md:text-sm text-left">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <FormButton
          type="submit"
          className="w-full h-12 md:h-14 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full text-sm md:text-base transition-colors"
        >
          Update Password
        </FormButton>
      </form>
    </div>
  )
}
