import { Route } from "@/routes/emploes/$emploeId";
import { useUpdateEmploe } from "@/features/emploe/api";
import { useState } from "react";

export function EmploeDetailsPage(): React.ReactElement {
	// Получаем ID из URL
	const emploe = Route.useLoaderData();
	// Запрос данных сотрудника
	// Хук обновления
	const updateMutation = useUpdateEmploe();

	// Режим редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Локальная форма
	const [formData, setFormData] = useState({
		// eslint-disable-next-line camelcase
		e_surename: "",
		// eslint-disable-next-line camelcase
		e_name: "",
		// eslint-disable-next-line camelcase
		e_secondname: "",
		// eslint-disable-next-line camelcase
		e_pasportnumber: "",
		contact: "",
		// eslint-disable-next-line camelcase
		e_birthdate: "",
		// eslint-disable-next-line camelcase
		e_stage: 0,
		// eslint-disable-next-line camelcase
		e_gender: false,
	});

	// Когда данные загружены — переносим в форму
	if (emploe && isEditing && formData.e_name === "") {
		setFormData({
			// eslint-disable-next-line camelcase
			e_surename: emploe.e_surename,
			// eslint-disable-next-line camelcase
			e_name: emploe.e_name,
			// eslint-disable-next-line camelcase
			e_secondname: emploe.e_secondname,
			// eslint-disable-next-line camelcase
			e_pasportnumber: emploe.e_pasportnumber,
			contact: emploe.contact,
			// eslint-disable-next-line camelcase
			e_birthdate: emploe.e_birthdate,
			// eslint-disable-next-line camelcase
			e_stage: emploe.e_stage,
			// eslint-disable-next-line camelcase
			e_gender: emploe.e_gender,
		});
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value, type, checked } = event.target;
		setFormData((previous) => ({
			...previous,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSave = (): void => {
		updateMutation.mutate({
			id: emploe.e_id,
			data: formData,
		});

		setIsEditing(false);
	};

	// ----------- ОТОБРАЖЕНИЕ Обычного режима -----------
	if (!isEditing) {
		return (
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-4">
					{emploe?.e_surename} {emploe?.e_name} {emploe?.e_secondname}
				</h1>

				<p>
					<strong>Паспорт:</strong> {emploe?.e_pasportnumber}
				</p>
				<p>
					<strong>Контакт:</strong> {emploe?.contact}
				</p>
				<p>
					<strong>Дата рождения:</strong> {emploe?.e_birthdate}
				</p>
				<p>
					<strong>Стаж:</strong> {emploe?.e_stage} лет
				</p>
				<p>
					<strong>Пол:</strong> {emploe?.e_gender ? "Мужской" : "Женский"}
				</p>

				<button
					className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
					onClick={() => {
						setIsEditing(true);
					}}
				>
					Редактировать
				</button>
			</div>
		);
	}

	// ----------- ОТОБРАЖЕНИЕ Формы редактирования -----------
	return (
		<form
			className="p-4 max-w-lg mx-auto space-y-4"
			onSubmit={(event) => {
				event.preventDefault();
				handleSave();
			}}
		>
			<h1 className="text-2xl font-bold mb-4">Редактировать работника</h1>

			<input
				className="border p-2 w-full"
				name="e_surename"
				value={formData.e_surename}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="e_name"
				value={formData.e_name}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="e_secondname"
				value={formData.e_secondname}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="e_pasportnumber"
				value={formData.e_pasportnumber}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="contact"
				value={formData.contact}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="e_birthdate"
				type="date"
				value={formData.e_birthdate}
				onChange={handleChange}
			/>
			<input
				className="border p-2 w-full"
				name="e_stage"
				type="number"
				value={formData.e_stage}
				onChange={handleChange}
			/>

			<label className="flex items-center space-x-2">
				<input
					checked={formData.e_gender}
					name="e_gender"
					type="checkbox"
					onChange={handleChange}
				/>
				<span>Мужской</span>
			</label>

			<div className="flex space-x-4">
				<button
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					disabled={updateMutation.isPending}
					type="submit"
				>
					Сохранить
				</button>

				<button
					className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
					type="button"
					onClick={() => {
						setIsEditing(false);
					}}
				>
					Отмена
				</button>
			</div>
		</form>
	);
}
