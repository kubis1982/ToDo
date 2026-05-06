import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';
import type { Filter, Todo } from './types/todo';
import './styles/themes.css';
import './styles/app.css';

function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  
  const {
    todos,
    activeCount,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    completeAll,
    deleteCompleted,
  } = useTodos(filter);

  const handleSubmit = (title: string, description: string, priority: Todo['priority']) => {
    if (editingTodo) {
      updateTodo(editingTodo.id!, { title, description, priority });
      setEditingTodo(null);
    } else {
      addTodo(title, description, priority);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <div className="container">
          <div className="app-header d-flex justify-content-between align-items-center">
            <h1 className="app-title">📝 Todo App</h1>
            <ThemeToggle />
          </div>
          
          <TodoForm
            onSubmit={handleSubmit}
            editingTodo={editingTodo}
            onCancelEdit={handleCancelEdit}
          />
          
          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onCompleteAll={completeAll}
            onDeleteCompleted={deleteCompleted}
          />
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onEdit={handleEdit}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
