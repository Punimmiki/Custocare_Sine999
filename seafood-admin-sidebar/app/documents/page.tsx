import { AdminLayout } from "@/components/admin-layout"

export default function Documents() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">เอกสาร</h1>
          <p className="text-muted-foreground">จัดการเอกสารและใบกำกับภาษี</p>
        </div>
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">หน้าจัดการเอกสารกำลังพัฒนา</p>
        </div>
      </div>
    </AdminLayout>
  )
}
