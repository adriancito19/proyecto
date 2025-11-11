import React from 'react';
import { CheckCircleIcon, ClockIcon, ExclamationIcon } from '@heroicons/react/outline';

const CalendarStats = ({ tasks, currentMonth, currentYear }) => {
  const monthTasks = tasks.filter(task => {
    if (!task.dueDate || task.deleted) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
  });

  const completed = monthTasks.filter(t => t.completed).length;
  const pending = monthTasks.filter(t => !t.completed).length;
  
  const overdue = monthTasks.filter(t => {
    if (t.completed) return false;
    const taskDate = new Date(t.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
  }).length;

  const stats = [
    {
      label: 'Completadas',
      value: completed,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Pendientes',
      value: pending,
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Vencidas',
      value: overdue,
      icon: ExclamationIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4 transition-all hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
            <stat.icon className={`h-10 w-10 ${stat.color} opacity-80`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarStats;
