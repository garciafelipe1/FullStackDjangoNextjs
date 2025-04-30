import { ToastError } from '@/components/toast/toast';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import fetchAllCategories from '@/utils/api/blog/categories/listPostCategories';
import { useCallback, useEffect, useState } from 'react';

export default function usePostCategories() {
  const [categories, setCategories] = useState<ICategoryList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const listCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchAllCategories();

      // Asumiendo que 'res' ya son los datos procesados
      if (res && Array.isArray(res.results)) {
        setCategories(res.results);
      } else if (res && Array.isArray(res)) {
        setCategories(res); // Si la lista de categorías es el resultado directo
      } else {
        ToastError('Error: Invalid data format received for categories');
        console.error('Invalid categories data:', res);
      }
    } catch (error) {
      ToastError('Error loading categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  return {
    categories,
    loading,
  };
}
