import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/class/classes/new')({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/class/classes/new"!</div>
}
