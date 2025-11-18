import { Link } from "@tanstack/react-router";
import { useDeleteEmploe, useCreateEmploe } from "@/features/emploe/api";
import { Route } from "@/routes/emploes/emploes";
import { useState } from "react";
import type { Emploe } from "../types";

export function EmploesListPage(): React.ReactElement {
	const emploes = Route.useLoaderData();

	const deleteEmploeMutation = useDeleteEmploe();
	const createEmploeMutation = useCreateEmploe();

	// локальная форма для новой записи
	const [newEmploe, setNewEmploe] = useState({
		// eslint-disable-next-line camelcase
		e_pasportnumber: "",
		// eslint-disable-next-line camelcase
		w_id: "",
		// eslint-disable-next-line camelcase
		e_birthdate: "",
		// eslint-disable-next-line camelcase
		e_stage: 0,
		// eslint-disable-next-line camelcase
		e_gender: false,
		// eslint-disable-next-line camelcase
		e_surename: "",
		// eslint-disable-next-line camelcase
		e_name: "",
		// eslint-disable-next-line camelcase
		e_secondname: "",
		contact: "",
	});

	const handleCreate = (): void => {
		createEmploeMutation.mutate(newEmploe, {
			onSuccess: () => {
				setNewEmploe({
					// eslint-disable-next-line camelcase
					e_pasportnumber: "",
					// eslint-disable-next-line camelcase
					w_id: "",
					// eslint-disable-next-line camelcase
					e_birthdate: "",
					// eslint-disable-next-line camelcase
					e_stage: 0,
					// eslint-disable-next-line camelcase
					e_gender: false,
					// eslint-disable-next-line camelcase
					e_surename: "",
					// eslint-disable-next-line camelcase
					e_name: "",
					// eslint-disable-next-line camelcase
					e_secondname: "",
					contact: "",
				});
			},
		});
	};

	const handleDelete = (id: number): void => {
		if (window.confirm("Удалить этого работника?")) {
			deleteEmploeMutation.mutate(id);
		}
	};

	if (isLoading) return <div>Загрузка...</div>;
	if (isError) return <div>Ошибка загрузки: {error.message}</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Работники</h1>

			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">Фамилия</th>
						<th className="py-2 px-4 border-б">Имя</th>
						<th className="py-2 px-4 border-б">Отчество</th>
						<th className="py-2 px-4 border-б">Действия</th>
					</tr>
				</thead>

				<tbody>
					{/* 🔹 Строка создания нового сотрудника */}
					<tr>
						<td className="py-2 px-4 border-b">
							<input
								className="border p-1 w-full"
								type="text"
								value={newEmploe.e_surename}
								onChange={(event) =>
									// eslint-disable-next-line camelcase
									{
										setNewEmploe((previous) => ({
											...previous,
											e_surename: event.target.value,
										}));
									}
								}
							/>
						</td>

						<td className="py-2 px-4 border-b">
							<input
								className="border p-1 w-full"
								type="text"
								value={newEmploe.e_name}
								onChange={(event) =>
									// eslint-disable-next-line camelcase
									{
										setNewEmploe((previous) => ({
											...previous,
											e_name: event.target.value,
										}));
									}
								}
							/>
						</td>

						<td className="py-2 px-4 border-b">
							<input
								className="border p-1 w-full"
								type="text"
								value={newEmploe.e_secondname}
								onChange={(event) =>
									// eslint-disable-next-line camelcase
									{
										setNewEmploe((previous) => ({
											...previous,
											e_secondname: event.target.value,
										}));
									}
								}
							/>
						</td>

						<td className="py-2 px-4 border-b text-center">
							<button
								className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
								disabled={createEmploeMutation.isPending}
								onClick={handleCreate}
							>
								Создать
							</button>
						</td>
					</tr>

					{/* 🔹 Существующие сотрудники */}
					{emploes?.map((emploe: Emploe) => (
						<tr key={emploe.e_id}>
							<td className="py-2 px-4 border-b">{emploe.e_surename}</td>
							<td className="py-2 px-4 border-b">{emploe.e_name}</td>
							<td className="py-2 px-4 border-b">{emploe.e_secondname}</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									className="text-indigo-600 hover:text-indigo-900 mr-4"
									params={{ emploeId: String(emploe.e_id) }}
									to="/emploes/$emploeId"
								>
									Просмотр / Редактирование
								</Link>

								<button
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
									disabled={deleteEmploeMutation.isPending}
									onClick={() => {
										handleDelete(emploe.e_id);
									}}
								>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
