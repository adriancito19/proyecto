import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">TaskManager</span>
            </Link>
            <nav className="ml-6 flex space-x-8">
              <Link 
                to="/tasks" 
                className="border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Tareas
              </Link>
              <Link 
                to="/calendar" 
                className="border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Calendario
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Mi Perfil
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
