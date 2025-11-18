import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/class/classes/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/class/classes/new"!</div>
}
