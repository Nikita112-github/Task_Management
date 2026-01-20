import { Task } from '@/types';
import { Edit, Trash2, CheckCircle, Circle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between mb-3">
        <button
          onClick={() => onToggleStatus(task.id)}
          className="flex items-center gap-2 flex-1 text-left group"
        >
          {isCompleted ? (
            <CheckCircle className="text-green-500 shrink-0" size={24} />
          ) : (
            <Circle className="text-gray-400 group-hover:text-blue-500 shrink-0" size={24} />
          )}
          <h3
            className={`font-semibold text-lg ${
              isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
        </button>

        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span
          className={`px-2 py-1 rounded-full ${
            isCompleted
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

