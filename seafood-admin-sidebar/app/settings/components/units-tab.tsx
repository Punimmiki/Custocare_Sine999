"use client"

import * as React from "react"
import { Calculator, Plus, Edit, Trash2, Save } from "lucide-react"
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

// Sample units data
const initialUnits = [
  {
    id: "1",
    name: "กิโลกรัม",
    symbol: "กก.",
    type: "weight",
    isActive: true,
    isDefault: true,
  },
  {
    id: "2",
    name: "กรัม",
    symbol: "ก.",
    type: "weight",
    isActive: true,
    isDefault: false,
  },
  {
    id: "3",
    name: "ชิ้น",
    symbol: "ชิ้น",
    type: "piece",
    isActive: true,
    isDefault: false,
  },
  {
    id: "4",
    name: "ลิตร",
    symbol: "ล.",
    type: "volume",
    isActive: true,
    isDefault: false,
  },
  {
    id: "5",
    name: "มิลลิลิตร",
    symbol: "มล.",
    type: "volume",
    isActive: false,
    isDefault: false,
  },
]

const unitTypes = {
  weight: { label: "น้ำหนัก", variant: "default" as const },
  volume: { label: "ปริมาตร", variant: "secondary" as const },
  piece: { label: "จำนวน", variant: "outline" as const },
  length: { label: "ความยาว", variant: "destructive" as const },
}

export function UnitsTab() {
  const [units, setUnits] = React.useState(initialUnits)
  const [isAddUnitOpen, setIsAddUnitOpen] = React.useState(false)
  const [editingUnit, setEditingUnit] = React.useState<any>(null)

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    symbol: "",
    type: "",
    isActive: true,
    isDefault: false,
  })

  const handleAddUnit = () => {
    setFormData({
      name: "",
      symbol: "",
      type: "",
      isActive: true,
      isDefault: false,
    })
    setEditingUnit(null)
    setIsAddUnitOpen(true)
  }

  const handleEditUnit = (unit: any) => {
    setFormData({
      name: unit.name,
      symbol: unit.symbol,
      type: unit.type,
      isActive: unit.isActive,
      isDefault: unit.isDefault,
    })
    setEditingUnit(unit)
    setIsAddUnitOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUnit) {
      // Update existing unit
      setUnits(units.map((unit) => (unit.id === editingUnit.id ? { ...unit, ...formData } : unit)))
    } else {
      // Add new unit
      const newUnit = {
        id: String(units.length + 1),
        ...formData,
      }
      setUnits([...units, newUnit])
    }
    setIsAddUnitOpen(false)
  }

  const handleDeleteUnit = (unitId: string) => {
    setUnits(units.filter((unit) => unit.id !== unitId))
  }

  const handleToggleActive = (unitId: string, isActive: boolean) => {
    setUnits(units.map((unit) => (unit.id === unitId ? { ...unit, isActive } : unit)))
  }

  const handleSetDefault = (unitId: string) => {
    setUnits(
      units.map((unit) => ({
        ...unit,
        isDefault: unit.id === unitId,
      })),
    )
  }

  const handleSave = () => {
    // Save units settings logic here
    console.log("Saving units settings:", units)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ตั้งค่าหน่วยนับ</h2>
          <p className="text-muted-foreground">จัดการหน่วยนับสำหรับสินค้าและการขาย</p>
        </div>
        <Button onClick={handleAddUnit}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มหน่วยนับ
        </Button>
      </div>

      {/* Units Table */}
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            หน่วยนับทั้งหมด
          </CardTitle>
          <CardDescription>จัดการหน่วยนับที่ใช้ในระบบ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อหน่วย</TableHead>
                  <TableHead>สัญลักษณ์</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ค่าเริ่มต้น</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell>{unit.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={unitTypes[unit.type as keyof typeof unitTypes].variant}>
                        {unitTypes[unit.type as keyof typeof unitTypes].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={unit.isActive}
                          onCheckedChange={(checked) => handleToggleActive(unit.id, checked)}
                        />
                        <span className={unit.isActive ? "text-green-600" : "text-red-600"}>
                          {unit.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {unit.isDefault ? (
                        <Badge>ค่าเริ่มต้น</Badge>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => handleSetDefault(unit.id)}>
                          ตั้งเป็นค่าเริ่มต้น
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUnit(unit)}>
                          <Edit className="h-4 w-4 mr-1" />
                          แก้ไข
                        </Button>
                        {!unit.isDefault && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-1" />
                                ลบ
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>ยืนยันการลบหน่วยนับ</AlertDialogTitle>
                                <AlertDialogDescription>
                                  คุณแน่ใจหรือไม่ที่จะลบหน่วยนับ "{unit.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUnit(unit.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  ลบหน่วยนับ
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

      {/* Add/Edit Unit Dialog */}
      <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUnit ? "แก้ไขหน่วยนับ" : "เพิ่มหน่วยนับใหม่"}</DialogTitle>
            <DialogDescription>{editingUnit ? "แก้ไขข้อมูลหน่วยนับ" : "เพิ่มหน่วยนับใหม่สำหรับใช้ในระบบ"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="unit-name">ชื่อหน่วย *</Label>
              <Input
                id="unit-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="เช่น กิโลกรัม"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit-symbol">สัญลักษณ์ *</Label>
              <Input
                id="unit-symbol"
                value={formData.symbol}
                onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value }))}
                placeholder="เช่น กก."
                required
              />
            </div>
            <div>
              <Label htmlFor="unit-type">ประเภท *</Label>
              <select
                id="unit-type"
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">เลือกประเภท</option>
                <option value="weight">น้ำหนัก</option>
                <option value="volume">ปริมาตร</option>
                <option value="piece">จำนวน</option>
                <option value="length">ความยาว</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="unit-active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="unit-active">เปิดใช้งาน</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="unit-default"
                checked={formData.isDefault}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked }))}
              />
              <Label htmlFor="unit-default">ตั้งเป็นค่าเริ่มต้น</Label>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingUnit ? "บันทึกการแก้ไข" : "เพิ่มหน่วยนับ"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    
    </div>
  )
}
