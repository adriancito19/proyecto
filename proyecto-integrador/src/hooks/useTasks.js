import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../services/api/tasks';
import toast from 'react-hot-toast';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data.map(task => ({
                id: task.id_tarea,
                title: task.titulo,
                description: task.descripcion,
                dueDate: task.fecha_limite,
                completed: task.completada,
                category: task.categoria || 'personal',
                priority: task.prioridad,
                deleted: false
            })));
            setError(null);
        } catch (err) {
            console.error('Error loading tasks:', err);
            setError('Error al cargar las tareas');
            toast.error('Error al cargar las tareas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const addTask = async (taskData) => {
        try {
            const createdTask = await createTask(taskData);
            const newTask = {
                id: createdTask.id_tarea,
                title: createdTask.titulo,
                description: createdTask.descripcion,
                dueDate: createdTask.fecha_limite,
                completed: createdTask.completada,
                category: createdTask.categoria || 'personal',
                priority: createdTask.prioridad,
                deleted: false
            };
            setTasks(prev => [newTask, ...prev]);
            toast.success('Tarea creada correctamente');
            return newTask;
        } catch (err) {
            console.error('Error creating task:', err);
            toast.error('Error al crear la tarea');
            throw err;
        }
    };

    const editTask = async (taskId, updates) => {
        try {
            const updatedTask = await updateTask(taskId, updates);
            setTasks(prev => prev.map(task =>
                task.id === taskId ? {
                    ...task,
                    title: updatedTask.titulo,
                    description: updatedTask.descripcion,
                    dueDate: updatedTask.fecha_limite,
                    completed: updatedTask.completada,
                    category: updatedTask.categoria || task.category,
                    priority: updatedTask.prioridad || task.priority
                } : task
            ));
            toast.success('Tarea actualizada correctamente');
            return updatedTask;
        } catch (err) {
            console.error('Error updating task:', err);
            toast.error('Error al actualizar la tarea');
            throw err;
        }
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(prev => prev.filter(task => task.id !== taskId));
            toast.success('Tarea eliminada correctamente');
        } catch (err) {
            console.error('Error deleting task:', err);
            toast.error('Error al eliminar la tarea');
            throw err;
        }
    };

    const toggleComplete = async (taskId, currentStatus) => {
        try {
            const updatedTask = await toggleTaskCompletion(taskId, !currentStatus);
            setTasks(prev => prev.map(task =>
                task.id === taskId ? { ...task, completed: updatedTask.completada } : task
            ));
            toast.success('Estado actualizado');
        } catch (err) {
            console.error('Error toggling task:', err);
            toast.error('Error al actualizar el estado');
            throw err;
        }
    };

    const removeMultipleTasks = async (taskIds) => {
        try {
            await Promise.all(taskIds.map(id => deleteTask(id)));
            setTasks(prev => prev.filter(task => !taskIds.includes(task.id)));
            toast.success('Tareas eliminadas correctamente');
        } catch (err) {
            console.error('Error deleting multiple tasks:', err);
            toast.error('Error al eliminar las tareas');
            throw err;
        }
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        editTask,
        removeTask,
        toggleComplete,
        removeMultipleTasks,
        refreshTasks: loadTasks
    };
};
