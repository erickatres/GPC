import ChangePasswordValidationForm from "@/app/components/change_passwords_validation"

export default function ChangePasswordValidationPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ChangePasswordValidationForm />
      </div>
    </div>
  )
}