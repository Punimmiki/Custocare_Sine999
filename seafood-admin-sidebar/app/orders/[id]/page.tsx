import { AdminLayout } from "@/components/admin-layout"
import { EditOrderPage } from "./components/edit-orders-page"

export default function EditOrder({ params }: { params: { id: string } }) {

  return (
    <AdminLayout>
      <EditOrderPage orderId={params.id}/>
    </AdminLayout>
  )
}

