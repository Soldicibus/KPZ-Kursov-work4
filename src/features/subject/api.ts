import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Subject } from './types';

// ---------- БАЗОВІ ФУНКЦІЇ API ----------

// Отримати всі предмети
export const getSubjects = async (): Promise<Array<Subject>> => {
  const response = await apiClient.get('/subject');
  return response.data as Array<Subject>;
};

// Отримати один предмет за ідентифікатором
export const getSubjectById = async (name: string): Promise<Subject> => {
  const response = await apiClient.get(`/subject/${name}`);
  return response.data as Subject;
};

// Створити новий предмет
export const createSubject = async (newSubject: Subject): Promise<Subject> => {
  const response = await apiClient.post('/subject', newSubject);
  return response.data as Subject;
};

// Оновити дані предмету
export const updateSubject = async (payload: { name: string; data: Partial<Subject>; }): Promise<Subject> => {
  const { name, data } = payload;
  const response = await apiClient.put(`/subject/${name}`, data);
  return response.data as Subject;
}

// Видалити предмет
export const deleteSubject = async (id: string): Promise<void> => {
  await apiClient.delete(`/subject/${id}`);
};

// ---------- ХУКИ REACT QUERY ----------

// Хук для отримання всіх предметів
export const useSubjects = () =>
  useQuery<Subject[], Error>({ queryKey: ['subjects'], queryFn: getSubjects });

// Хук для отримання предмету за ідентифікатором
export const useSubjectById = (id: string) => {
  return useQuery<Subject, Error>({ queryKey: ['subject', id], queryFn: () => getSubjectById(id), enabled: !!id });
};

// Хук для створення предмету  
export const useCreateSubject = (): UseMutationResult<Subject, unknown, Subject, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Subject, unknown, Subject, unknown>({
    mutationFn: createSubject,
    onSuccess: async (created) => {
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      if (created) {
        // navigate to the newly created subject detail
        await navigate({ to: `/subject/${created.subject_name}` });
      }
      else {
        await navigate({ to: '/subject/subjects' as string });
      }
    },
  });
};

// Хук для оновлення предмету
export const useUpdateSubject = (): UseMutationResult<Subject, unknown, { name: string; data: Partial<Subject>; }, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation<Subject, unknown, { name: string; data: Partial<Subject>; }, unknown>({
    mutationFn: updateSubject,
    onSuccess: async (updated) => {
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      if (updated) {
        // navigate to the updated subject detail
        await navigate({ to: `/subject/${updated.subject_name}` });
      } else {
        await navigate({ to: '/subject/subjects' as string });
      }
    },
  });
};

// Хук для видалення предмету
export const useDeleteSubject = (): UseMutationResult<void, unknown, string, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, unknown, string, unknown>({
    mutationFn: deleteSubject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      await navigate({ to: '/subject/subjects' as string });
    },
  });
};