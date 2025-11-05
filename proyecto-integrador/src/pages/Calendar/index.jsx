import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { getTasks } from '../../services/api/tasks';
import toast from 'react-hot-toast';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

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
        category: 'personal',
        deleted: false
      })));
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast.error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  // Obtener el primer día del mes y el número de días
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navegar al mes siguiente
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Ir al mes actual
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtener tareas para una fecha específica
  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task.dueDate || task.deleted) return false;
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === dateStr;
    });
  };

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Nombres de los días de la semana
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Crear array de días del mes con espacios vacíos al inicio
  const calendarDays = [];
  // Agregar días vacíos al inicio
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Agregar días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendario</h1>
            <p className="mt-1 text-sm text-gray-600">
              Visualiza tus tareas en el calendario
            </p>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mes anterior"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {formatDate(currentDate)}
              </h2>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                Hoy
              </button>
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mes siguiente"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {dayNames.map((dayName) => (
              <div
                key={dayName}
                className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[100px] border-r border-b border-gray-200 last:border-r-0 bg-gray-50"
                  />
                );
              }

              const date = new Date(year, month, day);
              const dayTasks = getTasksForDate(date);
              const isTodayDate = isToday(day);

              return (
                <div
                  key={day}
                  className={`min-h-[100px] border-r border-b border-gray-200 last:border-r-0 p-2 ${
                    isTodayDate ? 'bg-blue-50' : 'bg-white'
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isTodayDate
                        ? 'text-blue-600 bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center'
                        : 'text-gray-900'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs px-2 py-1 rounded truncate ${
                          task.completed
                            ? 'bg-green-100 text-green-800 line-through'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayTasks.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Leyenda</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Tarea pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-600">Tarea completada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-600">Día actual</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {tasks.filter(t => !t.deleted && t.dueDate).length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay tareas con fecha</h3>
            <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
              Las tareas que agregues con fecha límite aparecerán aquí en el calendario.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

