interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm sm:w-12 sm:h-12 sm:text-base bg-[#1a2456] text-white">
              {index + 1}
            </div>
            {index < totalSteps - 1 && <div className="w-16 h-0.5 sm:w-24 bg-[#1a2456]" />}
          </div>
        ))}
      </div>
    </div>
  )
}