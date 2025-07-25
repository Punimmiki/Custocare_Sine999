import { AdminLayout } from "@/components/admin-layout"
import { EditCustomerPage } from "./components/edit-customer-page"

export default function EditCustomer({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <EditCustomerPage customerId={params.id} />
    </AdminLayout>
  )
}
