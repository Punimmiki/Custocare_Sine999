"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarIcon, Plus, Search, Trash2, User, CreditCard, Banknote, ArrowLeft, Send } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

// Sample customer data with multiple addresses
const customers = [
  {
    id: "1",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    type: "cash",
    addresses: [
      { id: "addr1", address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110", isDefault: true },
      { id: "addr2", address: "456 ถนนพระราม 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500", isDefault: false },
    ],
  },
  {
    id: "2",
    name: "บริษัท อาหารท��เล จำกัด",
    phone: "02-123-4567",
    type: "credit",
    addresses: [
      { id: "addr3", address: "789 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500", isDefault: true },
      { id: "addr4", address: "321 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400", isDefault: false },
    ],
  },
  {
    id: "3",
    name: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    type: "credit",
    addresses: [{ id: "addr5", address: "654 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900", isDefault: true }],
  },
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
  discount: number
  total: number
}

export function CreateOrderPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>("")
  const [customerType, setCustomerType] = React.useState<"cash" | "credit">("cash")
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerAddress, setCustomerAddress] = React.useState("")
  const [contactChannel, setContactChannel] = React.useState<"Line" | "Facebook" | "Tel" | "">("")
  const [selectedAddress, setSelectedAddress] = React.useState("")
  const [customerSearchValue, setCustomerSearchValue] = React.useState("")

  // Credit information
  const [creditType, setCreditType] = React.useState<"amount" | "bills" | "days">("amount")
  const [creditLimit, setCreditLimit] = React.useState("")
  const [creditBills, setCreditBills] = React.useState("")
  const [creditDays, setCreditDays] = React.useState("")

  const [isPreOrder, setIsPreOrder] = React.useState(false)
  const [deliveryDate, setDeliveryDate] = React.useState<Date>()
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([])
  const [productSearch, setProductSearch] = React.useState("")
  const [discount, setDiscount] = React.useState("")
  const [shippingCost, setShippingCost] = React.useState("")
  const [shippingMethod, setShippingMethod] = React.useState("")
  const [notes, setNotes] = React.useState("")

  // Confirmation dialogs
  const [showCreateConfirm, setShowCreateConfirm] = React.useState(false)
  const [showLineConfirm, setShowLineConfirm] = React.useState(false)

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * Number(discount || 0)) / 100
  const totalAmount = subtotal - discountAmount
  const finalTotal = totalAmount + Number(shippingCost || 0)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchValue.toLowerCase()) ||
      customer.phone.includes(customerSearchValue),
  )

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      setSelectedCustomer(customerId)
      setCustomerName(customer.name)
      setCustomerPhone(customer.phone)
      setCustomerType(customer.type as "cash" | "credit")
      // Set default address
      const defaultAddress = customer.addresses?.find((addr) => addr.isDefault)
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id)
        setCustomerAddress(defaultAddress.address)
      }
    }
    setCustomerSearchValue("") // Clear search after selection
  }

  const addProduct = (product: (typeof products)[0]) => {
    const existingItem = orderItems.find((item) => item.productId === product.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.pricePerUnit - item.discount,
              }
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
          discount: 0,
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
          item.productId === productId
            ? { ...item, quantity, total: quantity * item.pricePerUnit - item.discount }
            : item,
        ),
      )
    }
  }

  const updatePrice = (productId: string, price: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.productId === productId
          ? { ...item, pricePerUnit: price, total: item.quantity * price - item.discount }
          : item,
      ),
    )
  }

  const updateItemDiscount = (productId: string, discount: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.productId === productId
          ? { ...item, discount, total: item.quantity * item.pricePerUnit - discount }
          : item,
      ),
    )
  }

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId))
  }

  const handleCreateOrder = () => {
    const orderData = {
      customer: {
        id: selectedCustomer,
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        type: customerType,
        selectedAddress,
      },
      contactChannel,
      creditInfo:
        customerType === "credit"
          ? {
              type: creditType,
              limit: Number(creditLimit || 0),
              bills: Number(creditBills || 0),
              days: Number(creditDays || 0),
            }
          : null,
      items: orderItems,
      subtotal,
      discount: Number(discount || 0),
      discountAmount,
      totalAmount,
      shippingCost: Number(shippingCost || 0),
      shippingMethod,
      finalTotal,
      isPreOrder,
      deliveryDate,
      notes,
    }

    console.log("Creating order:", orderData)
    setShowCreateConfirm(false)
    alert("คำสั่งซื้อถูกสร้างเรียบร้อยแล้ว!")
  }

  const handleSendToLine = () => {
    console.log("ส่งข้อมูลไป LINE")
    setShowLineConfirm(false)
    alert("ส่งข้อมูลไป LINE เรียบร้อยแล้ว!")
  }

  const clearForm = () => {
    setSelectedCustomer("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerAddress("")
    setContactChannel("")
    setSelectedAddress("")
    setCustomerType("cash")
    setCreditType("amount")
    setCreditLimit("")
    setCreditBills("")
    setCreditDays("")
    setOrderItems([])
    setDiscount("")
    setShippingCost("")
    setShippingMethod("")
    setNotes("")
    setIsPreOrder(false)
    setDeliveryDate(undefined)
    setProductSearch("")
    setCustomerSearchValue("")
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const handleAddressSelect = (addressId: string) => {
    const address = selectedCustomerData?.addresses?.find((addr) => addr.id === addressId)
    if (address) {
      setSelectedAddress(addressId)
      setCustomerAddress(address.address)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="border-0 shadow-sm rounded-xl hover:shadow-md bg-transparent"
        >
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
          <Card className="border-0 shadow-sm rounded-2xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ข้อมูลลูกค้า
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCustomer("")
                  setCustomerName("")
                  setCustomerPhone("")
                  setCustomerAddress("")
                  setSelectedAddress("")
                  setCustomerType("cash")
                  setCreditType("amount")
                  setCreditLimit("")
                  setCreditBills("")
                  setCreditDays("")
                  setCustomerSearchValue("")
                }}
                className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md text-xs"
              >
                ล้างการกรอง
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-search">ค้นหาลูกค้า (ถ้ามี)</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="customer-search"
                    placeholder="ค้นหาชื่อลูกค้าหรือเบอร์โทร..."
                    value={customerSearchValue}
                    onChange={(e) => setCustomerSearchValue(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {customerSearchValue && (
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleCustomerSelect(customer.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {customer.phone} • {customer.type === "cash" ? "เงินสด" : "เครดิต"}
                            </p>
                          </div>
                          <Plus className="h-4 w-4" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">ไม่พบลูกค้าที่ค้นหา</p>
                      <p className="text-xs text-muted-foreground">สามารถกรอกข้อมูลลูกค้าใหม่ด้านล่างได้</p>
                    </div>
                  )}
                </div>
              )}

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

              {/* Address Selection */}
              {selectedCustomerData && selectedCustomerData.addresses && selectedCustomerData.addresses.length > 1 && (
                <div>
                  <Label>เลือกที่อยู่จัดส่ง</Label>
                  <Select value={selectedAddress} onValueChange={handleAddressSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกที่อยู่จัดส่ง" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCustomerData.addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.address}
                          {address.isDefault && " (ค่าเริ่มต้น)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

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

              {/* Contact Channel */}
              <div>
                <Label>ช่องทางการสั่งซื้อ</Label>
                <RadioGroup value={contactChannel} onValueChange={setContactChannel} className="flex gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Line" id="line" />
                    <Label htmlFor="line">Line</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Facebook" id="facebook" />
                    <Label htmlFor="facebook">Facebook</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tel" id="tel" />
                    <Label htmlFor="tel">Tel</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Customer Type */}
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

              {/* Credit Information */}
              {customerType === "credit" && (
                <Card className="border-0 shadow-sm rounded-2xl bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg">ข้อมูลเครดิต</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>ประเภทเครดิต</Label>
                      <RadioGroup value={creditType} onValueChange={setCreditType} className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="amount" id="amount" />
                          <Label htmlFor="amount">วงเงินเครดิต</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bills" id="bills" />
                          <Label htmlFor="bills">จำนวนบิล</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="days" id="days" />
                          <Label htmlFor="days">จำนวนวัน</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {creditType === "amount" && (
                        <div>
                          <Label>วงเงินเครดิต (บาท)</Label>
                          <Input
                            type="number"
                            value={creditLimit}
                            onChange={(e) => setCreditLimit(e.target.value)}
                            placeholder="กรอกวงเงิน"
                          />
                        </div>
                      )}
                      {creditType === "bills" && (
                        <div>
                          <Label>จำนวนบิล</Label>
                          <Input
                            type="number"
                            value={creditBills}
                            onChange={(e) => setCreditBills(e.target.value)}
                            placeholder="กรอกจำนวนบิล"
                          />
                        </div>
                      )}
                      {creditType === "days" && (
                        <div>
                          <Label>จำนวนวัน</Label>
                          <Input
                            type="number"
                            value={creditDays}
                            onChange={(e) => setCreditDays(e.target.value)}
                            placeholder="กรอกจำนวนวัน"
                          />
                        </div>
                      )}
                    </div>

                    {/* Credit warning */}
                    {creditType === "amount" &&
                      finalTotal > Number(creditLimit || 0) &&
                      Number(creditLimit || 0) > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">⚠️ ยอดคำสั่งซื้อเกินวงเงินเครดิต</p>
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}

              

              {/* แสดงข้อความเมื่อมีที่อยู่เดียว */}
              {selectedCustomerData &&
                selectedCustomerData.addresses &&
                selectedCustomerData.addresses.length === 1 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Label className="text-sm font-medium text-blue-700">ที่อยู่จัดส่ง</Label>
                    <p className="text-sm text-blue-600 mt-1">{selectedCustomerData.addresses[0].address}</p>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card className="border-0 shadow-sm rounded-2xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>เลือกสินค้า</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOrderItems([])
                  setProductSearch("")
                }}
                className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md text-xs"
              >
                ล้างการกรอง
              </Button>
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
                        <TableHead>ส่วนลด (บาท)</TableHead>
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
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              value={item.discount}
                              onChange={(e) => updateItemDiscount(item.productId, Number(e.target.value) || 0)}
                              className="w-20"
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
          <Card className="border-0 shadow-sm rounded-2xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>ตัวเลือกเพิ่มเติม</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsPreOrder(false)
                  setDeliveryDate(undefined)
                  setDiscount("")
                  setShippingCost("")
                  setShippingMethod("")
                  setNotes("")
                }}
                className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md text-xs"
              >
                ล้างการกรอง
              </Button>
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
                <Label htmlFor="discount">ส่วนลดทั้งบิล (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="กรอกเปอร์เซ็นต์ส่วนลด"
                />
              </div>

              {/* Shipping Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ค่าส่งสินค้า (บาท)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                    placeholder="กรอกค่าส่ง"
                  />
                </div>
                <div>
                  <Label>ขนส่ง</Label>
                  <Select value={shippingMethod} onValueChange={setShippingMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกขนส่ง" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kerry">Kerry Express</SelectItem>
                      <SelectItem value="thailand_post">ไปรษณีย์ไทย</SelectItem>
                      <SelectItem value="flash">Flash Express</SelectItem>
                      <SelectItem value="j&t">J&T Express</SelectItem>
                      <SelectItem value="pickup">รับเอง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
          <Card className="sticky top-4 border-0 shadow-sm rounded-2xl bg-white">
            <CardHeader>
              <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Details */}
              {customerName && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">ข้อมูลลูกค้า:</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">ชื่อ:</span> {customerName}
                    </p>
                    <p>
                      <span className="font-medium">เบอร์:</span> {customerPhone}
                    </p>
                    {contactChannel && (
                      <p>
                        <span className="font-medium">ช่องทาง:</span> {contactChannel}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">ประเภท:</span> {customerType === "cash" ? "เงินสด" : "เครดิต"}
                    </p>
                    {customerAddress && (
                      <p>
                        <span className="font-medium">ที่อยู่:</span> {customerAddress}
                      </p>
                    )}
                  </div>
                  <Separator />
                </div>
              )}

              {/* Product Details */}
              {orderItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">รายการสินค้า:</h4>
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.productName} x {item.quantity} {item.unit}
                        {item.discount > 0 && (
                          <span className="text-red-600 text-xs block">(ส่วนลด ฿{item.discount})</span>
                        )}
                      </span>
                      <span className="font-medium">฿{item.total.toLocaleString()}</span>
                    </div>
                  ))}
                  <Separator />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า:</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                {Number(discount || 0) > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>ส่วนลดทั้งบิล ({discount}%):</span>
                    <span>-฿{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                {Number(shippingCost || 0) > 0 && (
                  <div className="flex justify-between">
                    <span>ค่าส่งสินค้า:</span>
                    <span>฿{Number(shippingCost || 0).toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>ยอดสุทธิ:</span>
                  <span>฿{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>จำนวนรายการ: {orderItems.length} รายการ</p>
                {shippingMethod && <p>ขนส่ง: {shippingMethod}</p>}
                {isPreOrder && deliveryDate && <p>วันที่จัดส่ง: {format(deliveryDate, "dd/MM/yyyy", { locale: th })}</p>}
                {notes && <p>หมายเหตุ: {notes}</p>}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={clearForm}
                    className="border-0 shadow-sm rounded-2xl hover:shadow-md bg-transparent"
                  >
                    เคลียร์ข้อมูล
                  </Button>

                  <AlertDialog open={showLineConfirm} onOpenChange={setShowLineConfirm}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-0 shadow-sm rounded-2xl hover:shadow-md bg-transparent"
                        disabled={orderItems.length === 0 || !customerName}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        ส่งไป LINE
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-0 rounded-3xl shadow-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการส่งข้อมูล</AlertDialogTitle>
                        <AlertDialogDescription>ต้องการส่งข้อมูลคำสั่งซื้อไปยัง LINE ใช่หรือไม่?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSendToLine}>ใช่</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <AlertDialog open={showCreateConfirm} onOpenChange={setShowCreateConfirm}>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg"
                      size="lg"
                      disabled={orderItems.length === 0 || !customerName || !contactChannel}
                    >
                      สร้างคำสั่งซื้อ
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-0 rounded-3xl shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>ยืนยันการสร้างคำสั่งซื้อ</AlertDialogTitle>
                      <AlertDialogDescription>ต้องการยืนยันการสร้างคำสั่งซื้อใช่หรือไม่?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCreateOrder}>ยืนยันการสร้างคำสั่งซื้อ</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
