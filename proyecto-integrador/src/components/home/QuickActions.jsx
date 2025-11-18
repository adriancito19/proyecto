import { Link } from 'react-router-dom';
import { PlusIcon, CalendarIcon, ClipboardListIcon } from '@heroicons/react/outline';

const QuickActions = () => {
  const actions = [
    {
      title: 'Nueva Tarea',
      description: 'Crear una tarea rápidamente',
      icon: PlusIcon,
      to: '/tasks',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Ver Calendario',
      description: 'Revisar tareas programadas',
      icon: CalendarIcon,
      to: '/calendar',
      color: 'bg-slate-600 hover:bg-slate-700'
    },
    {
      title: 'Mis Tareas',
      description: 'Gestionar todas las tareas',
      icon: ClipboardListIcon,
      to: '/tasks',
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 transition-colors duration-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`${action.color} text-white rounded-lg p-4 transition-all hover-elevate group`}
          >
            <action.icon className="h-8 w-8 mb-3 opacity-90 group-hover:opacity-100" />
            <h3 className="font-semibold mb-1">{action.title}</h3>
            <p className="text-sm opacity-90">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
