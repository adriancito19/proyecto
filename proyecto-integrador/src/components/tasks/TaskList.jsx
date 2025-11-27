import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardListIcon } from '@heroicons/react/outline';

const TaskList = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  deleteMode,
  tasksToDelete,
  onSelectTask,
  onTaskClick
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="bg-gray-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
          <ClipboardListIcon className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No hay tareas</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          No se encontraron tareas con los filtros actuales. ¡Crea una nueva tarea para empezar!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-[300px]">
      <div className="grid grid-cols-1 gap-4">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteMode={deleteMode}
            isSelected={tasksToDelete.includes(task.id)}
            onSelect={deleteMode ? onSelectTask : onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
