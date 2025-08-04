"use client"

import * as React from "react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Plus, Edit, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// Sample user data
const initialUsers = [
  {
    id: "1",
    username: "admin",
    fullName: "ผู้ดูแลระบบ",
    email: "admin@seafood.com",
    role: "Owner",
    isActive: true,
    lastLogin: "2024-01-15T10:30:00",
    permissions: ["all"],
  },
  {
    id: "2",
    username: "cashier1",
    fullName: "นางสาวสมใจ ขายดี",
    email: "cashier1@seafood.com",
    role: "Cashier",
    isActive: true,
    lastLogin: "2024-01-15T09:15:00",
    permissions: ["pos", "orders", "customers"],
  },
  {
    id: "3",
    username: "delivery1",
    fullName: "นายสมศักดิ์ ส่งของ",
    email: "delivery1@seafood.com",
    role: "Delivery",
    isActive: true,
    lastLogin: "2024-01-15T08:45:00",
    permissions: ["delivery", "orders_view"],
  },
  {
    id: "4",
    username: "manager1",
    fullName: "นายประยุทธ์ จัดการ",
    email: "manager1@seafood.com",
    role: "Admin",
    isActive: false,
    lastLogin: "2024-01-10T16:20:00",
    permissions: ["orders", "customers", "products", "reports"],
  },
]

const roleMap = {
  Owner: { label: "เจ้าของ", variant: "default" as const, color: "bg-purple-100 text-purple-800" },
  Admin: { label: "ผู้ดูแล", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
  Cashier: { label: "แคชเชียร์", variant: "outline" as const, color: "bg-green-100 text-green-800" },
  Delivery: { label: "คนส่งของ", variant: "outline" as const, color: "bg-orange-100 text-orange-800" },
}

const permissions = [
  { id: "pos", label: "ขายหน้าร้าน (POS)", description: "เข้าถึงระบบขายหน้าร้าน" },
  { id: "orders", label: "จัดการคำสั่งซื้อ", description: "สร้าง แก้ไข และดูคำสั่งซื้อ" },
  { id: "orders_view", label: "ดูคำสั่งซื้อ", description: "ดูคำสั่งซื้อเท่านั้น" },
  { id: "customers", label: "จัดการลูกค้า", description: "เพิ่ม แก้ไข และดูข้อมูลลูกค้า" },
  { id: "products", label: "จัดการสินค้า", description: "เพิ่ม แก้ไข และดูข้อมูลสินค้า" },
  { id: "delivery", label: "จัดการการจัดส่ง", description: "จัดการและติดตามการจัดส่ง" },
  { id: "reports", label: "ดูรายงาน", description: "เข้าถึงรายงานและสถิติ" },
  { id: "settings", label: "ตั้งค่าระบบ", description: "จัดการการตั้งค่าระบบ" },
]

export function UserManagementTab() {
  const [users, setUsers] = React.useState(initialUsers)
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<any>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  // Form state
  const [formData, setFormData] = React.useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
    permissions: [] as string[],
  })

  const handleAddUser = () => {
    setFormData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      role: "",
      isActive: true,
      permissions: [],
    })
    setEditingUser(null)
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user: any) => {
    setFormData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
      isActive: user.isActive,
      permissions: user.permissions,
    })
    setEditingUser(user)
    setIsAddUserOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) => (user.id === editingUser.id ? { ...user, ...formData, lastLogin: user.lastLogin } : user)),
      )
    } else {
      // Add new user
      const newUser = {
        id: String(users.length + 1),
        ...formData,
        lastLogin: new Date().toISOString(),
      }
      setUsers([...users, newUser])
    }
    setIsAddUserOpen(false)
  }

  const handleToggleActive = (userId: string, isActive: boolean) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isActive } : user)))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permissionId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((p) => p !== permissionId),
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">จัดการผู้ใช้</h2>
          <p className="text-muted-foreground">จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มผู้ใช้ใหม่
        </Button>
      </div>

      {/* Users Table */}
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <CardTitle>รายชื่อผู้ใช้</CardTitle>
          <CardDescription>ผู้ใช้ทั้งหมด {users.length} คน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อผู้ใช้</TableHead>
                  <TableHead>ชื่อจริง</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>บทบาท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>เข้าสู่ระบบล่าสุด</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={roleMap[user.role as keyof typeof roleMap].color}>
                        {roleMap[user.role as keyof typeof roleMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={(checked) => handleToggleActive(user.id, checked)}
                          disabled={user.role === "Owner"}
                        />
                        <span className={user.isActive ? "text-green-600" : "text-red-600"}>
                          {user.isActive ? "ใช้งาน" : "ปิดใช้งาน"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(user.lastLogin), "dd/MM/yyyy HH:mm", { locale: th })}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4 mr-1" />
                        แก้ไข
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? "แก้ไขข้อมูลผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}</DialogTitle>
            <DialogDescription>{editingUser ? "แก้ไขข้อมูลและสิทธิ์ของผู้ใช้" : "กรอกข้อมูลผู้ใช้ใหม่และกำหนดสิทธิ์"}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="username">ชื่อผู้ใช้<span className="text-red-500">*</span></Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fullName">ชื่อจริง <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="กรอกชื่อจริง"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">อีเมล <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="กรอกอีเมล"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">รหัสผ่าน <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="กรอกรหัสผ่าน"
                  required={!editingUser}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingUser ? "บันทึกการแก้ไข" : "เพิ่มผู้ใช้"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
