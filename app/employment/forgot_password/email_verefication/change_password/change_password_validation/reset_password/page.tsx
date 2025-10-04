"use client"

import type React from "react"
import { useState } from "react"
import { FormButton } from "@/app/components/button"
import { StepIndicator } from "@/app/components/step_indicator"
import { PasswordInput } from "@/app/components/password_input"
import { ErrorMessage } from "@/app/components/error_message"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("New password must be different from current password.")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    // Handle password reset logic here
    console.log("Password reset submitted")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d4e4f7] px-4 py-8">
      <div className="w-full max-w-md">
        <StepIndicator currentStep={1} totalSteps={3} />

        {/* Form Card */}
        <div className="p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2456] text-center mb-3 text-balance">
            Reset Password
          </h1>
          <p className="text-sm sm:text-base text-[#1a2456]/80 text-center mb-8 text-pretty">
            Your new password must be different from your previous password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <PasswordInput placeholder="New Password" value={newPassword} onChange={setNewPassword} />
              <ErrorMessage message={error} />
            </div>

            <div>
              <PasswordInput placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
            </div>

            {/* Submit Button */}
            <FormButton
              type="submit"
              className="w-full bg-[#1a2456] hover:bg-[#1a2456]/90 text-white font-semibold py-6 rounded-full text-base sm:text-lg transition-all"
            >
              Reset Password
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}