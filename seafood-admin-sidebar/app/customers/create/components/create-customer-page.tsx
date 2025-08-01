"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  CreditCard,
  Banknote,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  MapPin,
  CheckCircle,
} from "lucide-react" // Added CheckCircle icon

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog" // Added DialogFooter

interface Address {
  id: string
  label: string
  address: string
  isDefault: boolean
}

interface NotificationSettings {
  orderConfirmation: boolean
  paymentReminder: boolean
  packaging: boolean
  shipping: boolean
}

interface DiscountSettings {
  type: "percentage" | "amount"
  value: number
  enabled: boolean
}

const CreateCustomerPage = () => {
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [addresses, setAddresses] = React.useState<Address[]>([])
  const [customerType, setCustomerType] = React.useState<"cash" | "credit">("cash")
  const [primaryBank, setPrimaryBank] = React.useState("")

  // Credit-related fields - No initial values for new customers
  const [creditType, setCreditType] = React.useState<"amount" | "bills" | "days">("amount")
  const [creditLimit, setCreditLimit] = React.useState<number | "">("")
  const [creditBills, setCreditBills] = React.useState<number | "">("")
  const [creditDays, setCreditDays] = React.useState<number | "">("")

  // Notification settings
  const [notifications, setNotifications] = React.useState<NotificationSettings>({
    orderConfirmation: true,
    paymentReminder: true,
    packaging: true,
    shipping: true,
  })

  // Address form states
  const [showAddressForm, setShowAddressForm] = React.useState(false)
  const [editingAddressId, setEditingAddressId] = React.useState<string | null>(null)
  const [addressLabel, setAddressLabel] = React.useState("")
  const [addressText, setAddressText] = React.useState("")
  const [isDefaultAddress, setIsDefaultAddress] = React.useState(false)

  // Dialog states
  const [showSaveConfirmation, setShowSaveConfirmation] = React.useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false) // New state for success dialog

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSaveConfirmation(true)
  }

  const confirmSave = () => {
    // Handle form submission here
    console.log({
      customerName,
      customerPhone,
      addresses,
      customerType,
      creditLimit,
      creditBills,
      creditDays,
      primaryBank,
      notifications,
    })
    setShowSaveConfirmation(false)
    setShowSuccessDialog(true) // Show success dialog after confirmation
    // You can add navigation or success message here
    // Example: router.push('/customers')
  }

  const cancelSave = () => {
    setShowSaveConfirmation(false)
  }

  const handleAddAddress = () => {
    if (!addressLabel.trim() || !addressText.trim()) return
    const newAddress: Address = {
      id: Date.now().toString(),
      label: addressLabel,
      address: addressText,
      isDefault: isDefaultAddress || addresses.length === 0, // First address is default
    }
    // If this is set as default, remove default from others
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: newAddress.isDefault ? false : addr.isDefault,
    }))
    setAddresses([...updatedAddresses, newAddress])
    resetAddressForm()
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddressId(address.id)
    setAddressLabel(address.label)
    setAddressText(address.address)
    setIsDefaultAddress(address.isDefault)
    setShowAddressForm(true)
  }

  const handleUpdateAddress = () => {
    if (!addressLabel.trim() || !addressText.trim() || !editingAddressId) return
    const updatedAddresses = addresses.map((addr) => {
      if (addr.id === editingAddressId) {
        return {
          ...addr,
          label: addressLabel,
          address: addressText,
          isDefault: isDefaultAddress,
        }
      }
      // If this address is being set as default, remove default from others
      return {
        ...addr,
        isDefault: isDefaultAddress ? false : addr.isDefault,
      }
    })
    setAddresses(updatedAddresses)
    resetAddressForm()
  }

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)
    const remainingAddresses = addresses.filter((addr) => addr.id !== id)
    // If we're deleting the default address and there are other addresses, make the first one default
    if (addressToDelete?.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true
    }
    setAddresses(remainingAddresses)
  }

  const resetAddressForm = () => {
    setShowAddressForm(false)
    setEditingAddressId(null)
    setAddressLabel("")
    setAddressText("")
    setIsDefaultAddress(false)
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="space-y-6 ">
        {" "}
        {/* Adjusted for full-screen responsive */}
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">เพิ่มลูกค้าใหม่</h1>
            <p className="text-muted-foreground">เพิ่มข้อมูลลูกค้าใหม่เข้าสู่ระบบ</p>
          </div>
        </div>
        <div className="w-full">
          {" "}
          {/* Removed max-w-2xl */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="customer-name">
                    ชื่อลูกค้า <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="กรอกชื่อลูกค้า"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customer-phone">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customer-phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="กรอกเบอร์โทรศัพท์"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="primary-bank">
                    ธนาคารหลักที่ชำระเงิน <span className="text-red-500">*</span>
                  </Label>
                  <Select value={primaryBank} onValueChange={setPrimaryBank} required>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกธนาคาร" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kbank">ธนาคารกสิกรไทย</SelectItem>
                      <SelectItem value="scb">ธนาคารไทยพาณิชย์</SelectItem>
                      <SelectItem value="bbl">ธนาคารกรุงเทพ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {/* Addresses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  ที่อยู่จัดส่ง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address List */}
                {addresses.length > 0 && (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-3 border rounded-lg bg-muted/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{address.label}</span>
                              {address.isDefault && (
                                <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
                                  ค่าเริ่มต้น
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => handleEditAddress(address)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAddress(address.id)}
                              disabled={addresses.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Add Address Form */}
                {showAddressForm && (
                  <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                    <h4 className="font-medium text-sm">{editingAddressId ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}</h4>
                    <div>
                      <Label htmlFor="address-label">
                        ชื่อที่อยู่ <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address-label"
                        value={addressLabel}
                        onChange={(e) => setAddressLabel(e.target.value)}
                        placeholder="เช่น บ้าน, ออฟฟิศ, คลังสินค้า"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address-text">
                        ที่อยู่ <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address-text"
                        value={addressText}
                        onChange={(e) => setAddressText(e.target.value)}
                        placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="default-address" checked={isDefaultAddress} onCheckedChange={setIsDefaultAddress} />
                      <Label htmlFor="default-address">ตั้งเป็นที่อยู่เริ่มต้น</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
                        disabled={!addressLabel.trim() || !addressText.trim()}
                      >
                        {editingAddressId ? "บันทึกการแก้ไข" : "เพิ่มที่อยู่"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetAddressForm}>
                        ยกเลิก
                      </Button>
                    </div>
                  </div>
                )}
                {/* Add Address Button */}
                {!showAddressForm && (
                  <Button type="button" variant="outline" onClick={() => setShowAddressForm(true)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มที่อยู่ใหม่
                  </Button>
                )}
                {addresses.length === 0 && !showAddressForm && (
                  <p className="text-sm text-muted-foreground text-center py-4">ยังไม่มีที่อยู่จัดส่ง กดปุ่มด้านบนเพื่อเพิ่มที่อยู่</p>
                )}
              </CardContent>
            </Card>
            {/* Customer Type and Credit */}
            <Card>
              <CardHeader>
                <CardTitle>ประเภทลูกค้าและเครดิต</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>ประเภทลูกค้า</Label>
                  <RadioGroup
                    value={customerType}
                    onValueChange={(value) => setCustomerType(value as "cash" | "credit")}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" className="border-black" /> {/* Added border-black */}
                      <Label htmlFor="cash" className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        เงินสด
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit" id="credit" className="border-black" /> {/* Added border-black */}
                      <Label htmlFor="credit" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        เครดิต
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
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
                            <RadioGroupItem value="amount" id="amount" className="border-black" />{" "}
                            {/* Added border-black */}
                            <Label htmlFor="amount">วงเงินเครดิต</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bills" id="bills" className="border-black" />{" "}
                            {/* Added border-black */}
                            <Label htmlFor="bills">จำนวนบิล</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="days" id="days" className="border-black" />{" "}
                            {/* Added border-black */}
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
                              onChange={(e) => setCreditLimit(Number(e.target.value))}
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
                              onChange={(e) => setCreditBills(Number(e.target.value))}
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
                              onChange={(e) => setCreditDays(Number(e.target.value))}
                              placeholder="กรอกจำนวนวัน"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  การแจ้งเตือนลูกค้า
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">เลือกประเภทการแจ้งเตือนที่ต้องการส่งให้ลูกค้าผ่าน LINE</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-confirmation">แจ้งคอนเฟิร์มออเดอร์</Label>
                      <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อได้รับคำสั่งซื้อและยืนยันออเดอร์</p>
                    </div>
                    <Switch
                    id="order-confirmation"
                    checked={notifications.orderConfirmation}
                    onCheckedChange={(checked) => handleNotificationChange("orderConfirmation", checked)}
                    className="data-[state=checked]:bg-green-500"
                  />

                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-reminder">แจ้งเตือนยอดค้างชำระ</Label>
                      <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อมียอดค้างชำระหรือใกล้ครบกำหนด</p>
                    </div>
                    <Switch
                      id="payment-reminder"
                      checked={notifications.paymentReminder}
                      onCheckedChange={(checked) => handleNotificationChange("paymentReminder", checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="packaging">แพ็คสินค้า</Label>
                      <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อเริ่มแพ็คสินค้าและพร้อมจัดส่ง</p>
                    </div>
                    <Switch
                      id="packaging"
                      checked={notifications.packaging}
                      onCheckedChange={(checked) => handleNotificationChange("packaging", checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shipping">จัดส่ง</Label>
                      <p className="text-xs text-muted-foreground">แจ้งเตือนเมื่อสินค้าถูกจัดส่งและหมายเลขติดตาม</p>
                    </div>
                    <Switch
                      id="shipping"
                      checked={notifications.shipping}
                      onCheckedChange={(checked) => handleNotificationChange("shipping", checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                เพิ่มลูกค้า
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/customers">ยกเลิก</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการเพิ่มลูกค้า</DialogTitle>
            <DialogDescription>คุณต้องการเพิ่มลูกค้าใหม่ &quot;{customerName}&quot; เข้าสู่ระบบหรือไม่?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={cancelSave}>
              ยกเลิก
            </Button>
            <Button onClick={confirmSave}>ยืนยันการเพิ่ม</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl font-bold">เพิ่มลูกค้าใหม่เรียบร้อยแล้ว!</DialogTitle>
            <DialogDescription>ข้อมูลลูกค้า &quot;{customerName}&quot; ได้ถูกบันทึกเข้าสู่ระบบแล้ว</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
              ตกลง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { CreateCustomerPage }
export default CreateCustomerPage
