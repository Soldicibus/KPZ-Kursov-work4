import { createFileRoute } from '@tanstack/react-router'
import { TimetableListPage } from '@/features/timetable/pages/TimetableListPage'
import { getTimetable } from '@/features/timetable/api'

export const Route = createFileRoute('/timetable/timetable')({
  loader: async () => {
    return getTimetable();
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: TimetableListPage,
})