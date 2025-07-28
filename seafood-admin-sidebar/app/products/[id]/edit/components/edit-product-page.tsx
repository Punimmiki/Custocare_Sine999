"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Package, Upload, X, Star, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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

interface EditProductPageProps {
  productId: string
}

const categories = ["ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]
const units = ["กิโลกรัม", "ตัว", "โหล", "กล่อง", "ถุง"]

interface ProductImage {
  id: string
  url: string
  file?: File
  isCover: boolean
}

// Sample product data for editing
const sampleProduct = {
  id: "1",
  name: "แซลมอนสด",
  price: 450,
  unit: "กิโลกรัม",
  category: "ปลา",
  stock: 25,
  description: "แซลมอนสดนำเข้าจากนอร์เวย์ คุณภาพพรีเมียม",
  showOnWebsite: true,
  categoryShowOnWebsite: true,
  images: [
    {
      id: "1",
      url: "/placeholder.svg?height=200&width=200&text=แซลมอน1",
      isCover: true,
    },
    {
      id: "2",
      url: "/placeholder.svg?height=200&width=200&text=แซลมอน2",
      isCover: false,
    },
    {
      id: "3",
      url: "/placeholder.svg?height=200&width=200&text=แซลมอน3",
      isCover: false,
    },
  ] as ProductImage[],
}

const EditProductPage = ({ productId }: EditProductPageProps) => {
  const [productName, setProductName] = React.useState(sampleProduct.name)
  const [productPrice, setProductPrice] = React.useState(sampleProduct.price.toString())
  const [productUnit, setProductUnit] = React.useState(sampleProduct.unit)
  const [productCategory, setProductCategory] = React.useState(sampleProduct.category)
  const [productStock, setProductStock] = React.useState(sampleProduct.stock.toString())
  const [productDescription, setProductDescription] = React.useState(sampleProduct.description)
  const [productImages, setProductImages] = React.useState<ProductImage[]>(sampleProduct.images)
  const [showOnWebsite, setShowOnWebsite] = React.useState(sampleProduct.showOnWebsite)
  const [categoryShowOnWebsite, setCategoryShowOnWebsite] = React.useState(sampleProduct.categoryShowOnWebsite)

  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = React.useState(false)

  // Load product data based on productId (in real app, this would be an API call)
  React.useEffect(() => {
    // TODO: Fetch product data by productId
    console.log("Loading product data for ID:", productId)
  }, [productId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (productImages.length < 5) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: ProductImage = {
            id: Date.now().toString() + Math.random().toString(),
            url: e.target?.result as string,
            file: file,
            isCover: productImages.length === 0, // First image is cover by default
          }
          setProductImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })

    // Reset input
    e.target.value = ""
  }

  const removeImage = (imageId: string) => {
    setProductImages((prev) => {
      const filtered = prev.filter((img) => img.id !== imageId)
      // If removed image was cover, make first image the new cover
      if (filtered.length > 0 && !filtered.some((img) => img.isCover)) {
        filtered[0].isCover = true
      }
      return filtered
    })
  }

  const setCoverImage = (imageId: string) => {
    setProductImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === imageId,
      })),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitDialogOpen(true)
  }

  const confirmSubmit = () => {
    console.log({
      productId,
      productName,
      productPrice: Number.parseFloat(productPrice),
      productUnit,
      productCategory,
      productStock: Number.parseInt(productStock),
      productDescription,
      productImages,
      showOnWebsite,
      categoryShowOnWebsite,
    })
    setIsSubmitDialogOpen(false)
    // TODO: Add success toast and redirect
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
        <div className="flex-1">
          <h1 className="text-3xl font-bold">แก้ไขสินค้า</h1>
          <p className="text-muted-foreground">
            แก้ไขข้อมูลสินค้า: {productName} (ID: {productId})
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/categories/manage">
            <Settings className="h-4 w-4 mr-2" />
            จัดการหมวดหมู่
          </Link>
        </Button>
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

            {/* Display Settings */}
            <Card>
              <CardHeader>
                <CardTitle>การแสดงผล</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>แสดงสินค้าบนเว็บไซต์</Label>
                    <p className="text-sm text-muted-foreground">เปิดใช้งานเพื่อให้ลูกค้าเห็นสินค้านี้บนเว็บไซต์</p>
                  </div>
                  <Switch checked={showOnWebsite} onCheckedChange={setShowOnWebsite} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>แสดงหมวดหมู่บนเว็บไซต์</Label>
                    <p className="text-sm text-muted-foreground">เปิดใช้งานเพื่อให้หมวดหมู่นี้แสดงบนเว็บไซต์</p>
                  </div>
                  <Switch checked={categoryShowOnWebsite} onCheckedChange={setCategoryShowOnWebsite} />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button type="submit" className="flex-1">
                    บันทึกการแก้ไข
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการแก้ไขสินค้า</AlertDialogTitle>
                    <AlertDialogDescription>
                      คุณแน่ใจหรือไม่ที่จะบันทึกการแก้ไขสินค้า "{productName}" (ID: {productId})?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmSubmit} className="bg-blue-600 hover:bg-blue-700">
                      ยืนยันการแก้ไข
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="button" variant="outline" asChild>
                <Link href="/products">ยกเลิก</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Product Images */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>รูปภาพสินค้า</CardTitle>
              <p className="text-sm text-muted-foreground">อัพโหลดได้สูงสุด 5 รูป คลิกดาวเพื่อเลือกรูปหน้าปก</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Grid */}
              {productImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {productImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-full h-24 object-cover rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=200&width=200"
                        }}
                      />

                      {/* Cover Badge */}
                      {image.isCover && <Badge className="absolute top-1 left-1 text-xs">หน้าปก</Badge>}

                      {/* Action Buttons */}
                      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setCoverImage(image.id)}
                          title="ตั้งเป็นรูปหน้าปก"
                        >
                          <Star className={`h-3 w-3 ${image.isCover ? "fill-yellow-400 text-yellow-400" : ""}`} />
                        </Button>
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
              {productImages.length < 5 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-600">อัพโหลดรูปภาพสินค้า ({productImages.length}/5)</p>
                      <p className="text-xs text-gray-400">PNG, JPG ขนาดไม่เกิน 5MB</p>
                    </div>
                  </div>
                </div>
              )}

              {/* File Input */}
              {productImages.length < 5 && (
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
              {productImages.length > 0 && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• คลิกดาว ⭐ เพื่อเลือกรูปหน้าปก</p>
                  <p>• รูปหน้าปกจะแสดงใน POS และเว็บไซต์</p>
                  <p>• คลิก X เพื่อลบรูปภาพ</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { EditProductPage }
export default EditProductPage
