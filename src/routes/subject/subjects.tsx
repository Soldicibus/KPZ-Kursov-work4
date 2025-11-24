import { createFileRoute } from '@tanstack/react-router'
import { SubjectListPage } from '@/features/subject/pages/SubjectListPage'
import { getSubjects } from '@/features/subject/api'

export const Route = createFileRoute('/subject/subjects' as any)({
  loader: async () => {
    return getSubjects();
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: SubjectListPage,
})

export default Route
