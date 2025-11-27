import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { getCategories } from '../../services/api/categories';

const TaskForm = ({
  task,
  onInputChange,
  onSubmit,
  onClose,
  isEditing
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        // Filtrar 'personal' si viene de la API para evitar duplicados con la opción hardcodeada
        const filteredCategories = data.filter(cat => cat.nombre.toLowerCase() !== 'personal');
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900/60 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-100 relative z-10">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
              </h3>
              <button
                onClick={onClose}
                className="bg-gray-50 rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={onInputChange}
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                  placeholder="¿Qué necesitas hacer?"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={onInputChange}
                  rows="3"
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm resize-none"
                  placeholder="Añade detalles adicionales..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={task.dueDate || ''}
                    onChange={onInputChange}
                    className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Categoría
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={task.category}
                      onChange={onInputChange}
                      className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm appearance-none"
                      disabled={loading}
                    >
                      <option value="personal">Personal</option>
                      {categories.map(category => (
                        <option key={category.id_categoria} value={category.nombre.toLowerCase()}>
                          {category.nombre}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Prioridad
                </label>
                <div className="relative">
                  <select
                    id="priority"
                    name="priority"
                    value={task.priority || 'media'}
                    onChange={onInputChange}
                    className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all shadow-sm appearance-none"
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all transform active:scale-95"
                >
                  {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
