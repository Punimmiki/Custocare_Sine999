import { AdminLayout } from "@/components/admin-layout"
import { EditProductPage } from "./components/edit-product-page"

export default function EditProduct({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <EditProductPage productId={params.id} />
    </AdminLayout>
  )
}
