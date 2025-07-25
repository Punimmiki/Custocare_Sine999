"use client"

import * as React from "react"
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample product data
const products = [
  {
    id: "1",
    name: "แซลมอนสด",
    price: 450,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Salmon",
    stock: 25,
  },
  {
    id: "2",
    name: "กุ้งขาวใหญ่",
    price: 320,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    image: "/placeholder.svg?height=120&width=120&text=Shrimp",
    stock: 15,
  },
  {
    id: "3",
    name: "ปลาทูน่าสด",
    price: 380,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Tuna",
    stock: 12,
  },
  {
    id: "4",
    name: "หอยแมลงภู่",
    price: 180,
    unit: "กิโลกรัม",
    category: "หอย",
    image: "/placeholder.svg?height=120&width=120&text=Mussel",
    stock: 30,
  },
  {
    id: "5",
    name: "ปูม้าสด",
    price: 250,
    unit: "ตัว",
    category: "ปู",
    image: "/placeholder.svg?height=120&width=120&text=Crab",
    stock: 8,
  },
  {
    id: "6",
    name: "ปลาหมึกสด",
    price: 220,
    unit: "กิโลกรัม",
    category: "ปลาหมึก",
    image: "/placeholder.svg?height=120&width=120&text=Squid",
    stock: 20,
  },
  {
    id: "7",
    name: "หอยเชลล์",
    price: 420,
    unit: "กิโลกรัม",
    category: "หอย",
    image: "/placeholder.svg?height=120&width=120&text=Scallop",
    stock: 5,
  },
  {
    id: "8",
    name: "กุ้งมังกร",
    price: 850,
    unit: "ตัว",
    category: "กุ้ง",
    image: "/placeholder.svg?height=120&width=120&text=Lobster",
    stock: 3,
  },
  {
    id: "9",
    name: "ปลาเก๋า",
    price: 320,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Grouper",
    stock: 18,
  },
  {
    id: "10",
    name: "หอยนางรม",
    price: 280,
    unit: "โหล",
    category: "หอย",
    image: "/placeholder.svg?height=120&width=120&text=Oyster",
    stock: 12,
  },
  {
    id: "11",
    name: "ปลาช่อน",
    price: 150,
    unit: "กิโลกรัม",
    category: "ปลา",
    image: "/placeholder.svg?height=120&width=120&text=Snakehead",
    stock: 22,
  },
  {
    id: "12",
    name: "กุ้งแชบ๊วย",
    price: 280,
    unit: "กิโลกรัม",
    category: "กุ้ง",
    image: "/placeholder.svg?height=120&width=120&text=Tiger Prawn",
    stock: 14,
  },
]

const categories = ["ทั้งหมด", "ปลา", "กุ้ง", "หอย", "ปู", "ปลาหมึก"]

interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  total: number
}

const POSPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("ทั้งหมด")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = React.useState("cash")
  const [customerNotes, setCustomerNotes] = React.useState("")
  const [discount, setDiscount] = React.useState(0)

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory
    return matchesSearch && matchesCategory && product.stock > 0
  })

  // Add product to cart
  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item,
        ),
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          quantity: 1,
          total: product.price,
        },
      ])
    }
  }

  // Update quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item,
        ),
      )
    }
  }

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    setCustomerNotes("")
    setDiscount(0)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  // Handle sale confirmation
  const handleConfirmSale = () => {
    if (cartItems.length === 0) return

    // Process sale logic here
    console.log("Processing sale:", {
      items: cartItems,
      subtotal,
      discount,
      total,
      paymentMethod,
      customerNotes,
    })

    // Clear cart after successful sale
    clearCart()

    // Show success message or redirect
    alert("ขายสำเร็จ!")
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Left Panel - Product Selection */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">ขายหน้าร้าน (POS)</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-3">
                  <div className="aspect-square mb-2 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=120&width=120"
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">฿{product.price}</p>
                      <p className="text-xs text-muted-foreground">/{product.unit}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.stock} {product.unit}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Shopping Cart */}
      <div className="w-96 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              ตรวจสอบรายการ ({cartItems.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Cart Items */}
            <ScrollArea className="flex-1 px-4">
              {cartItems.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  <div className="text-center">
                    <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>ไม่มีสินค้าในตะกร้า</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          ฿{item.price} / {item.unit}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-sm">฿{item.total.toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>ยอดรวม:</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>

                  {/* Discount Input */}
                  <div className="flex items-center gap-2">
                    <Label htmlFor="discount" className="text-sm">
                      ส่วนลด (%):
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                      className="h-8 w-16 text-center"
                    />
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>ส่วนลด ({discount}%):</span>
                      <span>-฿{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>ยอดสุทธิ:</span>
                    <span className="text-blue-600">฿{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">วิธีการชำระเงิน:</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                        <Banknote className="h-4 w-4" />
                        เงินสด
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        โอนเงิน
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Customer Notes */}
                <div className="mb-4">
                  <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                    หมายเหตุ (ถ้ามี):
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="หมายเหตุสำหรับลูกค้า..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={handleConfirmSale}
                    className="w-full h-12 text-lg font-bold"
                    disabled={cartItems.length === 0}
                  >
                    ยืนยันการขาย
                  </Button>

                  {cartItems.length > 0 && (
                    <Button variant="outline" onClick={clearCart} className="w-full bg-transparent">
                      ล้างตะกร้า
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { POSPage }
export default POSPage
