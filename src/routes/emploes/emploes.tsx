import { createFileRoute } from "@tanstack/react-router";
import { EmploesListPage } from "@/features/emploe/pages/EmploesListPage.tsx";
import { getEmploes } from "@/features/emploe/api";

export const Route = createFileRoute("/emploes/emploes")({
	loader: async () => {
		return getEmploes();
	},
	pendingComponent: () => <div>Загрузка...</div>,
	errorComponent: ({ error }) => <div>Ошибка загрузки: {error.message}</div>,
	component: EmploesListPage,
});
