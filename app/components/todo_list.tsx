"use client"

import { useState } from "react"
import { Checkbox } from "@/app/components/checkbox"

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Attend Zoom Meeting", completed: false },
    { id: 2, text: "Assign Task to Ben", completed: true },
    { id: 3, text: "Monitor Attendance", completed: false },
    { id: 4, text: "Create templates", completed: false },
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-2 text-[#1a2456]">To Do List</h2>
      <p className="text-sm text-gray-500 mb-4">List of your next task to complete</p>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="border-gray-300"
            />
            <span className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}