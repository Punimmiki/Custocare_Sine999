import { AdminLayout } from "@/components/admin-layout"
import { EditOrderPage } from "./components/edit-order-page"

export default function EditOrder({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <EditOrderPage OrderId={params.id} />
    </AdminLayout>
  )
}