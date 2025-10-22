import { supabase } from '../../config/config';

// Obtener todas las tareas
export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tareas')
    .select('*')
    .order('fecha_creacion', { ascending: false });

  if (error) throw error;
  return data;
};

// Crear una nueva tarea
export const createTask = async (task) => {
  const { data, error } = await supabase
    .from('tareas')
    .insert([{
      titulo: task.title,
      descripcion: task.description,
      fecha_limite: task.dueDate,
      completada: task.completed || false,
      categoria: task.category
    }])
    .select();

  if (error) throw error;
  return data[0];
};

// Actualizar una tarea
export const updateTask = async (taskId, updates) => {
  const { data, error } = await supabase
    .from('tareas')
    .update({
      titulo: updates.title,
      descripcion: updates.description,
      fecha_limite: updates.dueDate,
      completada: updates.completed,
      fecha_actualizacion: new Date().toISOString()
    })
    .eq('id_tarea', taskId)
    .select();

  if (error) throw error;
  return data[0];
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from('tareas')
    .delete()
    .eq('id_tarea', taskId);

  if (error) throw error;
  return true;
};

// Marcar una tarea como completada o no completada
export const toggleTaskCompletion = async (taskId, completed) => {
  const { data, error } = await supabase
    .from('tareas')
    .update({
      completada: completed,
      fecha_actualizacion: new Date().toISOString()
    })
    .eq('id_tarea', taskId)
    .select();

  if (error) throw error;
  return data[0];
};