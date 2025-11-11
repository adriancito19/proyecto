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
      titulo: task.titulo || task.title,
      descripcion: task.descripcion || task.description,
      fecha_limite: task.fecha_limite || task.dueDate,
      completada: task.completada || task.completed || false,
      categoria: task.categoria || task.category,
      prioridad: task.prioridad || task.priority || 'media'
    }])
    .select();

  if (error) throw error;
  return data[0];
};

// Actualizar una tarea
export const updateTask = async (taskId, updates) => {
  const updateData = {
    fecha_actualizacion: new Date().toISOString()
  };

  // Solo actualizar campos que se proporcionan
  if (updates.title !== undefined) updateData.titulo = updates.title;
  if (updates.description !== undefined) updateData.descripcion = updates.description;
  if (updates.dueDate !== undefined) updateData.fecha_limite = updates.dueDate;
  if (updates.completada !== undefined) updateData.completada = updates.completada;
  if (updates.completed !== undefined) updateData.completada = updates.completed;
  if (updates.priority !== undefined) updateData.prioridad = updates.priority;
  if (updates.prioridad !== undefined) updateData.prioridad = updates.prioridad;

  const { data, error } = await supabase
    .from('tareas')
    .update(updateData)
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