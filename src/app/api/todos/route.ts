import { NextRequest, NextResponse } from 'next/server'
import { getDataSource } from '@/lib/db'
import { Todo } from '@/lib/entities/Todo'

export async function GET() {
  try {
    const dataSource = await getDataSource()
    const todoRepository = dataSource.getRepository(Todo)
    const todos = await todoRepository.find()
    return NextResponse.json(todos)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title } = body
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const dataSource = await getDataSource()
    const todoRepository = dataSource.getRepository(Todo)
    const todo = new Todo()
    todo.title = title
    todo.completed = false
    await todoRepository.save(todo)

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}