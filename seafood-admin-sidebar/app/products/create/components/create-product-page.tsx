"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Package, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const categories = ["ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]
const units = ["กิโลกรัม", "ตัว", "โหล", "กล่อง", "ถุง"]

const CreateProductPage = () => {
  const [productName, setProductName] = React.useState("")
  const [productPrice, setProductPrice] = React.useState("")
  const [productUnit, setProductUnit] = React.useState("")
  const [productCategory, setProductCategory] = React.useState("")
  const [productStock, setProductStock] = React.useState("")
  const [productDescription, setProductDescription] = React.useState("")
  const [productImage, setProductImage] = React.useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProductImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({
      productName,
      productPrice: Number.parseFloat(productPrice),
      productUnit,
      productCategory,
      productStock: Number.parseInt(productStock),
      productDescription,
      productImage,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">เพิ่มสินค้าใหม่</h1>
          <p className="text-muted-foreground">เพิ่มสินค้าใหม่เข้าสู่ระบบ</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  ข้อมูลสินค้า
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-name">ชื่อสินค้า *</Label>
                  <Input
                    id="product-name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="กรอกชื่อสินค้า"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="product-price">ราคา (บาท) *</Label>
                    <Input
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-unit">หน่วย *</Label>
                    <Select value={productUnit} onValueChange={setProductUnit} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหน่วย" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="product-category">หมวดหมู่ *</Label>
                    <Select value={productCategory} onValueChange={setProductCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="product-stock">จำนวนคงเหลือ *</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      min="0"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="product-description">รายละเอียดสินค้า</Label>
                  <Textarea
                    id="product-description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="กรอกรายละเอียดสินค้า (ถ้ามี)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                เพิ่มสินค้า
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/products">ยกเลิก</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Product Image */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>รูปภาพสินค้า</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {productImage ? (
                  <div className="relative">
                    <img
                      src={productImage || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => setProductImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-600">อัพโหลดรูปภาพสินค้า</p>
                      <p className="text-xs text-gray-400">PNG, JPG ขนาดไม่เกิน 5MB</p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { CreateProductPage }
export default CreateProductPage
