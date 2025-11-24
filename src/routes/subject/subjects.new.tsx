import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/subject/subjects/new' as any)({
  component: () => <div>Hello "/subject/subjects/new"!</div>,
})

export default Route
