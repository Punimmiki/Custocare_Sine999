"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Minus,
  CreditCard,
  Printer,
  Save,
  X,
  QrCode,
  Fish,
  Waves,
  Shell,
  Wallet,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

// Products data
const products = [
  {
    id: "1",
    name: "แซลมอนสดนอร์เวย์",
    price: 450,
    originalPrice: 500,
    unit: "กิโลกรัม",
    category: "fish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Salmon",
    stock: 25,
    sold: 13,
    hasQuantityControl: false,
  },
  {
    id: "2",
    name: "กุ้งขาวใหญ่สด",
    price: 320,
    originalPrice: 350,
    unit: "กิโลกรัม",
    category: "shrimp",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Shrimp",
    stock: 15,
    sold: 8,
    hasQuantityControl: false,
  },
  {
    id: "3",
    name: "ปลาทูน่าสดแท้",
    price: 380,
    originalPrice: 420,
    unit: "กิโลกรัม",
    category: "fish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Tuna",
    stock: 12,
    sold: 5,
    hasQuantityControl: false,
  },
  {
    id: "4",
    name: "หอยแมลงภู่นิวซีแลนด์",
    price: 180,
    originalPrice: 200,
    unit: "กิโลกรัม",
    category: "shellfish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Mussels",
    stock: 30,
    sold: 15,
    hasQuantityControl: false,
  },
  {
    id: "5",
    name: "ปูม้าสดจากทะเล",
    price: 250,
    originalPrice: 280,
    unit: "ตัว",
    category: "crab",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Crab",
    stock: 8,
    sold: 3,
    hasQuantityControl: false,
  },
  {
    id: "6",
    name: "ปลาหมึกสดใหญ่",
    price: 220,
    originalPrice: 250,
    unit: "กิโลกรัม",
    category: "squid",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Squid",
    stock: 20,
    sold: 12,
    hasQuantityControl: false,
  },
  {
    id: "7",
    name: "หอยเชลล์สดใหญ่",
    price: 160,
    originalPrice: 180,
    unit: "กิโลกรัม",
    category: "shellfish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Scallops",
    stock: 18,
    sold: 7,
    hasQuantityControl: false,
  },
  {
    id: "8",
    name: "กุ้งมังกรออสเตรเลีย",
    price: 680,
    originalPrice: 750,
    unit: "กิโลกรัม",
    category: "shrimp",
    image: "/placeholder.svg?height=200&width=300&text=Lobster",
    stock: 5,
    sold: 2,
    hasQuantityControl: false,
  },
  {
    id: "9",
    name: "ปลาเก๋าสดใหญ่",
    price: 280,
    originalPrice: 320,
    unit: "กิโลกรัม",
    category: "fish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Grouper",
    stock: 10,
    sold: 4,
    hasQuantityControl: false,
  },
  {
    id: "10",
    name: "หอยนางรมสด",
    price: 200,
    originalPrice: 230,
    unit: "กิโลกรัม",
    category: "shellfish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Oyster",
    stock: 22,
    sold: 9,
    hasQuantityControl: false,
  },
  {
    id: "11",
    name: "ปลาช่อนสด",
    price: 150,
    originalPrice: 170,
    unit: "กิโลกรัม",
    category: "fish",
    image: "/placeholder.svg?height=200&width=300&text=Fresh+Snakehead",
    stock: 16,
    sold: 6,
    hasQuantityControl: false,
  },
  {
    id: "12",
    name: "กุ้งก้ามกราม",
    price: 380,
    originalPrice: 420,
    unit: "กิโลกรัม",
    category: "shrimp",
    image: "/placeholder.svg?height=200&width=300&text=Mantis+Shrimp",
    stock: 12,
    sold: 4,
    hasQuantityControl: false,
  },
]

// Seafood categories with sea creature icons
const categories = [
  {
    id: "all",
    name: "ทั้งหมด",
    subtitle: "235 รายการ",
    icon: Waves,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
  },
  {
    id: "fish",
    name: "ปลา",
    subtitle: "89 รายการ",
    icon: Fish,
    bgColor: "bg-white",
    textColor: "text-gray-700",
    iconColor: "text-blue-500",
  },
  {
    id: "shrimp",
    name: "กุ้ง",
    subtitle: "45 ราย��าร",
    icon: () => (
      <svg
        className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 mx-auto"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 12c0-1.5 1-3 2.5-3.5C6 8 8 8.5 10 9c2 .5 4 1 6 1s4-.5 6-1c1.5-.5 2.5-2 2.5-3.5" />
        <path d="M2 12c0 1.5 1 3 2.5 3.5C6 16 8 15.5 10 15c2-.5 4-1 6-1s4 .5 6 1c1.5.5 2.5 2 2.5 3.5" />
        <circle cx="4" cy="12" r="1" />
        <circle cx="20" cy="12" r="1" />
      </svg>
    ),
    bgColor: "bg-white",
    textColor: "text-gray-700",
    iconColor: "text-blue-500",
  },
  {
    id: "shellfish",
    name: "หอย",
    subtitle: "32 รายการ",
    icon: Shell,
    bgColor: "bg-white",
    textColor: "text-gray-700",
    iconColor: "text-blue-500",
  },
  {
    id: "crab",
    name: "ปู",
    subtitle: "28 รายการ",
    icon: () => (
      <svg
        className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 mx-auto"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="12" rx="6" ry="4" />
        <path d="M6 10l-2-2" />
        <path d="M18 10l2-2" />
        <path d="M6 14l-2 2" />
        <path d="M18 14l2 2" />
        <path d="M8 8l-1-3" />
        <path d="M16 8l1-3" />
        <path d="M8 16l-1 3" />
        <path d="M16 16l1 3" />
        <circle cx="10" cy="10" r="1" />
        <circle cx="14" cy="10" r="1" />
      </svg>
    ),
    bgColor: "bg-white",
    textColor: "text-gray-700",
    iconColor: "text-blue-500",
  },
  {
    id: "squid",
    name: "ปลาหมึก",
    subtitle: "41 รายการ",
    icon: () => (
      <svg
        className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 mx-auto"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="8" rx="4" ry="6" />
        <path d="M8 14v6" />
        <path d="M10 14v8" />
        <path d="M12 14v8" />
        <path d="M14 14v8" />
        <path d="M16 14v6" />
        <circle cx="10" cy="6" r="1" />
        <circle cx="14" cy="6" r="1" />
      </svg>
    ),
    bgColor: "bg-white",
    textColor: "text-gray-700",
    iconColor: "text-blue-500",
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
  image: string
  unit: string
}

interface SavedOrder {
  id: string
  items: CartItem[]
  timestamp: Date
  customerNotes: string
  paymentMethod: string
  discount: number
  discountType: "percent" | "amount"
}

interface SaleRecord {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  discountType: "percent" | "amount"
  total: number
  paymentMethod: string
  timestamp: Date
  customerNotes: string
}

export const POSPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = React.useState("cash")
  const [customerNotes, setCustomerNotes] = React.useState("")
  const [discount, setDiscount] = React.useState(0)
  const [discountType, setDiscountType] = React.useState<"percent" | "amount">("amount")
  const [savedOrders, setSavedOrders] = React.useState<SavedOrder[]>([])
  const [salesHistory, setSalesHistory] = React.useState<SaleRecord[]>([])
  const [showReceiptPreview, setShowReceiptPreview] = React.useState(false)
  const [showSavedOrders, setShowSavedOrders] = React.useState(false)
  const [showSalesHistory, setShowSalesHistory] = React.useState(false)
  const [showSaveOrderDialog, setShowSaveOrderDialog] = React.useState(false)
  const [productQuantities, setProductQuantities] = React.useState<{ [key: string]: number }>({})
  const [amountReceived, setAmountReceived] = React.useState(0) // New state for amount received
  const [changeAmount, setChangeAmount] = React.useState(0) // New state for change amount

  // Filter products based on search and category
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory && product.stock > 0
    })
    .sort((a, b) => a.name.localeCompare(b.name)) // Add this line for A-Z sorting

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
          quantity: 1,
          total: product.price,
          image: product.image,
          unit: product.unit,
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

  // Update product quantity in grid
  const updateProductQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setProductQuantities((prev) => {
        const newQuantities = { ...prev }
        delete newQuantities[productId]
        return newQuantities
      })
    } else {
      setProductQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }))
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
    setDiscountType("amount")
    setProductQuantities({})
    setAmountReceived(0) // Reset amount received
    setChangeAmount(0) // Reset change amount
  }

  // Save current order
  const saveOrder = () => {
    if (cartItems.length === 0) return

    const newSavedOrder: SavedOrder = {
      id: `ORDER-${Date.now()}`,
      items: [...cartItems],
      timestamp: new Date(),
      customerNotes,
      paymentMethod,
      discount,
      discountType,
    }

    setSavedOrders([...savedOrders, newSavedOrder])
    clearCart()
    setShowSaveOrderDialog(false)
  }

  // Load saved order
  const loadSavedOrder = (savedOrder: SavedOrder) => {
    setCartItems(savedOrder.items)
    setCustomerNotes(savedOrder.customerNotes)
    setPaymentMethod(savedOrder.paymentMethod)
    setDiscount(savedOrder.discount)
    setDiscountType(savedOrder.discountType)
    setShowSavedOrders(false)
  }

  // Delete saved order
  const deleteSavedOrder = (orderId: string) => {
    setSavedOrders(savedOrders.filter((order) => order.id !== orderId))
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = discountType === "percent" ? (subtotal * discount) / 100 : discount
  const total = subtotal - discountAmount

  // Handle sale confirmation
  const handleConfirmSale = () => {
    if (cartItems.length === 0) return
    // Removed the validation for amountReceived < total for cash payments
    // if (paymentMethod === "cash" && amountReceived < total) {
    //   alert("จำนวนเงินที่รับไม่เพียงพอ") // Or use a more sophisticated toast/dialog
    //   return
    // }

    const saleRecord: SaleRecord = {
      id: `SALE-${Date.now()}`,
      items: [...cartItems],
      subtotal,
      discount,
      discountType,
      total,
      paymentMethod,
      timestamp: new Date(),
      customerNotes,
    }

    setSalesHistory([saleRecord, ...salesHistory])
    setShowReceiptPreview(true)
  }

  // Handle print receipt
  const handlePrintReceipt = () => {
    console.log("Printing receipt...")
    clearCart()
    setShowReceiptPreview(false)
  }

  // Calculate change amount
  React.useEffect(() => {
    setChangeAmount(amountReceived - total)
  }, [amountReceived, total])

  return (
    <div className="bg-slate-50 min-h-full">
      {/* Header - แบ่งเป็น 2 column */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Search bar เต็มพื้นที่ (สำหรับฝั่งสินค้า) */}
          <div className="flex-1 p-3 md:p-4 lg:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="ค้นหาสินค้าทะเล..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-10 md:h-11 text-sm rounded-full border-slate-200 bg-slate-50 focus:bg-white transition-colors w-full"
              />
            </div>
          </div>

          {/* Right side - ปุ่มสำหรับฝั่ง cart */}
          <div className="w-full md:w-72 lg:w-80 xl:w-96 p-3 md:p-4 lg:p-6 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 md:h-11 px-3 rounded-full border-slate-200 hover:bg-slate-50 bg-white text-xs whitespace-nowrap"
              onClick={() => setShowSavedOrders(true)}
            >
              <Save className="w-4 h-4 mr-2" />
              รายการพักซื้อ {savedOrders.length > 0 && `(${savedOrders.length})`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 md:h-11 px-3 rounded-full border-slate-200 hover:bg-slate-50 bg-white text-xs whitespace-nowrap"
              onClick={() => setShowSalesHistory(true)}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              ประวัติขาย
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)]">
        {/* Left Panel - Products */}
        <div className="flex-1 p-3 md:p-4 lg:p-6">
          {/* Category Section */}
          <div className="mb-4 md:mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border-0 shadow-sm ${
                      selectedCategory === category.id ? "ring-2 ring-blue-200" : "hover:bg-slate-50"
                    } bg-white overflow-hidden`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-2 md:p-3 lg:p-4 text-center h-full flex flex-col justify-center">
                      <div className={`mb-1 md:mb-2 lg:mb-3 flex justify-center text-blue-500`}>
                        <IconComponent />
                      </div>
                      <h3 className={`font-semibold mb-1 text-xs md:text-sm text-slate-700 truncate`}>
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-500 hidden md:block truncate">{category.subtitle}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Product Grid */}
          <ScrollArea className="h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] lg:h-[calc(100vh-260px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 p-2 md:p-4 pt-4 md:pt-8 pb-4 md:pb-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl hover:scale-[1.02] hover:border-2 hover:border-blue-200 transition-all duration-300 border-2 border-transparent shadow-md bg-white rounded-2xl overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-32 md:h-40 lg:h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=192&width=320"
                      }}
                    />
                  </div>
                  <CardContent className="p-3 md:p-4 lg:p-6">
                    <h3 className="font-semibold text-sm md:text-base mb-2 md:mb-3 text-slate-800 leading-tight line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">
                      {product.name}
                    </h3>
                    <div className="flex flex-col mb-3 md:mb-4">
                      {" "}
                      {/* Changed to flex-col */}
                      <div className="flex items-baseline gap-1">
                        {" "}
                        {/* Group price and unit */}
                        <span className="text-base md:text-lg lg:text-xl font-bold text-slate-800">
                          ฿{product.price}
                        </span>
                        <span className="text-xs md:text-sm text-slate-500">/{product.unit}</span>
                      </div>
                      {product.originalPrice && (
                        <span className="text-xs md:text-sm text-slate-400 line-through">฿{product.originalPrice}</span>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#eff7ff] text-[#378afa] hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 rounded-2xl py-2 md:py-3 text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      เพิ่มลงตะกร้า
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Cart */}
        <div className="w-full lg:w-72 xl:w-80 2xl:w-96 bg-white shadow-lg border-t lg:border-t-0 lg:border-l border-slate-200 min-h-[50vh] lg:min-h-full flex-shrink-0">
          <div className="p-3 md:p-4 lg:p-6 h-full flex flex-col bg-white">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-semibold text-slate-800">ตะกร้าสินค้า</h2>
              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {cartItems.length} รายการ
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 mb-4 md:mb-6">
              <ScrollArea className="h-full max-h-[200px] md:max-h-[300px] lg:max-h-[400px] xl:max-h-[500px]">
                {cartItems.length === 0 ? (
                  <div className="flex items-center justify-center h-24 md:h-32 text-slate-500">
                    <div className="text-center">
                      <Fish className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs md:text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-xs md:text-sm text-slate-800 leading-tight mb-1 line-clamp-2">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-600 font-semibold text-xs md:text-sm">฿{item.price}</span>
                            <span className="text-xs text-slate-500">/{item.unit}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 md:gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-5 w-5 md:h-6 md:w-6 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-2 w-2 md:h-3 md:w-3" />
                              </Button>
                              <span className="w-4 md:w-6 text-center text-xs font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-5 w-5 md:h-6 md:w-6 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-2 w-2 md:h-3 md:w-3" />
                              </Button>
                            </div>
                            <span className="text-blue-600 font-semibold text-xs md:text-sm">
                              ฿{item.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 md:h-6 md:w-6 text-red-500 hover:bg-red-50 flex-shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-2 w-2 md:h-3 md:w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Summary */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 pt-3 md:pt-4 border-t border-slate-200">
              {/* Discount Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium text-slate-700">ส่วนลด</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant={discountType === "amount" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 h-8 text-xs rounded-lg transition-colors ${
                        discountType === "amount"
                          ? "bg-[#378afa] text-white hover:bg-[#378afa]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                      }`}
                      onClick={() => setDiscountType("amount")}
                    >
                      ฿
                    </Button>
                    <Button
                      variant={discountType === "percent" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 h-8 text-xs rounded-lg transition-colors ${
                        discountType === "percent"
                          ? "bg-[#378afa] text-white hover:bg-[#378afa]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                      }`}
                      onClick={() => setDiscountType("percent")}
                    >
                      %
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder={discountType === "percent" ? "ใส่เปอร์เซ็นต์ (0-100)" : "ใส่จำนวนเงิน"}
                      value={discount || ""}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setDiscount(value < 0 ? 0 : value) // Ensure value is not negative
                      }}
                      className="h-8 text-xs pr-12"
                      min="0" // Add min attribute
                      max={discountType === "percent" ? 100 : undefined}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500 font-medium">
                      {discountType === "percent" ? "%" : "฿"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-slate-600">ยอดรวม</span>
                <span className="font-semibold text-slate-800">฿{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-slate-600">ส่วนลด</span>
                  <span className="font-semibold text-red-600">-฿{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-dashed border-slate-300 pt-2 md:pt-3">
                <div className="flex justify-between text-sm md:text-base font-bold">
                  <span className="text-slate-800">ยอดสุทธิ</span>
                  <span className="text-blue-600">฿{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm font-medium text-slate-700 mb-2 md:mb-3">วิธีการชำระเงิน</h3>
              <div className="grid grid-cols-3 gap-1 md:gap-2">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className={`flex flex-col items-center gap-1 md:gap-2 h-12 md:h-16 rounded-lg border-0 text-xs transition-colors ${
                    paymentMethod === "cash"
                      ? "bg-[#eff7ff] text-[#378afa] hover:bg-blue-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    setPaymentMethod("cash")
                    setAmountReceived(0) // Reset amount received when switching to cash
                  }}
                >
                  <Wallet className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="truncate">เงินสด</span>
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className={`flex flex-col items-center gap-1 md:gap-2 h-12 md:h-16 rounded-lg border-0 text-xs transition-colors ${
                    paymentMethod === "card"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    setPaymentMethod("card")
                    setAmountReceived(0) // Reset amount received when switching from cash
                  }}
                >
                  <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="truncate">บัตรเครดิต</span>
                </Button>
                <Button
                  variant={paymentMethod === "qr" ? "default" : "outline"}
                  className={`flex flex-col items-center gap-1 md:gap-2 h-12 md:h-16 rounded-lg border-0 text-xs transition-colors ${
                    paymentMethod === "qr"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    setPaymentMethod("qr")
                    setAmountReceived(0) // Reset amount received when switching from cash
                  }}
                >
                  <QrCode className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="truncate">QR Code</span>
                </Button>
              </div>

              {paymentMethod === "cash" && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs md:text-sm font-medium text-slate-700">รับเงิน:</div>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="จำนวนเงินที่รับ"
                      value={amountReceived === 0 ? "" : amountReceived}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setAmountReceived(value < 0 ? 0 : value)
                      }}
                      className="h-10 text-sm pr-12"
                      min="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-slate-500 font-medium">
                      ฿
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[100, 500, 1000, 2000, 5000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="h-10 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-xs md:text-sm"
                        onClick={() => setAmountReceived((prev) => prev + amount)}
                      >
                        ฿{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full h-10 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-sm font-semibold"
                    onClick={() => setAmountReceived(total)}
                  >
                    จ่ายพอดี ฿{total.toFixed(2)}
                  </Button>
                  <div className="flex justify-between text-sm md:text-base font-bold pt-2 border-t border-dashed border-slate-300">
                    <span className="text-slate-800">เงินทอน</span>
                    <span className={`text-blue-600 ${changeAmount < 0 ? "text-red-600" : ""}`}>
                      ฿{changeAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 md:space-y-3">
              <Button
                onClick={handleConfirmSale}
                className="w-full h-10 md:h-12 bg-[#378afa] hover:bg-blue-700 text-white font-semibold rounded-full text-xs md:text-sm transition-colors"
                disabled={cartItems.length === 0}
              >
                ยืนยันการสั่งซื้อ
              </Button>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <AlertDialog open={showSaveOrderDialog} onOpenChange={setShowSaveOrderDialog}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-8 md:h-10 rounded-full border-slate-200 hover:bg-slate-50 bg-white text-xs transition-colors"
                      disabled={cartItems.length === 0}
                    >
                      <Save className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                      <span className="truncate">พักคำสั่งซื้อ</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-3xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-slate-800">พักการซื้อ</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-600">
                        พักการซื้อแล้ว คุณสามารถกลับมาดำเนินการต่อได้ในภายหลัง
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-full">ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction onClick={saveOrder} className="rounded-full bg-blue-600 hover:bg-blue-700">
                        ตกลง
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="h-8 md:h-10 rounded-full border-slate-200 hover:bg-slate-50 bg-white text-xs transition-colors"
                  disabled={cartItems.length === 0}
                >
                  <X className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                  <span className="truncate">ล้างตะกร้า</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Orders Dialog */}
      <Dialog open={showSavedOrders} onOpenChange={setShowSavedOrders}>
        <DialogContent className="max-w-2xl rounded-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-slate-800">รายการพักคำสั่งซื้อ</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] px-1">
            <div className="space-y-4 py-4">
              {savedOrders.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Save className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>ไม่มีรายการพักคำสั่งซื้อ</p>
                </div>
              ) : (
                savedOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-800 truncate">{order.id}</h3>
                          <p className="text-sm text-slate-500">{order.timestamp.toLocaleString("th-TH")}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-blue-600">
                            ฿{order.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">{order.items.length} รายการ</p>
                        </div>
                      </div>
                      <div className="space-y-1 mb-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-slate-600 truncate flex-1 mr-2">{item.name}</span>
                            <span className="text-slate-800 whitespace-nowrap">{item.quantity}x</span>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-xs text-slate-500">และอีก {order.items.length - 3} รายการ</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => loadSavedOrder(order)}
                        >
                          โหลดคำสั่งซื้อ
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => deleteSavedOrder(order.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Sales History Dialog */}
      <Dialog open={showSalesHistory} onOpenChange={setShowSalesHistory}>
        <DialogContent className="max-w-4xl rounded-3xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-slate-800">ประวัติการขาย</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] px-1">
            <div className="space-y-4 py-4">
              {salesHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>ไม่มีประวัติการขาย</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-blue-600">{salesHistory.length}</h3>
                        <p className="text-sm text-slate-600">รายการขาย</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-green-600">
                          ฿{salesHistory.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                        </h3>
                        <p className="text-sm text-slate-600">ยอดขายรวม</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-2xl font-bold text-orange-600">
                          ฿{(salesHistory.reduce((sum, sale) => sum + sale.total, 0) / salesHistory.length).toFixed(2)}
                        </h3>
                        <p className="text-sm text-slate-600">ยอดขายเฉลี่ย</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sales List */}
                  {salesHistory.map((sale) => (
                    <Card key={sale.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-slate-800 truncate">{sale.id}</h3>
                            <p className="text-sm text-slate-500">{sale.timestamp.toLocaleString("th-TH")}</p>
                            <p className="text-xs text-slate-500">
                              {sale.paymentMethod === "cash"
                                ? "เงินสด"
                                : sale.paymentMethod === "card"
                                  ? "บัตรเครดิต"
                                  : "QR Code"}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-green-600">฿{sale.total.toFixed(2)}</p>
                            <p className="text-xs text-slate-500">{sale.items.length} รายการ</p>
                            {sale.discount > 0 && (
                              <p className="text-xs text-red-500">
                                ส่วนลด: {sale.discountType === "percent" ? `${sale.discount}%` : `฿${sale.discount}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {sale.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-slate-600 truncate flex-1 mr-2">{item.name}</span>
                              <span className="text-slate-800 whitespace-nowrap">
                                {item.quantity} {item.unit} ฿{item.total.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Receipt Preview Dialog */}
      <Dialog open={showReceiptPreview} onOpenChange={setShowReceiptPreview}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-slate-800">ใบเสร็จรับเงิน</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">ร้านอาหารทะเลสด</h2>
              <p className="text-sm text-slate-600">123 ถนนสุขุมวิท กรุงเทพฯ 10110</p>
              <p className="text-sm text-slate-600">โทร: 02-123-4567</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">วันที่:</span>
                <span className="text-slate-800">{new Date().toLocaleString("th-TH")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">การชำระ:</span>
                <span className="text-slate-800">
                  {paymentMethod === "cash" ? "เงินสด" : paymentMethod === "card" ? "บัตรเครดิต" : "QR Code"}
                </span>
              </div>
              {paymentMethod === "cash" && amountReceived > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-600">รับเงิน:</span>
                    <span className="text-slate-800">฿{amountReceived.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">เงินทอน:</span>
                    <span className="text-slate-800">฿{changeAmount.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
            <Separator />
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-800 truncate">{item.name}</div>
                    <div className="text-slate-500">
                      {item.quantity} {item.unit} x ฿{item.price}
                    </div>
                  </div>
                  <div className="text-slate-800 font-medium ml-2">฿{item.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">ยอดรวม:</span>
                <span className="text-slate-800">฿{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>
                    ส่วนลด:
                    {discountType === "percent" && discount > 0 ? ` (${discount}%)` : ""}
                  </span>
                  <span>-฿{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span className="text-slate-800">ยอดสุทธิ:</span>
                <span className="text-blue-600">฿{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-center text-sm text-slate-500 border-t pt-4">
              ขอบคุณที่ใช้บริการ
              <br />
              โปรดตรวจสอบสินค้าก่อนรับ
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReceiptPreview(false)}
                className="flex-1 rounded-full border-slate-200 hover:bg-slate-50"
              >
                ยกเลิก
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700">
                    <Printer className="w-4 h-4 mr-2" />
                    พิมพ์ใบเสร็จ
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-800">ยืนยันการพิมพ์ใบเสร็จ</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-600">
                      คุณต้องการพิมพ์ใบเสร็จและทำรายการขายใหม่ใช่หรือไม่?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-full">ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handlePrintReceipt}
                      className="rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      พิมพ์
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default POSPage
