"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, ArrowLeft, Upload, X, CalendarIcon } from "lucide-react"
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Sample customer data with multiple addresses
const customers = [
  {
    id: "1",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    addresses: [
      {
        id: "1-1",
        label: "บ้าน",
        address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
      },
      {
        id: "1-2",
        label: "ออฟฟิศ",
        address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
      },
    ],
  },
  {
    id: "2",
    name: "บริษัท อาหารทะเล จำกัด",
    phone: "02-123-4567",
    addresses: [
      {
        id: "2-1",
        label: "สำนักงานใหญ่",
        address: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
      },
      {
        id: "2-2",
        label: "โรงงาน",
        address: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
      },
      {
        id: "2-3",
        label: "คลังสินค้า",
        address: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
      },
    ],
  },
  {
    id: "3",
    name: "ร้านอาหารทะเลสด",
    phone: "089-876-5432",
    addresses: [
      {
        id: "3-1",
        label: "ร้านหลัก",
        address: "987 ถนนวิทยุ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
      },
    ],
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
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>("")
  const [selectedAddress, setSelectedAddress] = React.useState<string>("")
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

  const selectedCustomerData = customers.find((c) => c.id === selectedCustomer)
  const availableAddresses = selectedCustomerData?.addresses || []

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      setSelectedCustomer(customerId)
      setCustomerName(customer.name)
      setCustomerPhone(customer.phone)

      // Reset address selection when customer changes
      setSelectedAddress("")
      setCustomerAddress("")

      // If customer has only one address, auto-select it
      if (customer.addresses.length === 1) {
        setSelectedAddress(customer.addresses[0].id)
        setCustomerAddress(customer.addresses[0].address)
      }
    }
  }

  const handleAddressSelect = (addressId: string) => {
    const address = availableAddresses.find((addr) => addr.id === addressId)
    if (address) {
      setSelectedAddress(addressId)
      setCustomerAddress(address.address)
    }
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

    // Validation
    if (!customerName.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกชื่อลูกค้า",
        variant: "destructive",
      })
      return
    }

    if (!customerAddress.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกที่อยู่จัดส่ง",
        variant: "destructive",
      })
      return
    }

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
        customerName,
        customerPhone,
        customerAddress,
        selectedAddressLabel: availableAddresses.find((addr) => addr.id === selectedAddress)?.label,
        notes,
        driverName,
        vehiclePlate,
        driverPhone,
        vehicleType,
        serviceProvider,
        deliveryDate,
        deliveryImages,
        status: "preparing",
        createdAt: new Date(),
      }

      console.log("Creating delivery:", deliveryData)

      toast({
        title: "สำเร็จ!",
        description: "สร้างการจัดส่งใหม่เรียบร้อยแล้ว",
      })

      setIsSubmitDialogOpen(false)
      // Redirect back to delivery page
      router.push("/delivery")
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  ข้อมูลลูกค้า
                </CardTitle>
                {selectedCustomer && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer("")
                      setSelectedAddress("")
                      setCustomerName("")
                      setCustomerPhone("")
                      setCustomerAddress("")
                    }}
                  >
                    ล้างการกรอง
                  </Button>
                )}
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

                {/* Address Selection - Show only if customer is selected and has multiple addresses */}
                {selectedCustomer && availableAddresses.length > 1 && (
                  <div>
                    <Label htmlFor="address-select">เลือกที่อยู่</Label>
                    <Select value={selectedAddress} onValueChange={handleAddressSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกที่อยู่จัดส่ง" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAddresses.map((address) => (
                          <SelectItem key={address.id} value={address.id}>
                            {address.label} - {address.address.substring(0, 50)}...
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="customer-name">ชื่อลูกค้า *</Label>
                    <Input
                      id="customer-name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="กรอกชื่อลูกค้า"
                      required
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
                  <Label htmlFor="customer-address">ที่อยู่จัดส่ง *</Label>
                  <Textarea
                    id="customer-address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลการจัดส่ง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <Label htmlFor="driver-name">ชื่อคนขับ *</Label>
                    <Input
                      id="driver-name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="กรอกชื่อคนขับ"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle-plate">ทะเบียนรถ *</Label>
                    <Input
                      id="vehicle-plate"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      placeholder="กข-1234"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="driver-phone">เบอร์โทรคนขับ *</Label>
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
                    <Label htmlFor="vehicle-type">ประเภทรถ *</Label>
                    <Select value={vehicleType} onValueChange={setVehicleType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทรถ" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="service-provider">ผู้ให้บริการ *</Label>
                    <Select value={serviceProvider} onValueChange={setServiceProvider} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกผู้ให้บริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceProviders.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>วันที่จัดส่ง *</Label>
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
                      !customerName.trim() ||
                      !customerAddress.trim() ||
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
                            <span className="font-medium">ลูกค้า:</span> {customerName}
                          </div>
                          {customerPhone && (
                            <div>
                              <span className="font-medium">เบอร์โทร:</span> {customerPhone}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">ที่อยู่:</span> {customerAddress.substring(0, 60)}
                            {customerAddress.length > 60 ? "..." : ""}
                          </div>
                          {selectedAddress && availableAddresses.find((addr) => addr.id === selectedAddress) && (
                            <div>
                              <span className="font-medium">ประเภทที่อยู่:</span>{" "}
                              {availableAddresses.find((addr) => addr.id === selectedAddress)?.label}
                            </div>
                          )}
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
          <Card className="sticky top-4">
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
                  {selectedAddress && availableAddresses.find((addr) => addr.id === selectedAddress) && (
                    <p>ที่อยู่: {availableAddresses.find((addr) => addr.id === selectedAddress)?.label}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { CreateDeliveryPage }
export default CreateDeliveryPage
