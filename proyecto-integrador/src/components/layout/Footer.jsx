import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TaskManager</h3>
            <p className="text-gray-300 text-sm">
              Una aplicación simple para gestionar tus tareas diarias, proyectos y recordatorios.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tasks" className="text-gray-300 hover:text-white text-sm">
                  Tareas
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-white text-sm">
                  Calendario
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white text-sm">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300 text-sm mb-2">
              ¿Tienes alguna pregunta o sugerencia?
            </p>
            <a 
              href="mailto:info@taskmanager.com" 
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              info@taskmanager.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} TaskManager. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;