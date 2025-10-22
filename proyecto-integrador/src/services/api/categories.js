import { supabase } from '../../config/config';

// Obtener todas las categorías
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};