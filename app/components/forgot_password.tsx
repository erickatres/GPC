"use client"

import type React from "react"

import { useState } from "react"
import { FormButton } from "@/app/components/button"
import { FormInput } from "@/app/components/line_input"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Email submitted:", email)
  }

  const handleCancel = () => {
    // Handle cancel action
    setEmail("")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          {/* Step 1 - Active */}
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            1
          </div>

          {/* Connector Line */}
          <div className="w-24 h-px bg-slate-300 mx-4"></div>

          {/* Step 2 - Inactive */}
          <div className="w-12 h-12 bg-white border-2 border-slate-300 text-slate-400 rounded-full flex items-center justify-center text-lg font-semibold">
            2
          </div>

          {/* Connector Line */}
          <div className="w-24 h-px bg-slate-300 mx-4"></div>

          {/* Step 3 - Inactive */}
          <div className="w-12 h-12 bg-white border-2 border-slate-300 text-slate-400 rounded-full flex items-center justify-center text-lg font-semibold">
            3
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Forgot Password?</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Enter the email address associated with your
          <br />
          account to receive a verification code.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <FormInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 text-base text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent placeholder:text-slate-400"
            required
          />
        </div>

        <div className="flex gap-4 pt-2">
          <FormButton
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-12 text-base font-medium text-slate-600 bg-white border-2 border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Cancel
          </FormButton>

          <FormButton
            type="submit"
            className="flex-1 h-12 text-base font-medium bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
          >
            Send
          </FormButton>
        </div>
      </form>
    </div>
  )
}
