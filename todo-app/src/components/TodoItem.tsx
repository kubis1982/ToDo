import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const getPriorityBadgeClass = (priority: Todo['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-danger';
    case 'medium':
      return 'bg-warning text-dark';
    case 'low':
      return 'bg-success';
    default:
      return 'bg-secondary';
  }
};

const getPriorityLabel = (priority: Todo['priority']) => {
  switch (priority) {
    case 'high':
      return 'Wysoki';
    case 'medium':
      return 'Średni';
    case 'low':
      return 'Niski';
    default:
      return priority;
  }
};

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input me-3"
          checked={todo.completed}
          onChange={() => onToggle(todo.id!)}
          style={{ cursor: 'pointer', width: '20px', height: '20px' }}
        />
        <div className="flex-grow-1">
          <h6 className={`mb-1 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {todo.title}
          </h6>
          {todo.description && (
            <p className={`mb-1 small ${todo.completed ? 'text-muted' : 'text-secondary'}`}>
              {todo.description}
            </p>
          )}
          <span className={`badge ${getPriorityBadgeClass(todo.priority)} me-2`}>
            {getPriorityLabel(todo.priority)}
          </span>
          <small className="text-muted">
            {new Date(todo.createdAt).toLocaleDateString('pl-PL')}
          </small>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(todo)}
            title="Edytuj"
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(todo.id!)}
            title="Usuń"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
