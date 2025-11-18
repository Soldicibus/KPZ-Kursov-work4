import {
	useMutation,
	useQueryClient,
	type UseMutationResult,
} from "@tanstack/react-query";

import { useNavigate } from "@tanstack/react-router";
import apiClient from "@/lib/axios";

// Тип работника
export interface Emploe {
	e_id: number;
	e_pasportnumber: string;
	w_id: string;
	e_birthdate: string;
	e_stage: number;
	e_gender: boolean;
	e_surename: string;
	e_name: string;
	e_secondname: string;
	contact: string;
}

// ---------- БАЗОВЫЕ ФУНКЦИИ API ----------

// Получить всех работников
export const getEmploes = async (): Promise<Array<Emploe>> => {
	const response = await apiClient.get("/emploes");
	return response.data as Array<Emploe>;
};

// Получить одного работника
export const getEmploeById = async (id: number): Promise<Emploe> => {
	const response = await apiClient.get(`/emploes/${id}`);
	return response.data as Emploe;
};

// Создать нового работника
export const createEmploe = async (
	newEmploe: Omit<Emploe, "e_id">
): Promise<Emploe> => {
	const response = await apiClient.post("/emploes", newEmploe);
	return response.data as Emploe;
};

// Обновить данные работника
export const updateEmploe = async ({
	id,
	data,
}: {
	id: number;
	data: Partial<Emploe>;
}): Promise<Emploe> => {
	const response = await apiClient.patch(`/emploes/${id}`, data);
	return response.data as Emploe;
};

// Удалить работника
export const deleteEmploe = async (id: number): Promise<void> => {
	await apiClient.delete(`/emploes/${id}`);
};

// ---------- ХУКИ ДЛЯ REACT QUERY ----------

// useEmploes и useEmploe можно оставить как есть (либо уточнить ReturnType аналогично).
// Ниже — исправленные хуки для мутаций с явными типами возвращаемых значений.

// Создание работника
export const useCreateEmploe = (): UseMutationResult<
	Emploe, // TData (что возвращает мутация)
	unknown, // TError
	Omit<Emploe, "e_id">, // TVariables (что передаётся в mutate)
	unknown // TContext
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation<Emploe, unknown, Omit<Emploe, "e_id">, unknown>({
		mutationFn: createEmploe,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["emploes"] });
			await navigate({ to: "/emploes" as string });
		},
	});
};

// Обновление работника
export const useUpdateEmploe = (): UseMutationResult<
	Emploe, // TData
	unknown, // TError
	{ id: number; data: Partial<Emploe> }, // TVariables
	unknown // TContext
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation<
		Emploe,
		unknown,
		{ id: number; data: Partial<Emploe> },
		unknown
	>({
		mutationFn: updateEmploe,
		onSuccess: async (updatedEmploe) => {
			await queryClient.invalidateQueries({ queryKey: ["emploes"] });
			queryClient.setQueryData(["emploes", updatedEmploe.e_id], updatedEmploe);
			await navigate({ to: "/emploes" as string });
		},
	});
};

// Удаление работника
export const useDeleteEmploe = (): UseMutationResult<
	void, // TData
	unknown, // TError
	number, // TVariables (id)
	unknown // TContext
> => {
	const queryClient = useQueryClient();

	return useMutation<void, unknown, number, unknown>({
		mutationFn: deleteEmploe,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["emploes"] });
		},
	});
};

