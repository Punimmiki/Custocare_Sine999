"use client"

import * as React from "react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog" // เพิ่ม DialogFooter

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

export function UserManagementTab() {
  const [users, setUsers] = React.useState(initialUsers)
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<any>(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = React.useState(false) // State สำหรับ Pop-up แจ้งเตือนความสำเร็จ
  const [successMessage, setSuccessMessage] = React.useState("") // State สำหรับข้อความแจ้งเตือน

  // Form state
  const [formData, setFormData] = React.useState({
    username: "",
    fullName: "",
    password: "",
    role: "", // Role will be set internally, not by user input
  })

  const handleAddUser = () => {
    setFormData({
      username: "",
      fullName: "",
      password: "",
      role: "Owner", // Default role for new users as per example
    })
    setEditingUser(null)
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user: any) => {
    setFormData({
      username: user.username,
      fullName: user.fullName,
      password: "", // Password is not pre-filled for security
      role: user.role, // Display existing role
    })
    setEditingUser(user)
    setIsAddUserOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsConfirmDialogOpen(true) // Open confirmation dialog
  }

  const handleConfirmSubmit = () => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
              ...user,
              username: formData.username,
              fullName: formData.fullName,
              // Password is not updated if the field is disabled (greyed out)
              // Only update password if it's provided (i.e., for new users or if user explicitly types)
              ...(formData.password && { password: formData.password }),
            }
            : user,
        ),
      )
      setSuccessMessage(`ข้อมูลผู้ใช้ ${formData.username} ได้รับการบันทึกแล้ว`) // ตั้งค่าข้อความ
    } else {
      // Add new user
      const newUser = {
        id: String(users.length + 1),
        username: formData.username,
        fullName: formData.fullName,
        email: "", // Email is not collected in this simplified form
        password: formData.password,
        role: "Owner", // Hardcode role to Owner for new users
        isActive: true,
        lastLogin: new Date().toISOString(),
        permissions: ["all"], // Default permissions for Owner role
      }
      setUsers([...users, newUser])
      setSuccessMessage(`ผู้ใช้ ${formData.username} ได้รับการเพิ่มในระบบแล้ว`) // ตั้งค่าข้อความ
    }
    setIsConfirmDialogOpen(false) // Close confirmation dialog
    setIsAddUserOpen(false) // Close add/edit dialog
    setIsSuccessDialogOpen(true) // Open success dialog
  }

  const handleToggleActive = (userId: string, isActive: boolean) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isActive } : user)))
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
                <Label htmlFor="username">
                  ชื่อผู้ใช้<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fullName">
                  ชื่อจริง <span className="text-red-500">*</span>
                </Label>
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
              <Label htmlFor="password">
                รหัสผ่าน <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder={editingUser ? "ไม่สามารถแก้ไขรหัสผ่านได้" : "กรอกรหัสผ่าน"}
                  required={!editingUser} // Password is required only for new users
                  disabled={!!editingUser} // Disable when editing
                  className={!!editingUser ? "bg-muted cursor-not-allowed" : ""} // Add styling for disabled state
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
            {/* Read-only Role Display */}
            <div>
              <Label htmlFor="role">สิทธิ์การเข้าระบบ</Label>
              <Input
                id="role"
                value={roleMap[formData.role as keyof typeof roleMap]?.label || formData.role}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
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

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "ยืนยันการแก้ไขข้อมูลผู้ใช้" : "ยืนยันการเพิ่มผู้ใช้ใหม่"}</DialogTitle>
            <DialogDescription>คุณแน่ใจหรือไม่ที่จะดำเนินการนี้?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {" "}
            {/* ใช้ DialogFooter เพื่อจัดปุ่ม */}
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleConfirmSubmit}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ดำเนินการสำเร็จ!</DialogTitle>
            <DialogDescription>{successMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>
              ตกลง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
