"use client"

import * as React from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

interface Category {
  id: string
  name: string
  showOnWebsite: boolean
  productCount: number
}

const ManageCategoriesPage = () => {
  const [categories, setCategories] = React.useState<Category[]>([
    { id: "1", name: "ปลา", showOnWebsite: true, productCount: 15 },
    { id: "2", name: "กุ้ง", showOnWebsite: true, productCount: 8 },
    { id: "3", name: "หอย", showOnWebsite: false, productCount: 5 },
    { id: "4", name: "ปู", showOnWebsite: true, productCount: 3 },
    { id: "5", name: "ปลาหมึก", showOnWebsite: true, productCount: 7 },
  ])

  const [newCategoryName, setNewCategoryName] = React.useState("")
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null)
  const [editCategoryName, setEditCategoryName] = React.useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        showOnWebsite: true,
        productCount: 0,
      }
      setCategories((prev) => [...prev, newCategory])
      setNewCategoryName("")
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCategory = () => {
    if (editingCategory && editCategoryName.trim()) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? { ...cat, name: editCategoryName.trim() } : cat)),
      )
      setEditingCategory(null)
      setEditCategoryName("")
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }

  const toggleWebsiteVisibility = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, showOnWebsite: !cat.showOnWebsite } : cat)),
    )
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setEditCategoryName(category.name)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">จัดการหมวดหมู่</h2>
          <p className="text-muted-foreground">เพิ่ม แก้ไข และจัดการหมวดหมู่สินค้า</p>
        </div>

        {/* Add Category Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มหมวดหมู่
            </Button>
          </DialogTrigger>
          <DialogContent className="border-0 rounded-3xl shadow-2xl">
            <DialogHeader>
              <DialogTitle>เพิ่มหมวดหมู่ใหม่</DialogTitle>
              <DialogDescription>กรอกชื่อหมวดหมู่ใหม่ที่ต้องการเพิ่ม</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-category-name">ชื่อหมวดหมู่</Label>
                <Input
                  id="new-category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="กรอกชื่อหมวดหมู่"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddCategory()
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
                เพิ่มหมวดหมู่
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Package className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.productCount} สินค้า</p>
                  </div>
                </div>
                <Badge
                  variant={category.showOnWebsite ? "default" : "secondary"}
                  className={`flex items-center gap-1 ${
                    category.showOnWebsite
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {category.showOnWebsite ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {category.showOnWebsite ? "แสดงบนเว็บ" : "ซ่อนจากเว็บ"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`website-${category.id}`} className="text-sm">
                    แสดงบนเว็บ
                  </Label>
                  <Switch
                    id={`website-${category.id}`}
                    checked={category.showOnWebsite}
                    onCheckedChange={() => toggleWebsiteVisibility(category.id)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(category)}
                    className="h-8 px-2 border-0 shadow-sm rounded-xl hover:shadow-md bg-transparent"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>

                  {/* Delete Button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={category.productCount > 0}
                        className="h-8 px-2 border-0 shadow-sm rounded-xl hover:shadow-md bg-transparent disabled:opacity-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-0 rounded-3xl shadow-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>ยืนยันการลบหมวดหมู่</AlertDialogTitle>
                        <AlertDialogDescription>
                          คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่ "{category.name}"? การดำเนินการนี้ไม่สามารถย้อนกลับได้
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          ลบหมวดหมู่
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {category.productCount > 0 && (
                <p className="text-xs text-amber-600 mt-2">⚠️ ไม่สามารถลบได้เนื่องจากมีสินค้าในหมวดหมู่นี้</p>
              )}
            </CardContent>
          </Card>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full">
            <Card className="border-0 shadow-sm rounded-2xl bg-white">
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">ยังไม่มีหมวดหมู่</p>
                <p className="text-sm text-muted-foreground">คลิกปุ่ม "เพิ่มหมวดหมู่" เพื่อเริ่มต้น</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="border-0 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle>แก้ไขหมวดหมู่</DialogTitle>
            <DialogDescription>แก้ไขชื่อหมวดหมู่ "{editingCategory?.name}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category-name">ชื่อหมวดหมู่</Label>
              <Input
                id="edit-category-name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                placeholder="กรอกชื่อหมวดหมู่"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditCategory()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleEditCategory} disabled={!editCategoryName.trim()}>
              บันทึกการแก้ไข
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { ManageCategoriesPage }
export default ManageCategoriesPage
