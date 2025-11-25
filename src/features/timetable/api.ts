import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Timetable, TimetableInput } from './types';

// ---------- БАЗОВІ ФУНКЦІЇ API ----------

// Отримати весь розклад
export const getTimetable = async (): Promise<Array<Timetable>> => {
  const response = await apiClient.get('/timetable');
  return response.data as Array<Timetable>;
};

// Отримати розклад за ідентифікатором
export const getTimetableById = async (id: number): Promise<Timetable> => {
  const response = await apiClient.get(`/timetable/${id}`);
  return response.data as Timetable;
};

// Створити новий запис розкладу
export const createTimetableEntry = async (newEntry: TimetableInput): Promise<Timetable> => {
  const response = await apiClient.post('/timetable', newEntry);
  return response.data as Timetable;
};

// Оновити запис розкладу
export const updateTimetableEntry = async (payload: { id: number; data: Partial<TimetableInput>; }): Promise<Timetable> => {
  const { id, data } = payload;
  const response = await apiClient.put(`/timetable/${id}`, data);
  return response.data as Timetable;
};

// Видалити запис розкладу
export const deleteTimetableEntry = async (id: number): Promise<void> => {
  await apiClient.delete(`/timetable/${id}`);
};

// ---------- ХУКИ REACT QUERY ----------

// Хук для отримання всього розкладу
export const useTimetable = () =>
  useQuery<Timetable[], Error>({ queryKey: ['timetable'], queryFn: getTimetable });

// Хук для отримання запису розкладу за ідентифікатором
export const useTimetableById = (id: number) => {
  return useQuery<Timetable, Error>({ queryKey: ['timetable', id], queryFn: () => getTimetableById(id), enabled: !!id });
};

// Хук для створення запису розкладу  
export const useCreateTimetableEntry = (): UseMutationResult<Timetable, unknown, TimetableInput, unknown> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Timetable, unknown, TimetableInput, unknown>({
    mutationFn: createTimetableEntry,
    onSuccess: async (created) => {
      await queryClient.invalidateQueries({ queryKey: ['timetable'] });
      if (created) {
        // navigate to the newly created timetable entry detail
        await navigate({ to: `/timetable/${created.time_id}` as string });
      }
    },
  });
};

// Хук для оновлення запису розкладу
export const useUpdateTimetableEntry = (): UseMutationResult<Timetable, unknown, { id: number; data: Partial<TimetableInput>; }, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<Timetable, unknown, { id: number; data: Partial<Timetable>; }, unknown>({
    mutationFn: updateTimetableEntry,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['timetable', variables.id] });
      await queryClient.invalidateQueries({ queryKey: ['timetable'] });
    },
  });
};

// Хук для видалення запису розкладу
export const useDeleteTimetableEntry = (): UseMutationResult<void, unknown, number, unknown> => {
  const queryClient = useQueryClient();
  
  return useMutation<void, unknown, number, unknown>({
    mutationFn: deleteTimetableEntry,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['timetable'] });
    },
  });
};