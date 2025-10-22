import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, XIcon, CheckIcon } from '@heroicons/react/outline';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import Button from '../../components/common/Button';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../../services/api/tasks';
import toast from 'react-hot-toast';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar tareas desde Supabase
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.map(task => ({
        id: task.id_tarea,
        title: task.titulo,
        description: task.descripcion,
        dueDate: task.fecha_limite,
        completed: task.completada,
        category: 'personal', // Por defecto, ya que no tenemos categorías en la BD
        deleted: false
      })));
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  // UI State
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'personal'
  });
  const [deleteMode, setDeleteMode] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        [name]: value
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value
      });
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Actualizar tarea existente
        const updatedTask = await updateTask(editingTask.id, {
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          completed: editingTask.completed
        });
        
        setTasks(tasks.map(task =>
          task.id === editingTask.id ? {
            ...task,
            title: updatedTask.titulo,
            description: updatedTask.descripcion,
            dueDate: updatedTask.fecha_limite,
            completed: updatedTask.completada
          } : task
        ));
        toast.success('Tarea actualizada correctamente');
      } else {
        // Crear nueva tarea
        const newTaskData = {
          title: e.target.title.value,
          description: e.target.description.value,
          dueDate: e.target.dueDate.value,
          completed: false
        };
        
        const createdTask = await createTask(newTaskData);
        setTasks([{
          id: createdTask.id_tarea,
          title: createdTask.titulo,
          description: createdTask.descripcion,
          dueDate: createdTask.fecha_limite,
          completed: createdTask.completada,
          category: 'personal',
          deleted: false
        }, ...tasks]);
        toast.success('Tarea creada correctamente');
      }
      
      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error(editingTask ? 'Error al actualizar la tarea' : 'Error al crear la tarea');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      category: task.category
    });
    setShowModal(true);
  };

  const toggleTaskComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await toggleTaskCompletion(taskId, !task.completed);
      
      setTasks(tasks.map(t =>
        t.id === taskId ? {
          ...t,
          completed: updatedTask.completada
        } : t
      ));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      toast.success('Estado de la tarea actualizado');
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast.error('Error al actualizar el estado de la tarea');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (deleteMode) {
      setTasksToDelete(prev =>
        prev.includes(taskId)
          ? prev.filter(id => id !== taskId)
          : [...prev, taskId]
      );
    } else {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Tarea eliminada correctamente');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Error al eliminar la tarea');
      }
    }
  };

  const confirmDelete = async () => {
    try {
      await Promise.all(tasksToDelete.map(taskId => deleteTask(taskId)));
      setTasks(tasks.filter(task => !tasksToDelete.includes(task.id)));
      setTasksToDelete([]);
      setDeleteMode(false);
      toast.success('Tareas eliminadas correctamente');
    } catch (error) {
      console.error('Error deleting tasks:', error);
      toast.error('Error al eliminar las tareas');
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
    if (activeFilter === 'completed') return task.completed && !task.deleted;
    if (activeFilter === 'pending') return !task.completed && !task.deleted;
    if (activeFilter === 'deleted') return task.deleted;
    return !task.deleted; // 'all' filter
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mis Tareas</h1>
            <p className="mt-1 text-sm text-gray-600">
              {tasks.filter(t => !t.deleted).length} tareas en total
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
        <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Filtrar y Buscar</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search-tasks" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search-tasks"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <div className="flex flex-nowrap gap-2">
                {[
                  { id: 'all', label: 'Todas' },
                  { id: 'pending', label: 'Pendientes' },
                  { id: 'completed', label: 'Completadas' },
                  { id: 'deleted', label: 'Eliminadas' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100'
                        : 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700'
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
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center">
            <h2 className="text-base font-medium text-gray-700">Tareas {activeFilter === 'completed' ? 'Completadas' : activeFilter === 'pending' ? 'Pendientes' : activeFilter === 'deleted' ? 'Eliminadas' : ''}</h2>
            <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {filteredTasks.length}
            </span>
          </div>
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            deleteMode={deleteMode}
            tasksToDelete={tasksToDelete}
            onSelectTask={toggleSelectTask}
          />
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4 bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay tareas</h3>
            <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
              {activeFilter === 'all'
                ? 'Comienza creando una nueva tarea para organizar tus actividades.'
                : 'No hay tareas que coincidan con los filtros actuales. Prueba con otro filtro.'}
            </p>
            <div className="mt-6">
              <Button
                onClick={() => setShowModal(true)}
                icon={PlusIcon}
              >
                Nueva Tarea
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 z-50 max-w-md animate-fade-in">
          <div className="bg-white bg-opacity-25 rounded-full p-1">
            <CheckIcon className="h-5 w-5 flex-shrink-0" />
          </div>
          <span className="text-sm font-medium">Tarea actualizada correctamente</span>
        </div>
      )}

      {/* Task Form Modal */}
      {showModal && (
        <TaskForm
          task={editingTask || newTask}
          onInputChange={handleInputChange}
          onSubmit={handleAddTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
            setNewTask({
              title: '',
              description: '',
              dueDate: '',
              category: 'personal'
            });
          }}
          isEditing={!!editingTask}
        />
      )}
    </div>
  );
};

export default TasksPage;