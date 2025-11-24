import { getTeachers } from '@/features/teacher/api';
import { TeacherListPage } from '@/features/teacher/pages/TeacherListPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teachers/teachers')({
    loader: async () => {
      return getTeachers();
    },
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
    component: TeacherListPage,
})

export default Route