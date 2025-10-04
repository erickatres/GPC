"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  showPasswordToggle?: boolean
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, label, error, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)

    React.useEffect(() => {
      if (showPasswordToggle && type === "password") {
        setInputType(showPassword ? "text" : "password")
      }
    }, [showPassword, showPasswordToggle, type])

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full bg-transparent border-0 border-b border-gray-500 px-0 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-b-2 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              className,
            )}
            ref={ref}
            {...props}
          />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-0 text-gray-400 hover:text-cyan-400 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>
    )
  },
)
FormInput.displayName = "FormInput"

export { FormInput }