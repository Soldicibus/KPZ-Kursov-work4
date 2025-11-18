import { createFileRoute } from "@tanstack/react-router";
import { ClassListPage } from "@/features/class/pages/ClassListPage";
import { getClasses } from "@/features/class/api";

export const Route = createFileRoute('/class/classes')({
    loader: async () => {
        return getClasses();
    },
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
    component: ClassListPage,
});

