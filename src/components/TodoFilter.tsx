import type { Filter } from '../types/todo';

interface TodoFilterProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeCount: number;
  completedCount: number;
  onCompleteAll: () => void;
  onDeleteCompleted: () => void;
}

export const TodoFilter = ({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onCompleteAll,
  onDeleteCompleted,
}: TodoFilterProps) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => onFilterChange('all')}
            >
              Wszystkie
            </button>
            <button
              type="button"
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => onFilterChange('active')}
            >
              Aktywne ({activeCount})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => onFilterChange('completed')}
            >
              Zakończone ({completedCount})
            </button>
          </div>
          <div className="d-flex gap-2">
            {activeCount > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={onCompleteAll}
              >
                Zakończ wszystkie
              </button>
            )}
            {completedCount > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={onDeleteCompleted}
              >
                Usuń zakończone
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
