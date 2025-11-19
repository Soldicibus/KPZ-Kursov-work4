import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Class } from './types';

// ---------- БАЗОВІ ФУНКЦІЇ API ----------

// Отримати всі класи
export const getClasses = async (): Promise<Array<Class>> => {
  const response = await apiClient.get('/classes');
  return response.data as Array<Class>;
};

// Отримати один клас за ідентифікатором
export const getClassById = async (name: string): Promise<Class> => {
  const response = await apiClient.get(`/classes/${name}`);
  return response.data as Class;
};

// Створити новий клас
export const createClass = async (newClass: Class): Promise<Class> => {
  const response = await apiClient.post('/classes', newClass);
  return response.data as Class;
};

// Оновити дані класу
export const updateClass = async (payload: { name: string; data: Partial<Class>; }): Promise<Class> => {
  const { name, data } = payload;
  const response = await apiClient.put(`/classes/${name}`, data);
  return response.data as Class;
};

// Видалити клас
export const deleteClass = async (id: string): Promise<void> => {
  await apiClient.delete(`/classes/${id}`);
};

// ---------- ХУКИ REACT QUERY ----------

// Хук для отримання всіх класів
export const useClasses = () =>
  useQuery<Class[], Error>({ queryKey: ['classes'], queryFn: getClasses });

// Хук для отримання класу за ідентифікатором
export const useClassById = (id: string) => {
  return useQuery<Class, Error>({ queryKey: ['class', id], queryFn: () => getClassById(id), enabled: !!id });
};

// Хук для створення класу  
export const useCreateClass = (): UseMutationResult<Class, unknown, Class, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Class, unknown, Class, unknown>({
    mutationFn: createClass,
    onSuccess: async (created) => {
      await queryClient.invalidateQueries({ queryKey: ['classes'] });
      if (created) {
        // navigate to the newly created class detail
        await navigate({ to: '/class/$className' as string, params: { className: created.class_name } });
      } else {
        await navigate({ to: '/class/classes' as string });
      }
    },
  });
};

// Хук для оновлення класу
export const useUpdateClass = (): UseMutationResult<Class, unknown, { name: string; data: Partial<Class> }, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Class, unknown, { name: string; data: Partial<Class> }, unknown>({
    mutationFn: updateClass,
    onSuccess: async (updated) => {
      await queryClient.invalidateQueries({ queryKey: ['classes'] });
      if (updated) {
        queryClient.setQueryData(['class', updated.class_name], updated);
        await navigate({ to: '/class/$className' as string, params: { className: updated.class_name } });
      } else {
        await navigate({ to: '/class/classes' as string });
      }
    },
  });
};

// Хук для видалення класу
export const useDeleteClass = (): UseMutationResult<void, unknown, string, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, unknown, string, unknown>({
    mutationFn: deleteClass,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['classes'] });
      await navigate({ to: '/class/classes' as string });
    },
  });
};