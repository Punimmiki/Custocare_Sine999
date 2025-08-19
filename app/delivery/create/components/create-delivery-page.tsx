"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, ArrowLeft, Upload, X, CalendarIcon, Search } from 'lucide-react'
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Sample order data
const initialOrders = [
  {
    orderId: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    customerAddress: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    customerPhone: "081-234-5678",
    status: "preparing", // รอแพ็ค
  },
  {
    orderId: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerAddress: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    customerPhone: "02-123-4567",
    status: "shipped", // รอส่ง
  },
  {
    orderId: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    customerAddress: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    customerPhone: "082-555-6666",
    status: "delivered", // จัดส่งแล้ว - จะไม่แสดงในรายการเลือก
  },
  {
    orderId: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    customerAddress: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    customerPhone: "089-876-5432",
    status: "preparing", // รอแพ็ค
  },
  {
    orderId: "ORD-005",
    customerName: "นายธนาคาร ร่ำรวย",
    customerAddress: "101 ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    customerPhone: "090-123-4567",
    status: "completed", // สถานะอื่น - จะไม่แสดงในรายการเลือก
  },
]

// Vehicle types
const vehicleTypes = ["รถกระบะ", "รถตู้", "รถบรรทุก", "รถจักรยานยนต์"]

// Service providers
const serviceProviders = ["Kerry Express", "Flash Express", "ไปรษณีย์ไทย", "J&T Express", "DHL"]

interface DeliveryImage {
  id: string
  url: string
  file: File
}

const CreateDeliveryPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [orderSearchTerm, setOrderSearchTerm] = React.useState<string>("")
  const [selectedOrder, setSelectedOrder] = React.useState<(typeof initialOrders)[0] | null>(null)
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerAddress, setCustomerAddress] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [driverName, setDriverName] = React.useState("")
  const [vehiclePlate, setVehiclePlate] = React.useState("")
  const [driverPhone, setDriverPhone] = React.useState("")
  const [vehicleType, setVehicleType] = React.useState("")
  const [serviceProvider, setServiceProvider] = React.useState("")
  const [deliveryDate, setDeliveryDate] = React.useState<Date>(new Date())
  const [deliveryImages, setDeliveryImages] = React.useState<DeliveryImage[]>([])
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false) // New state for success dialog

  // Filter orders based on search term and status
  const filteredOrders = React.useMemo(() => {
    const lowerCaseSearchTerm = orderSearchTerm.toLowerCase()
    return initialOrders.filter((order) =>
      (order.status === "preparing" || order.status === "shipped") &&
      (order.orderId.toLowerCase().includes(lowerCaseSearchTerm) ||
        order.customerName.toLowerCase().includes(lowerCaseSearchTerm)),
    )
  }, [orderSearchTerm])

  // Handle order selection from dropdown
  const handleOrderSelect = (orderId: string) => {
    const order = filteredOrders.find((o) => o.orderId === orderId)
    if (order) {
      setSelectedOrder(order)
      setCustomerName(order.customerName)
      setCustomerPhone(order.customerPhone)
      setCustomerAddress(order.customerAddress)
    }
  }

  // Clear selected order and reset customer fields
  const handleClearOrderSelection = () => {
    setSelectedOrder(null)
    setOrderSearchTerm("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerAddress("")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      if (deliveryImages.length < 3) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: DeliveryImage = {
            id: Date.now().toString() + Math.random().toString(),
            url: e.target?.result as string,
            file: file,
          }
          setDeliveryImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })
    // Reset input
    e.target.value = ""
  }

  const removeImage = (imageId: string) => {
    setDeliveryImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation: Ensure an order is selected
    if (!selectedOrder) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาเลือกคำสั่งซื้อ",
        variant: "destructive",
      })
      return
    }
    // Other validations remain
    if (!driverName.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกชื่อคนขับ",
        variant: "destructive",
      })
      return
    }
    if (!vehiclePlate.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกทะเบียนรถ",
        variant: "destructive",
      })
      return
    }
    if (!driverPhone.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกเบอร์โทรคนขับ",
        variant: "destructive",
      })
      return
    }
    if (!vehicleType) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาเลือกประเภทรถ",
        variant: "destructive",
      })
      return
    }
    if (!serviceProvider) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาเลือกผู้ให้บริการ",
        variant: "destructive",
      })
      return
    }
    setIsSubmitDialogOpen(true)
  }

  const confirmSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create delivery data
      const deliveryData = {
        orderId: selectedOrder?.orderId, // Use orderId from selectedOrder
        customerName: selectedOrder?.customerName,
        customerPhone: selectedOrder?.customerPhone,
        customerAddress: selectedOrder?.customerAddress,
        notes,
        driverName,
        vehiclePlate,
        driverPhone,
        vehicleType,
        serviceProvider,
        deliveryDate,
        deliveryImages,
        status: "preparing", // Default status for new delivery
        createdAt: new Date(),
      }
      console.log("Creating delivery:", deliveryData)

      setIsSubmitDialogOpen(false)
      setIsSuccessDialogOpen(true) // Show success dialog
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างการจัดส่งได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessConfirm = () => {
    setIsSuccessDialogOpen(false)
    // Reset form fields
    setOrderSearchTerm("")
    setSelectedOrder(null)
    setCustomerName("")
    setCustomerPhone("")
    setCustomerAddress("")
    setNotes("")
    setDriverName("")
    setVehiclePlate("")
    setDriverPhone("")
    setVehicleType("")
    setServiceProvider("")
    setDeliveryDate(new Date())
    setDeliveryImages([])
    // Optionally redirect
    // router.push("/delivery")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/delivery">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">สร้างการจัดส่งใหม่</h1>
          <p className="text-muted-foreground">เพิ่มการจัดส่งใหม่สำหรับลูกค้า</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <Card className="border-0 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  ข้อมูลลูกค้า
                </CardTitle>
                {selectedOrder && (
                  <Button variant="outline" size="sm" onClick={handleClearOrderSelection}>
                    ล้างการเลือกคำสั่งซื้อ
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="order-search">ค้นหารหัสคำสั่งซื้อ หรือชื่อลูกค้า</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="order-search"
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ หรือชื่อลูกค้า..."
                      className="pl-8"
                      disabled={!!selectedOrder} // ปิดการใช้งานช่องค้นหาเมื่อเลือกคำสั่งซื้อแล้ว
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="order-select">
                    เลือกคำสั่งซื้อ <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedOrder?.orderId || ""}
                    onValueChange={handleOrderSelect}
                    disabled={!!selectedOrder || filteredOrders.length === 0} // ปิดการใช้งาน Dropdown เมื่อเลือกคำสั่งซื้อแล้ว หรือไม่มีคำสั่งซื้อที่ตรงกัน
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกคำสั่งซื้อจากรายการ" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredOrders.length === 0 ? (
                        <SelectItem value="no-orders" disabled>
                          ไม่พบคำสั่งซื้อที่ตรงกัน (สถานะรอแพ็ค/รอส่ง)
                        </SelectItem>
                      ) : (
                        filteredOrders.map((order) => (
                          <SelectItem key={order.orderId} value={order.orderId}>
                            {order.orderId} - {order.customerName} ({order.status === "preparing" ? "รอแพ็ค" : "รอส่ง"})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="customer-name">
                      ชื่อลูกค้า <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customer-name"
                      value={customerName}
                      placeholder="กรอกชื่อลูกค้า"
                      readOnly={true} // ทำให้เป็นอ่านอย่างเดียว
                      className="bg-muted" // ทำให้เห็นความแตกต่าง
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-phone">
                      เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customer-phone"
                      value={customerPhone}
                      placeholder="กรอกเบอร์โทรศัพท์"
                      readOnly={true} // ทำให้เป็นอ่านอย่างเดียว
                      className="bg-muted" // ทำให้เห็นความแตกต่าง
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customer-address">
                    ที่อยู่จัดส่ง <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="customer-address"
                    value={customerAddress}
                    placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                    rows={3}
                    readOnly={true} // ทำให้เป็นอ่านอย่างเดียว
                    className="bg-muted" // ทำให้เห็นความแตกต่าง
                  />
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card className="border-0 rounded-2xl">
              <CardHeader>
                <CardTitle>ข้อมูลการจัดส่ง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <Label htmlFor="driver-name">
                      ชื่อคนขับ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="driver-name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="กรอกชื่อคนขับ"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle-plate">
                      ทะเบียนรถ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="vehicle-plate"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      placeholder="กข-1234"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-phone">
                      เบอร์โทรคนขับ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="driver-phone"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      placeholder="081-234-5678"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label htmlFor="vehicle-type">
                      ประเภทรถ <span className="text-red-500">*</span>
                    </Label>
                    <Select value={vehicleType} onValueChange={setVehicleType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทรถ" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="service-provider">
                      ผู้ให้บริการ <span className="text-red-500">*</span>
                    </Label>
                    <Select value={serviceProvider} onValueChange={setServiceProvider} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกผู้ให้บริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceProviders.map((provider) => (
                          <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>
                    วันที่จัดส่ง <span className="text-red-500">*</span>
                  </Label>
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
                        onSelect={(date) => date && setDeliveryDate(date)}
                        disabled={(date) =>
                          date > new Date() || date < new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="delivery-notes">หมายเหตุการจัดส่ง</Label>
                  <Textarea
                    id="delivery-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="หมายเหตุเพิ่มเติม..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={
                      !selectedOrder || // ต้องมีคำสั่งซื้อที่เลือก
                      !driverName.trim() ||
                      !vehiclePlate.trim() ||
                      !driverPhone.trim() ||
                      !vehicleType ||
                      !serviceProvider
                    }
                  >
                    สร้างการจัดส่ง
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">ยืนยันการสร้างการจัดส่ง</AlertDialogTitle>
                    <div className="text-center space-y-3 text-muted-foreground text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                        <div className="font-medium text-gray-900">รายละเอียดการจัดส่ง:</div>
                        <div className="text-sm space-y-1">
                          <div>
                            <span className="font-medium">รหัสคำสั่งซื้อ:</span> {selectedOrder?.orderId}
                          </div>
                          <div>
                            <span className="font-medium">ลูกค้า:</span> {selectedOrder?.customerName}
                          </div>
                          {selectedOrder?.customerPhone && (
                            <div>
                              <span className="font-medium">เบอร์โทร:</span> {selectedOrder?.customerPhone}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">ที่อยู่:</span> {selectedOrder?.customerAddress.substring(0, 60)}{selectedOrder && selectedOrder.customerAddress.length > 60 ? "..." : ""}
                          </div>
                          <div>
                            <span className="font-medium">คนขับ:</span> {driverName} ({driverPhone})
                          </div>
                          <div>
                            <span className="font-medium">ทะเบียนรถ:</span> {vehiclePlate} ({vehicleType})
                          </div>
                          <div>
                            <span className="font-medium">ผู้ให้บริการ:</span> {serviceProvider}
                          </div>
                          <div>
                            <span className="font-medium">วันที่จัดส่ง:</span>{" "}
                            {format(deliveryDate, "dd/MM/yyyy", { locale: th })}
                          </div>
                          {deliveryImages.length > 0 && (
                            <div>
                              <span className="font-medium">รูปภาพ:</span> {deliveryImages.length} รูป
                            </div>
                          )}
                          {notes && (
                            <div>
                              <span className="font-medium">หมายเหตุ:</span> {notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-600">คุณแน่ใจหรือไม่ที่จะสร้างการจัดส่งนี้?</div>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex gap-2">
                    <AlertDialogCancel className="flex-1">ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          กำลังสร้าง...
                        </div>
                      ) : (
                        "ยืนยันการสร้าง"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="button" variant="outline" asChild>
                <Link href="/delivery">ยกเลิก</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Delivery Images */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-0 rounded-2xl">
            <CardHeader>
              <CardTitle>รูปภาพการจัดส่ง</CardTitle>
              <p className="text-sm text-muted-foreground">อัพโหลดได้สูงสุด 3 รูป</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Grid */}
              {deliveryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {deliveryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt="Delivery preview"
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      {/* Remove Button */}
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeImage(image.id)}
                          title="ลบรูปภาพ"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Upload Area */}
              {deliveryImages.length < 3 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-600">อัพโหลดรูปภาพการจัดส่ง ({deliveryImages.length}/3)</p>
                      <p className="text-xs text-gray-400">PNG, JPG ขนาดไม่เกิน 5MB</p>
                    </div>
                  </div>
                </div>
              )}
              {/* File Input */}
              {deliveryImages.length < 3 && (
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                </div>
              )}
              {/* Instructions */}
              {deliveryImages.length > 0 && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• คลิก X เพื่อลบรูปภาพ</p>
                  <p>• รูปภาพจะแสดงในรายการจัดส่ง</p>
                </div>
              )}
              {/* Driver Summary */}
              <div className="border-t pt-4 mt-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {driverName && <p>คนขับ: {driverName}</p>}
                  {vehiclePlate && <p>ทะเบียนรถ: {vehiclePlate}</p>}
                  {vehicleType && <p>ประเภทรถ: {vehicleType}</p>}
                  {serviceProvider && <p>ผู้ให้บริการ: {serviceProvider}</p>}
                  {driverPhone && <p>เบอร์โทร: {driverPhone}</p>}
                  <p>วันที่จัดส่ง: {format(deliveryDate, "dd/MM/yyyy", { locale: th })}</p>
                  {selectedOrder && (
                    <p>
                      ที่อยู่: {selectedOrder.customerAddress.substring(0, 30)}{selectedOrder.customerAddress.length > 30 ? "..." : ""}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>เพิ่มการจัดส่งสำเร็จ</AlertDialogTitle>
            <AlertDialogDescription>
              การจัดส่งสำหรับคำสั่งซื้อ &quot;{selectedOrder?.orderId}&quot; ได้ถูกเพิ่มเรียบร้อยแล้ว
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessConfirm} className="bg-green-600 hover:bg-green-700">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export { CreateDeliveryPage }
export default CreateDeliveryPage
