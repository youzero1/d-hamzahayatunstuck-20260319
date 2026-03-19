import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}