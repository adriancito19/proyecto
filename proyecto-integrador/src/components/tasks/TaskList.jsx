import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  deleteMode, 
  tasksToDelete,
  onSelectTask 
}) => {
  return (
    <div className="space-y-4 p-4 sm:p-5">
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-2 font-medium">No hay tareas para mostrar</p>
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            deleteMode={deleteMode}
            isSelected={tasksToDelete.includes(task.id)}
            onSelect={onSelectTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
