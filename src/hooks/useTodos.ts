import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import type { Todo, Filter } from '../types/todo';

export const useTodos = (filter: Filter = 'all') => {
  const todos = useLiveQuery(async () => {
    let query = db.todos.toArray();
    return query;
  }, []);

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }) || [];

  const addTodo = async (title: string, description: string = '', priority: Todo['priority'] = 'medium') => {
    const now = new Date();
    await db.todos.add({
      title,
      description,
      completed: false,
      priority,
      createdAt: now,
      updatedAt: now,
    });
  };

  const updateTodo = async (id: number, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    await db.todos.update(id, {
      ...updates,
      updatedAt: new Date(),
    });
  };

  const deleteTodo = async (id: number) => {
    await db.todos.delete(id);
  };

  const toggleTodo = async (id: number) => {
    const todo = await db.todos.get(id);
    if (todo) {
      await db.todos.update(id, {
        completed: !todo.completed,
        updatedAt: new Date(),
      });
    }
  };

  const completeAll = async () => {
    const allTodos = await db.todos.toArray();
    const updates = allTodos.map((todo) =>
      db.todos.update(todo.id!, {
        completed: true,
        updatedAt: new Date(),
      })
    );
    await Promise.all(updates);
  };

  const deleteCompleted = async () => {
    const completedTodos = await db.todos.filter((todo) => todo.completed).toArray();
    const deletions = completedTodos.map((todo) => db.todos.delete(todo.id!));
    await Promise.all(deletions);
  };

  const activeCount = todos?.filter((todo) => !todo.completed).length || 0;
  const completedCount = todos?.filter((todo) => todo.completed).length || 0;

  return {
    todos: filteredTodos,
    allTodos: todos || [],
    activeCount,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    completeAll,
    deleteCompleted,
  };
};
