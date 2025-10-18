import React from 'react';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/outline';

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  deleteMode, 
  isSelected,
  onSelect 
}) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'trabajo':
        return 'bg-blue-100 text-blue-800';
      case 'universidad':
        return 'bg-purple-100 text-purple-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'} border ${task.completed ? 'border-gray-200' : 'border-gray-100'} hover:shadow-md transition-shadow`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-4 flex-1 mb-3 sm:mb-0">
          {deleteMode ? (
            <div className="mt-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(task.id)}
                className="w-4 h-4 text-blue-600 bg-white border-gray-200 rounded-sm focus:ring-gray-100 focus:ring-2"
              />
            </div>
          ) : (
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`h-6 w-6 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                task.completed 
                  ? 'bg-white border-gray-200 text-green-600' 
                  : 'bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700'
              }`}
            >
              {task.completed && <CheckIcon className="h-3.5 w-3.5" />}
            </button>
          )}
          
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1.5 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${getCategoryColor(task.category)}`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
              {task.dueDate && (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {!deleteMode && !task.completed && (
          <div className="flex space-x-1 self-end sm:self-start mt-2 sm:mt-0">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-colors"
              aria-label="Editar tarea"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-colors"
              aria-label="Eliminar tarea"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
