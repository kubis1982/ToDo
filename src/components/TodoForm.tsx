import { useState, useEffect } from 'react';
import type { Todo, Priority } from '../types/todo';

interface TodoFormProps {
  onSubmit: (title: string, description: string, priority: Priority) => void;
  editingTodo?: Todo | null;
  onCancelEdit?: () => void;
}

export const TodoForm = ({ onSubmit, editingTodo, onCancelEdit }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim(), priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {editingTodo ? 'Edytuj zadanie' : 'Dodaj nowe zadanie'}
        </h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tytuł zadania *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Opis (opcjonalny)"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Niski priorytet</option>
            <option value="medium">Średni priorytet</option>
            <option value="high">Wysoki priorytet</option>
          </select>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingTodo ? 'Zapisz zmiany' : 'Dodaj zadanie'}
          </button>
          {editingTodo && onCancelEdit && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Anuluj
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
