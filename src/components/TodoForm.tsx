'use client'

import { useState } from 'react'

export default function TodoForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })

    if (res.ok) {
      setTitle('')
      window.location.reload()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Todo
      </button>
    </form>
  )
}