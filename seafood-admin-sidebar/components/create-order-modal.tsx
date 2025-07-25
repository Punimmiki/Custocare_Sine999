"use client"

import { useState } from "react"
import { X, Plus, Trash2, User, Package, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CreateOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (orderData: any) => void
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit: string
  price: number
  total: number
}

interface Customer {
  name: string
  phone: string
  address: string
  type: "cash" | "credit"
}

export function CreateOrderModal({ isOpen, onClose, onSave }: CreateOrderModalProps) {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    address: "",
    type: "cash",
  })

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "",
      quantity: 1,
      unit: "กก.",
      price: 0,
      total: 0,
    },
  ])

  const [notes, setNotes] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  // Mock product data
  const products = [
    { name: "กุ้งแม่น้ำ", price: 450, unit: "กก." },
    { name: "ปลาทูน่า", price: 320, unit: "กก." },
    { name: "หอยแมลงภู่", price: 180, unit: "กก." },
    { name: "ปูม้า", price: 800, unit: "ตัว" },
    { name: "ปลาแซลมอน", price: 650, unit: "กก." },
    { name: "กุ้งขาว", price: 380, unit: "กก." },
  ]

  const addItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      unit: "กก.",
      price: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof OrderItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Auto-fill price and unit when product is selected
          if (field === "name") {
            const product = products.find((p) => p.name === value)
            if (product) {
              updatedItem.price = product.price
              updatedItem.unit = product.unit
            }
          }

          // Calculate total
          updatedItem.total = updatedItem.quantity * updatedItem.price
          return updatedItem
        }
        return item
      }),
    )
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.07 // 7% VAT
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSave = () => {
    const orderData = {
      id: `ORD-${Date.now()}`,
      customer,
      items: items.filter((item) => item.name && item.quantity > 0),
      pricing: {
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
      },
      deliveryDate,
      notes,
      createdAt: new Date().toISOString(),
    }

    onSave(orderData)
    handleReset()
    onClose()
  }

  const handleReset = () => {
    setCustomer({
      name: "",
      phone: "",
      address: "",
      type: "cash",
    })
    setItems([
      {
        id: "1",
        name: "",
        quantity: 1,
        unit: "กก.",
        price: 0,
        total: 0,
      },
    ])
    setNotes("")
    setDeliveryDate("")
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-gray-200 shadow-xl">
        <DialogHeader className="pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Package className="h-6 w-6 mr-3 text-blue-600" />
              สร้างคำสั่งซื้อใหม่
            </DialogTitle>
            <Button variant="outline" onClick={handleClose} className="border-gray-300 bg-transparent rounded-2xl">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Customer Information */}
          <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                ข้อมูลลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">ชื่อลูกค้า *</Label>
                  <Input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="กรอกชื่อลูกค้า"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-2xl"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block text-gray-700">เบอร์โทรศัพท์ *</Label>
                  <Input
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="กรอกเบอร์โทรศัพท์"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-2xl"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">ที่อยู่</Label>
                <Textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">ประเภทลูกค้า</Label>
                <Select
                  value={customer.type}
                  onValueChange={(value: "cash" | "credit") => setCustomer({ ...customer, type: value })}
                >
                  <SelectTrigger className="border-gray-300 h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">เงินสด</SelectItem>
                    <SelectItem value="credit">เครดิต</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-600" />
                  รายการสินค้า
                </CardTitle>
                <Button onClick={addItem} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl">
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มสินค้า
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-2xl">
                    <div className="col-span-4">
                      <Label className="text-sm font-medium mb-2 block text-gray-700">สินค้า</Label>
                      <Select value={item.name} onValueChange={(value) => updateItem(item.id, "name", value)}>
                        <SelectTrigger className="border-gray-300 rounded-2xl">
                          <SelectValue placeholder="เลือกสินค้า" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.name} value={product.name}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium mb-2 block text-gray-700">จำนวน</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                        min="1"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium mb-2 block text-gray-700">หน่วย</Label>
                      <Input
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium mb-2 block text-gray-700">ราคา/หน่วย</Label>
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                        min="0"
                        step="0.01"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label className="text-sm font-medium mb-2 block text-gray-700">รวม</Label>
                      <div className="text-lg font-bold text-gray-900">฿{item.total.toLocaleString()}</div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="border-red-300 text-red-600 hover:bg-red-50 rounded-2xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>ยอดรวม:</span>
                    <span>฿{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>ภาษี (7%):</span>
                    <span>฿{calculateTax().toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>ยอดรวมทั้งสิ้น:</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-white rounded-3xl shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                ข้อมูลเพิ่มเติม
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">วันที่ต้องการรับสินค้า</Label>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-2xl"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700">หมายเหตุ</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="หมายเหตุเพิ่มเติม..."
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-8 py-3 border-gray-300 hover:bg-gray-50 bg-transparent rounded-2xl"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            disabled={!customer.name || !customer.phone || items.filter((item) => item.name).length === 0}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
          >
            บันทึกคำสั่งซื้อ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
