import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Teacher, TeacherCreateUpdate } from './types';

// ---------- БАЗОВІ ФУНКЦІЇ API ----------

// Отримати всіх вчителів
export const getTeachers = async (): Promise<Array<Teacher>> => {
    const response = await apiClient.get('/teachers');
    return response.data as Array<Teacher>;
};

// Отримати одного вчителя за ідентифікатором
export const getTeacherById = async (id: number): Promise<Teacher> => {
    const response = await apiClient.get(`/teachers/${id}`);
    return response.data as Teacher;
};

// Створити нового вчителя
export const createTeacher = async (newTeacher: TeacherCreateUpdate): Promise<Teacher> => {
    const response = await apiClient.post('/teachers', newTeacher);
    return response.data as Teacher; // <-- full Teacher
};

// Оновити дані вчителя
export const updateTeacher = async (payload: { id: number; data: Partial<Teacher>; }): Promise<Teacher> => {
    const { id, data } = payload;
    const response = await apiClient.put(`/teachers/${id}`, data);
    return response.data as Teacher;
};

// Видалити вчителя
export const deleteTeacher = async (id: number): Promise<void> => {
    await apiClient.delete(`/teachers/${id}`);
};

// ---------- ХУКИ REACT QUERY ----------

// Хук для отримання всіх вчителів
export const useTeachers = () =>
    useQuery<Teacher[], Error>({ queryKey: ['teachers'], queryFn: getTeachers });

// Хук для отримання вчителя за ідентифікатором
export const useTeacherById = (id: number) => {
    return useQuery<Teacher, Error>({ queryKey: ['teacher', id], queryFn: () => getTeacherById(id), enabled: !!id });
};

// Хук для створення вчителя  
export const useCreateTeacher = (): UseMutationResult<TeacherCreateUpdate, unknown, TeacherCreateUpdate, unknown> => {
    return useMutation<TeacherCreateUpdate, unknown, TeacherCreateUpdate, unknown>({
        mutationFn: createTeacher,
    });
};

// Хук для оновлення вчителя
export const useUpdateTeacher = (): UseMutationResult<Teacher, unknown, { id: number; data: Partial<Teacher>; }, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<Teacher, unknown, { id: number; data: Partial<Teacher>; }, unknown>({
        mutationFn: updateTeacher,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ['teachers'] });
            await queryClient.invalidateQueries({ queryKey: ['teacher', variables.id] });
        },
    });
};

// Хук для видалення вчителя
export const useDeleteTeacher = (): UseMutationResult<void, unknown, number, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, number, unknown>({
        mutationFn: deleteTeacher,
        onSuccess: async (_, id) => {
            await queryClient.invalidateQueries({ queryKey: ['teachers'] });
            await queryClient.invalidateQueries({ queryKey: ['teacher', id] });
        },
    });
};