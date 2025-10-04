"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FormButton } from "@/app/components/button"
import { FormInput } from "@/app/components/line_input"

export function EmailVerificationForm() {
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join("")
    console.log("Verification code submitted:", verificationCode)
  }

  const handleResend = () => {
    console.log("Resending verification code...")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          {/* Step 1 - Completed */}
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            1
          </div>

          {/* Connector Line */}
          <div className="w-24 h-px bg-slate-800 mx-4"></div>

          {/* Step 2 - Active */}
          <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-lg font-semibold">
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
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Email Verification</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Enter the 4 digit code we sent to your email address.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input Fields */}
        <div className="flex justify-center gap-4 mb-6">
          {code.map((digit, index) => (
            <FormInput
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el
                }
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-xl font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />
          ))}
        </div>

        {/* Resend Link */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={handleResend}
            className="text-slate-600 text-base hover:text-slate-800 transition-colors"
          >
            Didn't receive code? <span className="font-semibold">Resend</span>
          </button>
        </div>

        {/* Verify Button */}
        <FormButton
          type="submit"
          className="w-full h-12 text-base font-medium bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
        >
          Verify
        </FormButton>
      </form>
    </div>
  )
}