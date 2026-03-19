'use client'

import { useEffect, useState } from 'react'
import { Todo } from '@/lib/entities/Todo'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
    setLoading(false)
  }

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      })
      if (res.ok) {
        fetchTodos()
      }
    }
  }

  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      fetchTodos()
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </span>
          <div>
            <button
              onClick={() => toggleTodo(todo.id)}
              className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}