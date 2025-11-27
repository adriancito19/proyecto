import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const MiniCalendar = ({ currentDate, onDateChange, tasks }) => {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    onDateChange(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    onDateChange(new Date(year, month + 1, 1));
  };

  const hasTasksOnDate = (day) => {
    const date = new Date(year, month, day);
    // Construct local YYYY-MM-DD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;

    return tasks.some(task => {
      if (!task.dueDate || task.deleted) return false;
      const taskDate = task.dueDate.substring(0, 10);
      return taskDate === dateStr;
    });
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
        </button>
        <h3 className="text-sm font-semibold text-gray-900 capitalize">{monthName}</h3>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRightIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-500 pb-1">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const hasTasks = hasTasksOnDate(day);
          const isTodayDate = isToday(day);

          return (
            <button
              key={day}
              onClick={() => onDateChange(new Date(year, month, day))}
              className={`aspect-square text-xs rounded-full flex items-center justify-center transition-all relative ${isTodayDate
                  ? 'bg-blue-600 text-white font-bold'
                  : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              {day}
              {hasTasks && !isTodayDate && (
                <span className="absolute bottom-0.5 w-1 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
