import ChangePasswordForm from "@/app/components/change_password"

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-8">
            {/* Step 1 - Completed */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
            </div>

            {/* Line between steps */}
            <div className="w-16 h-px bg-slate-800"></div>

            {/* Step 2 - Completed */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
            </div>

            {/* Line between steps */}
            <div className="w-16 h-px bg-slate-800"></div>

            {/* Step 3 - Active */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-800">Change Password?</h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Your password must be at least 7 characters and should include a combination of numbers, letters and
              special characters (!$@%).
            </p>
          </div>

          {/* Password Form */}
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}