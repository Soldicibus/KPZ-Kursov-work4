import { createFileRoute } from "@tanstack/react-router";
import { getEmploeById } from "@/features/emploe/api";
import { EmploeDetailsPage } from "@/features/emploe/pages/EmploeDetailsPage";

export const Route = createFileRoute("/emploes/$emploeId")({
	loader: async ({ params }) => {
		const emploeId = parseInt(params.emploeId);

		return getEmploeById(emploeId);
	},
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: ({ error }) => <div>Ошибка загрузки: {error.message}</div>,
	component: EmploeDetailsPage,
});
