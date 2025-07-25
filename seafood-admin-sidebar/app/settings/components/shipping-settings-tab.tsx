"use client"

import * as React from "react"
import { Truck, Plus, Edit, Trash2, Save, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Sample shipping providers data
const initialProviders = [
  {
    id: "1",
    name: "ขนส่งเอง",
    type: "internal",
    isActive: true,
    description: "ขนส่งด้วยรถของร้านเอง",
    contactInfo: "081-234-5678",
  },
  {
    id: "2",
    name: "Kerry Express",
    type: "external",
    isActive: true,
    description: "บริการขนส่งด่วน Kerry",
    contactInfo: "1418",
  },
  {
    id: "3",
    name: "Thailand Post",
    type: "external",
    isActive: false,
    description: "ไปรษณีย์ไทย",
    contactInfo: "1545",
  },
]

// Sample shipping fee rules data
const initialFeeRules = [
  {
    id: "1",
    name: "ส่งฟรีในเขต",
    zone: "กรุงเทพฯ และปริมณฑล",
    minOrder: 1000,
    maxDistance: 20,
    baseFee: 0,
    perKmFee: 0,
    isActive: true,
  },
  {
    id: "2",
    name: "ส่งปกติในเขต",
    zone: "กรุงเทพฯ และปริมณฑล",
    minOrder: 0,
    maxDistance: 20,
    baseFee: 50,
    perKmFee: 5,
    isActive: true,
  },
  {
    id: "3",
    name: "ส่งต่างจังหวัด",
    zone: "ต่างจังหวัด",
    minOrder: 0,
    maxDistance: 999,
    baseFee: 100,
    perKmFee: 10,
    isActive: true,
  },
]

const providerTypes = {
  internal: { label: "ขนส่งเอง", variant: "default" as const },
  external: { label: "บริษัทขนส่ง", variant: "secondary" as const },
}

export function ShippingSettingsTab() {
  const [providers, setProviders] = React.useState(initialProviders)
  const [feeRules, setFeeRules] = React.useState(initialFeeRules)
  const [isAddProviderOpen, setIsAddProviderOpen] = React.useState(false)
  const [isAddFeeRuleOpen, setIsAddFeeRuleOpen] = React.useState(false)
  const [editingProvider, setEditingProvider] = React.useState<any>(null)
  const [editingFeeRule, setEditingFeeRule] = React.useState<any>(null)

  // Provider form state
  const [providerForm, setProviderForm] = React.useState({
    name: "",
    type: "",
    description: "",
    contactInfo: "",
    isActive: true,
  })

  // Fee rule form state
  const [feeRuleForm, setFeeRuleForm] = React.useState({
    name: "",
    zone: "",
    minOrder: 0,
    maxDistance: 0,
    baseFee: 0,
    perKmFee: 0,
    isActive: true,
  })

  const handleAddProvider = () => {
    setProviderForm({
      name: "",
      type: "",
      description: "",
      contactInfo: "",
      isActive: true,
    })
    setEditingProvider(null)
    setIsAddProviderOpen(true)
  }

  const handleEditProvider = (provider: any) => {
    setProviderForm({
      name: provider.name,
      type: provider.type,
      description: provider.description,
      contactInfo: provider.contactInfo,
      isActive: provider.isActive,
    })
    setEditingProvider(provider)
    setIsAddProviderOpen(true)
  }

  const handleSubmitProvider = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProvider) {
      setProviders(
        providers.map((provider) => (provider.id === editingProvider.id ? { ...provider, ...providerForm } : provider)),
      )
    } else {
      const newProvider = {
        id: String(providers.length + 1),
        ...providerForm,
      }
      setProviders([...providers, newProvider])
    }

    setIsAddProviderOpen(false)
  }

  const handleDeleteProvider = (providerId: string) => {
    setProviders(providers.filter((provider) => provider.id !== providerId))
  }

  const handleAddFeeRule = () => {
    setFeeRuleForm({
      name: "",
      zone: "",
      minOrder: 0,
      maxDistance: 0,
      baseFee: 0,
      perKmFee: 0,
      isActive: true,
    })
    setEditingFeeRule(null)
    setIsAddFeeRuleOpen(true)
  }

  const handleEditFeeRule = (feeRule: any) => {
    setFeeRuleForm({
      name: feeRule.name,
      zone: feeRule.zone,
      minOrder: feeRule.minOrder,
      maxDistance: feeRule.maxDistance,
      baseFee: feeRule.baseFee,
      perKmFee: feeRule.perKmFee,
      isActive: feeRule.isActive,
    })
    setEditingFeeRule(feeRule)
    setIsAddFeeRuleOpen(true)
  }

  const handleSubmitFeeRule = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingFeeRule) {
      setFeeRules(feeRules.map((rule) => (rule.id === editingFeeRule.id ? { ...rule, ...feeRuleForm } : rule)))
    } else {
      const newFeeRule = {
        id: String(feeRules.length + 1),
        ...feeRuleForm,
      }
      setFeeRules([...feeRules, newFeeRule])
    }

    setIsAddFeeRuleOpen(false)
  }

  const handleDeleteFeeRule = (ruleId: string) => {
    setFeeRules(feeRules.filter((rule) => rule.id !== ruleId))
  }

  const handleSave = () => {
    // Save shipping settings logic here
    console.log("Saving shipping settings:", { providers, feeRules })
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">การตั้งค่าการจัดส่ง</h2>
        <p className="text-muted-foreground">จัดการผู้ให้บริการขนส่งและกฎการคิดค่าจัดส่ง</p>
      </div>

      {/* Transport Providers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                ผู้ให้บริการขนส่ง
              </CardTitle>
              <CardDescription>จัดการรายชื่อผู้ให้บริการขนส่ง</CardDescription>
            </div>
            <Button onClick={handleAddProvider}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มผู้ให้บริการ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อผู้ให้บริการ</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>ติดต่อ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>
                      <Badge variant={providerTypes[provider.type as keyof typeof providerTypes].variant}>
                        {providerTypes[provider.type as keyof typeof providerTypes].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={provider.description}>
                      {provider.description}
                    </TableCell>
                    <TableCell>{provider.contactInfo}</TableCell>
                    <TableCell>
                      <Badge variant={provider.isActive ? "default" : "secondary"}>
                        {provider.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProvider(provider)}>
                          <Edit className="h-4 w-4 mr-1" />
                          แก้ไข
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              ลบ
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ยืนยันการลบผู้ให้บริการ</AlertDialogTitle>
                              <AlertDialogDescription>
                                คุณแน่ใจหรือไม่ที่จะลบผู้ให้บริการ "{provider.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProvider(provider.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบผู้ให้บริการ
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Fee Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                กฎการคิดค่าจัดส่ง
              </CardTitle>
              <CardDescription>กำหนดกฎการคิดค่าจัดส่งตามเขตและระยะทาง</CardDescription>
            </div>
            <Button onClick={handleAddFeeRule}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มกฎใหม่
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อกฎ</TableHead>
                  <TableHead>เขต</TableHead>
                  <TableHead>ยอดขั้นต่ำ</TableHead>
                  <TableHead>ระยะทางสูงสุด</TableHead>
                  <TableHead>ค่าจัดส่งพื้นฐาน</TableHead>
                  <TableHead>ค่าจัดส่ง/กม.</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.zone}</TableCell>
                    <TableCell>฿{rule.minOrder.toLocaleString()}</TableCell>
                    <TableCell>{rule.maxDistance} กม.</TableCell>
                    <TableCell>฿{rule.baseFee}</TableCell>
                    <TableCell>฿{rule.perKmFee}</TableCell>
                    <TableCell>
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditFeeRule(rule)}>
                          <Edit className="h-4 w-4 mr-1" />
                          แก้ไข
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" />
                              ลบ
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ยืนยันการลบกฎ</AlertDialogTitle>
                              <AlertDialogDescription>
                                คุณแน่ใจหรือไม่ที่จะลบกฎ "{rule.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteFeeRule(rule.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบกฎ
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Provider Dialog */}
      <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProvider ? "แก้ไขผู้ให้บริการ" : "เพิ่มผู้ให้บริการใหม่"}</DialogTitle>
            <DialogDescription>{editingProvider ? "แก้ไขข้อมูลผู้ให้บริการขนส่ง" : "เพิ่มผู้ให้บริการขนส่งใหม่"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitProvider} className="space-y-4">
            <div>
              <Label htmlFor="provider-name">ชื่อผู้ให้บริการ *</Label>
              <Input
                id="provider-name"
                value={providerForm.name}
                onChange={(e) => setProviderForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="กรอกชื่อผู้ให้บริการ"
                required
              />
            </div>

            <div>
              <Label htmlFor="provider-type">ประเภท *</Label>
              <Select
                value={providerForm.type}
                onValueChange={(value) => setProviderForm((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">ขนส่งเอง</SelectItem>
                  <SelectItem value="external">บริษัทขนส่ง</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="provider-description">รายละเอียด</Label>
              <Textarea
                id="provider-description"
                value={providerForm.description}
                onChange={(e) => setProviderForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="รายละเอียดผู้ให้บริการ"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="provider-contact">ข้อมูลติดต่อ</Label>
              <Input
                id="provider-contact"
                value={providerForm.contactInfo}
                onChange={(e) => setProviderForm((prev) => ({ ...prev, contactInfo: e.target.value }))}
                placeholder="เบอร์โทร หรือข้อมูลติดต่อ"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="provider-active"
                checked={providerForm.isActive}
                onCheckedChange={(checked) => setProviderForm((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="provider-active">เปิดใช้งาน</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingProvider ? "บันทึกการแก้ไข" : "เพิ่มผู้ให้บริการ"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddProviderOpen(false)}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Fee Rule Dialog */}
      <Dialog open={isAddFeeRuleOpen} onOpenChange={setIsAddFeeRuleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFeeRule ? "แก้ไขกฎค่าจัดส่ง" : "เพิ่มกฎค่าจัดส่งใหม่"}</DialogTitle>
            <DialogDescription>{editingFeeRule ? "แก้ไขกฎการคิดค่าจัดส่ง" : "เพิ่มกฎการคิดค่าจัดส่งใหม่"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitFeeRule} className="space-y-4">
            <div>
              <Label htmlFor="rule-name">ชื่อกฎ *</Label>
              <Input
                id="rule-name"
                value={feeRuleForm.name}
                onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="กรอกชื่อกฎ"
                required
              />
            </div>

            <div>
              <Label htmlFor="rule-zone">เขต *</Label>
              <Input
                id="rule-zone"
                value={feeRuleForm.zone}
                onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, zone: e.target.value }))}
                placeholder="เช่น กรุงเทพฯ และปริมณฑล"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="rule-min-order">ยอดขั้นต่ำ (บาท)</Label>
                <Input
                  id="rule-min-order"
                  type="number"
                  min="0"
                  value={feeRuleForm.minOrder}
                  onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, minOrder: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="rule-max-distance">ระยะทางสูงสุด (กม.)</Label>
                <Input
                  id="rule-max-distance"
                  type="number"
                  min="0"
                  value={feeRuleForm.maxDistance}
                  onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, maxDistance: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="rule-base-fee">ค่าจัดส่งพื้นฐาน (บาท)</Label>
                <Input
                  id="rule-base-fee"
                  type="number"
                  min="0"
                  value={feeRuleForm.baseFee}
                  onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, baseFee: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="rule-per-km-fee">ค่าจัดส่งต่อกิโลเมตร (บาท)</Label>
                <Input
                  id="rule-per-km-fee"
                  type="number"
                  min="0"
                  value={feeRuleForm.perKmFee}
                  onChange={(e) => setFeeRuleForm((prev) => ({ ...prev, perKmFee: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="rule-active"
                checked={feeRuleForm.isActive}
                onCheckedChange={(checked) => setFeeRuleForm((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="rule-active">เปิดใช้งาน</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingFeeRule ? "บันทึกการแก้ไข" : "เพิ่มกฎใหม่"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddFeeRuleOpen(false)}>
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
