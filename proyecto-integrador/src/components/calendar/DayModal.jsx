import React, { useState } from 'react';
import { XIcon, PlusIcon, CheckIcon, TrashIcon } from '@heroicons/react/outline';
import { updateTask, deleteTask, createTask } from '../../services/api/tasks';
import toast from 'react-hot-toast';

const DayModal = ({ date, tasks, onClose, onTasksUpdate }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('media');

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { completada: !task.completed });
      toast.success(task.completed ? 'Tarea marcada como pendiente' : 'Tarea completada');
      onTasksUpdate();
    } catch (error) {
      toast.error('Error al actualizar la tarea');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;

    try {
      await deleteTask(taskId);
      toast.success('Tarea eliminada');
      onTasksUpdate();
    } catch (error) {
      toast.error('Error al eliminar la tarea');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await createTask({
        titulo: newTaskTitle,
        descripcion: newTaskDescription,
        fecha_limite: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        prioridad: newTaskPriority,
        completada: false
      });

      toast.success('Tarea creada');
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('media');
      setIsAddingTask(false);
      onTasksUpdate();
    } catch (error) {
      toast.error('Error al crear la tarea');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">
              {formatDate(date)}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Task List */}
          <div className="space-y-3 mb-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-2 transition-all ${task.completed
                    ? 'bg-gray-50 border-gray-200'
                    : getPriorityColor(task.priority)
                  }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-green-500'
                      }`}
                  >
                    {task.completed && <CheckIcon className="h-3 w-3 text-white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    )}
                    {task.priority && !task.completed && (
                      <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded capitalize">
                        Prioridad: {task.priority}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Task Form */}
          {isAddingTask ? (
            <form onSubmit={handleAddTask} className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Título de la tarea"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Descripción (opcional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="baja">Prioridad Baja</option>
                <option value="media">Prioridad Media</option>
                <option value="alta">Prioridad Alta</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                    setNewTaskPriority('media');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <PlusIcon className="h-5 w-5" />
              Agregar tarea
            </button>
          )}

          {tasks.length === 0 && !isAddingTask && (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">No hay tareas para este día</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayModal;
