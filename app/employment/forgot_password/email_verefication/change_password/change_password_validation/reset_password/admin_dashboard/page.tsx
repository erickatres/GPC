"use client"

import { DashboardSidebar } from "@/app/components/dashboard_sidebar"
import { DashboardCard } from "@/app/components/dashboard_card"
import { StatCard } from "@/app/components/stats_card"
import { CalendarWidget } from "@/app/components/calendar_widget"
import { TodoList } from "@/app/components/todo_list"
import { DropdownMenuTheme } from "@/app/components/dropdown_menu"
import { Search, Bell } from "lucide-react"
import { FormButton } from "@/app/components/button"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#d4e4f7]">
      <DashboardSidebar
        userName="Mr.Lafuente Mark"
        userRole="Admin"
        userImage="/images/profilepicture.jpg"
      />

      <main className="flex-1 ml-[240px] lg:ml-[240px] md:ml-[200px] sm:ml-[180px]">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1a2456]">Welcome Back, Admin!</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-[230px] h-[44px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full rounded-full border border-[#1a2456] bg-[#f3f3f3] px-4 pr-10 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1a2456]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a2456]" />
            </div>

            <DropdownMenuTheme />

            <FormButton variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </FormButton>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-[#1a2456] text-white px-6 py-3 rounded-lg mb-6 flex items-center gap-2">
            <div className="w-6 h-6 grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-lg">Dashboard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <DashboardCard
              title="Employees"
              subtitle="View Details"
              icon="/images/employee_logo.png"
              href="/employment/employees"
            />
            <DashboardCard
              title="Attendance"
              subtitle="View Details"
              icon="/images/attendance_logo.png"
              href="/employment/attendance"
            />
            <DashboardCard
              title="Documents"
              subtitle="View Details"
              icon="/images/documents_logo.png"
              href="/employment/documents"
            />
            <DashboardCard
              title="Templates"
              subtitle="View Details"
              icon="/images/templates_logo.png"
              href="/employment/templates"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard value={4} label="Former Employees" icon="/images/former_employee_logo.png" />
                <StatCard value={2} label="Absent Employees" icon="/images/absent_employee_logo.png" />
                <StatCard value={48} label="Present Employees" icon="/images/present_employee_logo.png" className="border border-gray-300" />
              </div>

              <CalendarWidget />
            </div>

            <div>
              <TodoList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}