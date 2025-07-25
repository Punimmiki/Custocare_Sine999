"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarIcon, Plus, Search, Trash2, User, CreditCard, Banknote, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Sample customer data
const customers = [
  { id: "1", name: "นายสมชาย ใจดี", phone: "081-234-5678", type: "cash", creditLimit: 0 },
  { id: "2", name: "บริษัท อาหารทะเล จำกัด", phone: "02-123-4567", type: "credit", creditLimit: 50000 },
  { id: "3", name: "ร้านอาหารทะเลสด", phone: "089-876-5432", type: "credit", creditLimit: 30000 },
]

// Sample product data
const products = [
  { id: "1", name: "แซลมอนสด", unit: "กิโลกรัม", price: 450, stock: 25 },
  { id: "2", name: "กุ้งขาวใหญ่", unit: "กิโลกรัม", price: 320, stock: 15 },
  { id: "3", name: "ปลาทูน่าสด", unit: "กิโลกรัม", price: 380, stock: 12 },
  { id: "4", name: "หอยแมลงภู่", unit: "กิโลกรัม", price: 180, stock: 30 },
  { id: "5", name: "ปูม้าสด", unit: "ตัว", price: 250, stock: 8 },
  { id: "6", name: "ปลาหมึกสด", unit: "กิโลกรัม", price: 220, stock: 20 },
]

interface OrderItem {
  productId: string
  productName: string
  unit: string
  quantity: number
  pricePerUnit: number
  total: number
}

const CreateOrderPage = () => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>("")
  const [customerType, setCustomerType] = React.useState<"cash" | "credit">("cash")
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerAddress, setCustomerAddress] = React.useState("")
  const [isPreOrder, setIsPreOrder] = React.useState(false)
  const [deliveryDate, setDeliveryDate] = React.useState<Date>()
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([])
  const [productSearch, setProductSearch] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [notes, setNotes] = React.useState("")

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)
  const creditLimit = selectedCustomerData?.creditLimit || 0
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const totalAmount = subtotal - discountAmount

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      setSelectedCustomer(customerId)
      setCustomerName(customer.name)
      setCustomerPhone(customer.phone)
      setCustomerType(customer.type as "cash" | "credit")
    }
  }

  const addProduct = (product: (typeof products)[0]) => {
    const existingItem = orderItems.find((item) => item.productId === product.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.pricePerUnit }
            : item,
        ),
      )
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          productName: product.name,
          unit: product.unit,
          quantity: 1,
          pricePerUnit: product.price,
          total: product.price,
        },
      ])
    }
    setProductSearch("")
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter((item) => item.productId !== productId))
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === productId ? { ...item, quantity, total: quantity * item.pricePerUnit } : item,
        ),
      )
    }
  }

  const updatePrice = (productId: string, price: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.productId === productId ? { ...item, pricePerUnit: price, total: item.quantity * price } : item,
      ),
    )
  }

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId))
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">สร้างคำสั่งซื้อใหม่</h1>
          <p className="text-muted-foreground">เพิ่มคำสั่งซื้อใหม่สำหรับลูกค้า</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ข้อมูลลูกค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-select">เลือกลูกค้า (ถ้ามี)</Label>
                <Select value={selectedCustomer} onValueChange={handleCustomerSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกลูกค้าจากรายชื่อ" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="customer-name">ชื่อลูกค้า</Label>
                  <Input
                    id="customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="กรอกชื่อลูกค้า"
                  />
                </div>
                <div>
                  <Label htmlFor="customer-phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="customer-phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customer-address">ที่อยู่</Label>
                <Textarea
                  id="customer-address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="กรอกที่อยู่ลูกค้า"
                  rows={3}
                />
              </div>

              <div>
                <Label>ประเภทลูกค้า</Label>
                <RadioGroup
                  value={customerType}
                  onValueChange={(value) => setCustomerType(value as "cash" | "credit")}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      เงินสด
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      เครดิต
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {customerType === "credit" && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">วงเงินเครดิต:</span>
                    <span className="text-lg font-bold text-blue-600">฿{creditLimit.toLocaleString()}</span>
                  </div>
                  {totalAmount > creditLimit && <p className="text-sm text-red-600 mt-1">⚠️ ยอดคำสั่งซื้อเกินวงเงินเครดิต</p>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกสินค้า</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-search">ค้นหาสินค้า</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="product-search"
                    placeholder="ค้นหาชื่อสินค้า..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {productSearch && (
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => addProduct(product)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ฿{product.price}/{product.unit} • คงเหลือ {product.stock} {product.unit}
                          </p>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {orderItems.length > 0 && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>สินค้า</TableHead>
                        <TableHead>จำนวน</TableHead>
                        <TableHead>ราคา/หน่วย</TableHead>
                        <TableHead>รวม</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">{item.unit}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.pricePerUnit}
                              onChange={(e) => updatePrice(item.productId, Number.parseFloat(e.target.value) || 0)}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>฿{item.total.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(item.productId)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle>ตัวเลือกเพิ่มเติม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="pre-order" checked={isPreOrder} onCheckedChange={setIsPreOrder} />
                <Label htmlFor="pre-order">สั่งล่วงหน้า (Pre-order)</Label>
              </div>

              {isPreOrder && (
                <div>
                  <Label>วันที่จัดส่ง</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deliveryDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่จัดส่ง"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div>
                <Label htmlFor="discount">ส่วนลด (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="notes">หมายเหตุ</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="หมายเหตุเพิ่มเติม..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ยอดรวม:</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>ส่วนลด ({discount}%):</span>
                    <span>-฿{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>ยอดสุทธิ:</span>
                    <span>฿{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>จำนวนรายการ: {orderItems.length} รายการ</p>
                <p>ประเภทลูกค้า: {customerType === "cash" ? "เงินสด" : "เครดิต"}</p>
                {isPreOrder && deliveryDate && <p>วันที่จัดส่ง: {format(deliveryDate, "dd/MM/yyyy", { locale: th })}</p>}
              </div>

              <Button className="w-full" size="lg" disabled={orderItems.length === 0 || !customerName}>
                สร้างคำสั่งซื้อ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { CreateOrderPage }
export default CreateOrderPage
