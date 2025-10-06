export function CalendarWidget() {
  const rows = 5
  const cols = 7
  const totalCells = rows * cols

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#1a2456]">APRIL 2025</h2>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: totalCells }).map((_, index) => (
          <div key={index} className="aspect-square border border-gray-300" />
        ))}
      </div>
    </div>
  )
}