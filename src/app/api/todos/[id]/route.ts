import { NextRequest, NextResponse } from 'next/server'
import { getDataSource } from '@/lib/db'
import { Todo } from '@/lib/entities/Todo'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const dataSource = await getDataSource()
    const todoRepository = dataSource.getRepository(Todo)
    const todo = await todoRepository.findOneBy({ id })

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    if (body.completed !== undefined) {
      todo.completed = body.completed
    }
    if (body.title) {
      todo.title = body.title
    }

    await todoRepository.save(todo)
    return NextResponse.json(todo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const dataSource = await getDataSource()
    const todoRepository = dataSource.getRepository(Todo)
    const todo = await todoRepository.findOneBy({ id })

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    await todoRepository.remove(todo)
    return NextResponse.json({ message: 'Todo deleted' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}