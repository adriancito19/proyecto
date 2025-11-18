import { Link } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

const RecentTasks = ({ tasks }) => {
  const getStatusIcon = (task) => {
    if (task.completed) {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    }
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    if (dueDate < today) {
      return <ExclamationCircleIcon className="h-5 w-5 text-red-600" />;
    }
    return <ClockIcon className="h-5 w-5 text-yellow-600" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Tareas Recientes</h2>
        <Link 
          to="/tasks" 
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          Ver todas →
        </Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">No hay tareas recientes</p>
          <Link 
            to="/tasks" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
          >
            Crear primera tarea
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(task)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-medium text-slate-900 ${task.completed ? 'line-through opacity-60' : ''}`}>
                    {task.title}
                  </h3>
                </div>
                {task.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                    {task.description}
                  </p>
                )}
                {task.dueDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Vence: {formatDate(task.dueDate)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTasks;
