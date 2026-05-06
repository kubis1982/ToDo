import Dexie, { type EntityTable } from 'dexie';
import type { Todo } from '../types/todo';

const db = new Dexie('TodoDatabase') as Dexie & {
  todos: EntityTable<Todo, 'id'>;
};

db.version(1).stores({
  todos: '++id, title, completed, priority, createdAt, updatedAt',
});

export { db };
