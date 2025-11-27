import React, { useState } from 'react';
import { PlusIcon, TrashIcon, XIcon, CheckIcon } from '@heroicons/react/outline';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import TaskPreviewModal from '../../components/tasks/TaskPreviewModal';
import Button from '../../components/common/Button';
import { useTasks } from '../../hooks/useTasks';

const TasksPage = () => {
  const {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
    toggleComplete,
    removeMultipleTasks
  } = useTasks();

  // UI State
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'personal',
    priority: 'media'
  });
  const [deleteMode, setDeleteMode] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await editTask(editingTask.id, {
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          category: editingTask.category,
          priority: editingTask.priority
        });
      } else {
        await addTask({
          title: newTask.title,
          description: newTask.description,
          dueDate: newTask.dueDate,
          category: newTask.category,
          priority: newTask.priority
        });
      }
      setShowModal(false);
      setEditingTask(null);
      setNewTask({ title: '', description: '', dueDate: '', category: 'personal', priority: 'media' });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (tasksToDelete.length > 0) {
      await removeMultipleTasks(tasksToDelete);
      setTasksToDelete([]);
      setDeleteMode(false);
    }
  };

  const toggleSelectTask = (taskId) => {
    setTasksToDelete(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true; // 'all'
  }).filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mis Tareas</h1>
            <p className="mt-1 text-sm text-gray-500">
              {tasks.length} tareas en total
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            {deleteMode ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDeleteMode(false);
                    setTasksToDelete([]);
                  }}
                  icon={XIcon}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDelete}
                  disabled={tasksToDelete.length === 0}
                  icon={CheckIcon}
                >
                  Eliminar ({tasksToDelete.length})
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteMode(true)}
                  icon={TrashIcon}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowModal(true)}
                  icon={PlusIcon}
                >
                  Nueva Tarea
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-auto">
              <div className="flex flex-nowrap gap-2 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'pending', label: 'Pendientes' },
                  { id: 'completed', label: 'Completadas' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeFilter === filter.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden rounded-xl">
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={(id) => toggleComplete(id, tasks.find(t => t.id === id).completed)}
            onEdit={handleEditClick}
            onDelete={removeTask}
            deleteMode={deleteMode}
            tasksToDelete={tasksToDelete}
            onSelectTask={toggleSelectTask}
            onTaskClick={handleTaskClick}
          />
        </div>

        {/* Task Form Modal */}
        {showModal && (
          <TaskForm
            task={editingTask || newTask}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowModal(false);
              setEditingTask(null);
              setNewTask({
                title: '',
                description: '',
                dueDate: '',
                category: 'personal',
                priority: 'media'
              });
            }}
            isEditing={!!editingTask}
          />
        )}

        {/* Task Preview Modal */}
        {selectedTask && (
          <TaskPreviewModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;