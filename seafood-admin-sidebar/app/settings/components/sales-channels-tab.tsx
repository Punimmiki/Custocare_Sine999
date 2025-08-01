"use client"

import * as React from "react"
import { Store, Plus, Edit, Trash2, Save, ShoppingCart, Smartphone, Globe } from "lucide-react"
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

// Sample sales channels data
const initialChannels = [
  {
    id: "1",
    name: "ขายหน้าร้าน",
    type: "pos",
    description: "ขายสินค้าหน้าร้านผ่านระบบ POS",
    isActive: true,
    isDefault: true,
    settings: {
      allowDiscount: true,
      requireCustomer: false,
      printReceipt: true,
    },
  },
  {
    id: "2",
    name: "เว็บไซต์",
    type: "website",
    description: "ขายสินค้าผ่านเว็บไซต์ออนไลน์",
    isActive: true,
    isDefault: false,
    settings: {
      allowDiscount: false,
      requireCustomer: true,
      printReceipt: false,
    },
  },
  {
    id: "3",
    name: "แอปพลิเคชัน",
    type: "mobile",
    description: "ขายสินค้าผ่านแอปพลิเคชันมือถือ",
    isActive: false,
    isDefault: false,
    settings: {
      allowDiscount: true,
      requireCustomer: true,
      printReceipt: false,
    },
  },
  {
    id: "4",
    name: "LINE Official",
    type: "line",
    description: "ขายสินค้าผ่าน LINE Official Account",
    isActive: true,
    isDefault: false,
    settings: {
      allowDiscount: false,
      requireCustomer: true,
      printReceipt: false,
    },
  },
]

const channelTypes = {
  pos: { label: "POS", icon: ShoppingCart, variant: "default" as const },
  website: { label: "เว็บไซต์", icon: Globe, variant: "secondary" as const },
  mobile: { label: "แอปมือถือ", icon: Smartphone, variant: "outline" as const },
  line: { label: "LINE", icon: Store, variant: "destructive" as const },
}

export function SalesChannelsTab() {
  const [channels, setChannels] = React.useState(initialChannels)
  const [isAddChannelOpen, setIsAddChannelOpen] = React.useState(false)
  const [editingChannel, setEditingChannel] = React.useState<any>(null)

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    description: "",
    isActive: true,
    isDefault: false,
    settings: {
      allowDiscount: false,
      requireCustomer: false,
      printReceipt: false,
    },
  })

  const handleAddChannel = () => {
    setFormData({
      name: "",
      type: "",
      description: "",
      isActive: true,
      isDefault: false,
      settings: {
        allowDiscount: false,
        requireCustomer: false,
        printReceipt: false,
      },
    })
    setEditingChannel(null)
    setIsAddChannelOpen(true)
  }

  const handleEditChannel = (channel: any) => {
    setFormData({
      name: channel.name,
      type: channel.type,
      description: channel.description,
      isActive: channel.isActive,
      isDefault: channel.isDefault,
      settings: channel.settings,
    })
    setEditingChannel(channel)
    setIsAddChannelOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingChannel) {
      // Update existing channel
      setChannels(channels.map((channel) => (channel.id === editingChannel.id ? { ...channel, ...formData } : channel)))
    } else {
      // Add new channel
      const newChannel = {
        id: String(channels.length + 1),
        ...formData,
      }
      setChannels([...channels, newChannel])
    }
    setIsAddChannelOpen(false)
  }

  const handleDeleteChannel = (channelId: string) => {
    setChannels(channels.filter((channel) => channel.id !== channelId))
  }

  const handleToggleActive = (channelId: string, isActive: boolean) => {
    setChannels(channels.map((channel) => (channel.id === channelId ? { ...channel, isActive } : channel)))
  }

  const handleSetDefault = (channelId: string) => {
    setChannels(
      channels.map((channel) => ({
        ...channel,
        isDefault: channel.id === channelId,
      })),
    )
  }

  const handleSave = () => {
    // Save sales channels settings logic here
    console.log("Saving sales channels settings:", channels)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ตั้งค่าช่องทางการขาย</h2>
          <p className="text-muted-foreground">จัดการช่องทางการขายและการตั้งค่า</p>
        </div>
        <Button onClick={handleAddChannel}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มช่องทางการขาย
        </Button>
      </div>

      {/* Sales Channels Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            ช่องทางการขายทั้งหมด
          </CardTitle>
          <CardDescription>จัดการช่องทางการขายและการตั้งค่าต่างๆ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อช่องทาง</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ค่าเริ่มต้น</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channels.map((channel) => {
                  const ChannelIcon = channelTypes[channel.type as keyof typeof channelTypes].icon
                  return (
                    <TableRow key={channel.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <ChannelIcon className="h-4 w-4" />
                          {channel.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={channelTypes[channel.type as keyof typeof channelTypes].variant}>
                          {channelTypes[channel.type as keyof typeof channelTypes].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={channel.description}>
                        {channel.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={channel.isActive}
                            onCheckedChange={(checked) => handleToggleActive(channel.id, checked)}
                          />
                          <span className={channel.isActive ? "text-green-600" : "text-red-600"}>
                            {channel.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {channel.isDefault ? (
                          <Badge>ค่าเริ่มต้น</Badge>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefault(channel.id)}>
                            ตั้งเป็นค่าเริ่มต้น
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditChannel(channel)}>
                            <Edit className="h-4 w-4 mr-1" />
                            แก้ไข
                          </Button>
                          {!channel.isDefault && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  ลบ
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>ยืนยันการลบช่องทางการขาย</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    คุณแน่ใจหรือไม่ที่จะลบช่องทางการขาย "{channel.name}" การดำเนินการนี้ไม่สามารถย้อนกลับได้
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteChannel(channel.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    ลบช่องทาง
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Channel Dialog */}
      <Dialog open={isAddChannelOpen} onOpenChange={setIsAddChannelOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingChannel ? "แก้ไขช่องทางการขาย" : "เพิ่มช่องทางการขายใหม่"}</DialogTitle>
            <DialogDescription>{editingChannel ? "แก้ไขข้อมูลช่องทางการขาย" : "เพิ่มช่องทางการขายใหม่"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="channel-name">ชื่อช่องทาง *</Label>
              <Input
                id="channel-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="กรอกชื่อช่องทางการขาย"
                required
              />
            </div>
            <div>
              <Label htmlFor="channel-type">ประเภท *</Label>
              <select
                id="channel-type"
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">เลือกประเภท</option>
                <option value="pos">POS (ขายหน้าร้าน)</option>
                <option value="website">เว็บไซต์</option>
                <option value="mobile">แอปมือถือ</option>
                <option value="line">LINE Official</option>
              </select>
            </div>
            <div>
              <Label htmlFor="channel-description">รายละเอียด</Label>
              <Textarea
                id="channel-description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="รายละเอียดช่องทางการขาย"
                rows={3}
              />
            </div>
    
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="channel-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="channel-active">เปิดใช้งาน</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="channel-default"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked }))}
                />
                <Label htmlFor="channel-default">ตั้งเป็นค่าเริ่มต้น</Label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingChannel ? "บันทึกการแก้ไข" : "เพิ่มช่องทางการขาย"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddChannelOpen(false)}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    
    </div>
  )
}
