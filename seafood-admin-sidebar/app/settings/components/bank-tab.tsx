"use client"

import * as React from "react"
import { Plus, Edit, Trash2, Save, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"

// Sample bank accounts data
const initialBankAccounts = [
  {
    id: "1",
    bankName: "ธนาคารกสิกรไทย",
    accountName: "บริษัท ซีฟู้ด เฟรช จำกัด",
    accountNumber: "123-4-56789-0",
    branch: "สาขาสีลม",
    isActive: true,
    isDefault: true,
    qrCode: "",
    notes: "บัญชีหลักสำหรับรับชำระเงิน",
  },
  {
    id: "2",
    bankName: "ธนาคารไทยพาณิชย์",
    accountName: "บริษัท ซีฟู้ด เฟรช จำกัด",
    accountNumber: "987-6-54321-0",
    branch: "สาขาสาทร",
    isActive: true,
    isDefault: false,
    qrCode: "",
    notes: "บัญชีสำรอง",
  },
  {
    id: "3",
    bankName: "ธนาคารกรุงเทพ",
    accountName: "นายสมชาย ใจดี",
    accountNumber: "555-1-23456-7",
    branch: "สาขาอโศก",
    isActive: false,
    isDefault: false,
    qrCode: "",
    notes: "บัญชีส่วนตัว (ไม่ใช้แล้ว)",
  },
]

export function BankTab() {
  const [bankAccounts, setBankAccounts] = React.useState(initialBankAccounts)
  const [isAddBankOpen, setIsAddBankOpen] = React.useState(false)
  const [editingBank, setEditingBank] = React.useState<any>(null)

  // Form state
  const [formData, setFormData] = React.useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    branch: "",
    isActive: true,
    isDefault: false,
    qrCode: "",
    notes: "",
  })

  const handleAddBank = () => {
    setFormData({
      bankName: "",
      accountName: "",
      accountNumber: "",
      branch: "",
      isActive: true,
      isDefault: false,
      qrCode: "",
      notes: "",
    })
    setEditingBank(null)
    setIsAddBankOpen(true)
  }

  const handleEditBank = (bank: any) => {
    setFormData({
      bankName: bank.bankName,
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      branch: bank.branch,
      isActive: bank.isActive,
      isDefault: bank.isDefault,
      qrCode: bank.qrCode,
      notes: bank.notes,
    })
    setEditingBank(bank)
    setIsAddBankOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBank) {
      // Update existing bank account
      setBankAccounts(bankAccounts.map((bank) => (bank.id === editingBank.id ? { ...bank, ...formData } : bank)))
    } else {
      // Add new bank account
      const newBank = {
        id: String(bankAccounts.length + 1),
        ...formData,
      }
      setBankAccounts([...bankAccounts, newBank])
    }
    setIsAddBankOpen(false)
  }

  const handleDeleteBank = (bankId: string) => {
    setBankAccounts(bankAccounts.filter((bank) => bank.id !== bankId))
  }

  const handleToggleActive = (bankId: string, isActive: boolean) => {
    setBankAccounts(bankAccounts.map((bank) => (bank.id === bankId ? { ...bank, isActive } : bank)))
  }

  const handleSetDefault = (bankId: string) => {
    setBankAccounts(
      bankAccounts.map((bank) => ({
        ...bank,
        isDefault: bank.id === bankId,
      })),
    )
  }

  const handleSave = () => {
    // Save bank settings logic here
    console.log("Saving bank settings:", bankAccounts)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ตั้งค่าธนาคาร</h2>
          <p className="text-muted-foreground">จัดการบัญชีธนาคารสำหรับรับชำระเงิน</p>
        </div>
        <Button onClick={handleAddBank}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มบัญชีธนาคาร
        </Button>
      </div>

      {/* Bank Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            บัญชีธนาคารทั้งหมด
          </CardTitle>
          <CardDescription>จัดการบัญชีธนาคารสำหรับรับชำระเงิน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ธนาคาร</TableHead>
                  <TableHead>ชื่อบัญชี</TableHead>
                  <TableHead>เลขบัญชี</TableHead>
                  <TableHead>สาขา</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ค่าเริ่มต้น</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankAccounts.map((bank) => (
                  <TableRow key={bank.id}>
                    <TableCell className="font-medium">{bank.bankName}</TableCell>
                    <TableCell>{bank.accountName}</TableCell>
                    <TableCell className="font-mono">{bank.accountNumber}</TableCell>
                    <TableCell>{bank.branch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={bank.isActive}
                          onCheckedChange={(checked) => handleToggleActive(bank.id, checked)}
                        />
                        <span className={bank.isActive ? "text-green-600" : "text-red-600"}>
                          {bank.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {bank.isDefault ? (
                        <Badge>ค่าเริ่มต้น</Badge>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(bank.id)}>
                          ตั้งเป็นค่าเริ่มต้น
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditBank(bank)}>
                          <Edit className="h-4 w-4 mr-1" />
                          แก้ไข
                        </Button>
                        {!bank.isDefault && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-1" />
                                ลบ
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>ยืนยันการลบบัญชีธนาคาร</AlertDialogTitle>
                                <AlertDialogDescription>
                                  คุณแน่ใจหรือไม่ที่จะลบบัญชี "{bank.accountNumber}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteBank(bank.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  ลบบัญชี
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Bank Dialog */}
      <Dialog open={isAddBankOpen} onOpenChange={setIsAddBankOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBank ? "แก้ไขบัญชีธนาคาร" : "เพิ่มบัญชีธนาคารใหม่"}</DialogTitle>
            <DialogDescription>{editingBank ? "แก้ไขข้อมูลบัญชีธนาคาร" : "เพิ่มบัญชีธนาคารใหม่สำหรับรับชำระเงิน"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="bank-name">ชื่อธนาคาร *</Label>
                <Input
                  id="bank-name"
                  value={formData.bankName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bankName: e.target.value }))}
                  placeholder="เช่น ธนาคารกสิกรไทย"
                  required
                />
              </div>
              <div>
                <Label htmlFor="branch">สาขา *</Label>
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData((prev) => ({ ...prev, branch: e.target.value }))}
                  placeholder="เช่น สาขาสีลม"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="account-name">ชื่อบัญชี *</Label>
              <Input
                id="account-name"
                value={formData.accountName}
                onChange={(e) => setFormData((prev) => ({ ...prev, accountName: e.target.value }))}
                placeholder="ชื่อเจ้าของบัญชี"
                required
              />
            </div>
            <div>
              <Label htmlFor="account-number">เลขบัญชี *</Label>
              <Input
                id="account-number"
                value={formData.accountNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="xxx-x-xxxxx-x"
                required
              />
            </div>
            <div>
              <Label htmlFor="qr-code">QR Code สำหรับโอนเงิน</Label>
              <Input
                id="qr-code"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Handle file upload logic here
                  console.log("QR Code file:", e.target.files?.[0])
                }}
              />
              <p className="text-sm text-muted-foreground mt-1">อัพโหลดรูป QR Code สำหรับให้ลูกค้าสแกนโอนเงิน</p>
            </div>
            <div>
              <Label htmlFor="notes">หมายเหตุ</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="หมายเหตุเพิ่มเติม"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="bank-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="bank-active">เปิดใช้งาน</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="bank-default"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked }))}
                />
                <Label htmlFor="bank-default">ตั้งเป็นค่าเริ่มต้น</Label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingBank ? "บันทึกการแก้ไข" : "เพิ่มบัญชีธนาคาร"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddBankOpen(false)}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  )
}
