import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages
const Tasks = lazy(() => import('../pages/Tasks'));

const AppRoutes = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;