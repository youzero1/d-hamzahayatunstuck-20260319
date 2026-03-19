import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/data-source';
import { Todo } from '@/entities/Todo';

export async function GET() {
  try {
    const dataSource = await initializeDatabase();
    const todoRepository = dataSource.getRepository(Todo);
    const todos = await todoRepository.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }

    const dataSource = await initializeDatabase();
    const todoRepository = dataSource.getRepository(Todo);
    
    const newTodo = todoRepository.create({
      title,
      description: description || null,
      completed: false,
    });

    await todoRepository.save(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    if (typeof id !== 'number' || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid input: id must be a number and completed must be a boolean' },
        { status: 400 }
      );
    }

    const dataSource = await initializeDatabase();
    const todoRepository = dataSource.getRepository(Todo);
    
    const todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    todo.completed = completed;
    await todoRepository.save(todo);
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input: id must be a number' },
        { status: 400 }
      );
    }

    const dataSource = await initializeDatabase();
    const todoRepository = dataSource.getRepository(Todo);
    
    const result = await todoRepository.delete(id);
    if (result.affected === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}