"use client"

import React, { useState } from "react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Save,
  BarChart3,
  Fish,
  Shell,
  ChevronDown,
  User,
  X,
  ArrowLeft,
  Edit,
  Banknote,
  QrCode,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    name: "ปลาดุกยักษ์",
    price: 190,
    originalPrice: 220,
    unit: "กิโลกรัม",
    category: "fish",
    image: "/placeholder.svg?height=200&width=300&text=Giant+Catfish",
    stock: 14,
    sold: 5,
    hasQuantityControl: false,
  },
  {
    id: "13",
    name: "กุ้งก้ามกราม",
    price: 380,
    originalPrice: 420,
    unit: "กิโลกรัม",
    category: "shrimp",
    image: "/placeholder.svg?height=200&width=300&text=River+Prawn",
    stock: 12,
    sold: 7,
    hasQuantityControl: false,
  },
  {
    id: "14",
    name: "หอยเซลลิดใหญ่",
    price: 160,
    originalPrice: 180,
    unit: "กิโลกรัม",
    category: "shellfish",
    image: "/placeholder.svg?height=200&width=300&text=Large+Clam",
    stock: 25,
    sold: 11,
    hasQuantityControl: false,
  },
  {
    id: "15",
    name: "ปูป่าดอกกะเฉด",
    price: 250,
    originalPrice: 280,
    unit: "ตัว",
    category: "crab",
    image: "/placeholder.svg?height=200&width=300&text=Wild+Flower+Crab",
    stock: 9,
    sold: 4,
    hasQuantityControl: false,
  },
]

// Seafood categories with sea creature icons
const categories = [
  {
    id: "all",
    name: "ทั้งหมด",
    icon: () => (
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-shrimp-and-lobster-100%20%281%29-8fkONqOAQ3vNZNa5XaSfiBV5y2vz07.png"
        alt="all seafood"
        className="w-4 h-4 object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(196deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
  },
  {
    id: "shrimp",
    name: "กุ้ง",
    icon: () => (
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-shrimp-100%20%282%29-HtcLrNGk3AJvvAboXlXQ68hBeBzysl.png"
        alt="shrimp"
        className="w-4 h-4 object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(196deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
  },
  { id: "fish", name: "ปลา", icon: Fish },
  { id: "shellfish", name: "หอย", icon: Shell },
  {
    id: "crab",
    name: "ปู",
    icon: () => (
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-crab-100%20%282%29-glK3wJcIi7wCroxL18kJwSNACoVTM0.png"
        alt="crab"
        className="w-4 h-4 object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(196deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
  },
  {
    id: "squid",
    name: "ปลาหมึก",
    icon: () => (
      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2C15.31,2 18,4.69 18,8C18,11.31 15.31,14 12,14C8.69,14 6,11.31 6,8C6,4.69 8.69,2 12,2M7,14V16H8V22H10V16H11V22H13V16H14V22H16V16H17V14H7Z" />
      </svg>
    ),
  },
]

interface Customer {
  id: string
  name: string
  phone: string
  address: string
  email?: string
}

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
  customerId?: string
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
  customerId?: string
}

export const POSPage = () => {
  const [showPaymentPage, setShowPaymentPage] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer" | "credit">("cash")
  const [amountReceived, setAmountReceived] = useState(0)
  const [changeAmount, setChangeAmount] = useState(0)

  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
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

  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [showCustomerDialog, setShowCustomerDialog] = React.useState(false)
  const [showNewCustomerForm, setShowNewCustomerForm] = React.useState(false)
  const [customerSearchTerm, setCustomerSearchTerm] = React.useState("")
  const [newCustomer, setNewCustomer] = React.useState({
    name: "",
    phone: "",
    address: "",
  })

  const [editingItem, setEditingItem] = useState<CartItem | null>(null)
  const [editPrice, setEditPrice] = useState("")
  const [editDiscount, setEditDiscount] = useState("")
  const [editDiscountType, setEditDiscountType] = useState<"percent" | "amount">("amount")
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null)

  const [customers, setCustomers] = React.useState<Customer[]>([
    {
      id: "1",
      name: "ปุนิม",
      phone: "0980157529",
      address: "123 ถนนสุขุมวิท กรุงเทพฯ",
      email: "punimmiki@gmail.com",
    },
    {
      id: "2",
      name: "สมชาย ใจดี",
      phone: "0812345678",
      address: "456 ถนนพหลโยธิน กรุงเทพฯ",
    },
    {
      id: "3",
      name: "สมหญิง รักสะอาด",
      phone: "0887654321",
      address: "789 ถนนรัชดาภิเษก กรุงเทพฯ",
    },
  ])

  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Filter products based on search and category
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory && product.stock > 0
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.phone.includes(customerSearchTerm),
  )

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowCustomerDialog(false)
    setCustomerSearchTerm("")
  }

  const handleAddNewCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      const customer: Customer = {
        id: Date.now().toString(),
        name: newCustomer.name,
        phone: newCustomer.phone,
        address: newCustomer.address,
      }
      setCustomers([customer, ...customers])
      setSelectedCustomer(customer)
      setNewCustomer({ name: "", phone: "", address: "" })
      setShowNewCustomerForm(false)
      setShowCustomerDialog(false)
    }
  }

  const handleRemoveCustomer = () => {
    setSelectedCustomer(null)
  }

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
      customerId: selectedCustomer?.id, // Added customer ID to saved order
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

  const handleConfirmSale = () => {
    if (cartItems.length === 0) return
    setShowPaymentPage(true)
  }

  const handlePaymentComplete = () => {
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
      customerId: selectedCustomer?.id,
    }

    setSalesHistory([saleRecord, ...salesHistory])
    setShowReceiptPreview(true)
    setShowPaymentPage(false)
  }

  const handleQuickAmount = (amount: number) => {
    setAmountReceived(amount)
  }

  // Handle print receipt
  const handlePrintReceipt = () => {
    console.log("Printing receipt...")
    clearCart()
    setShowReceiptPreview(false)
  }

  React.useEffect(() => {
    if (paymentMethod === "cash") {
      setChangeAmount(Math.max(0, amountReceived - total))
    } else {
      setChangeAmount(0)
    }
  }, [amountReceived, total, paymentMethod])

  const editItem = (item: CartItem) => {
    setEditingItem(item)
    setEditPrice(item.price.toString())
    setEditDiscount("0")
    setEditDiscountType("amount")
  }

  const saveEditedItem = () => {
    if (!editingItem) return

    const newPrice = Number.parseFloat(editPrice) || editingItem.price
    const discount = Number.parseFloat(editDiscount) || 0

    let finalPrice = newPrice
    if (discount > 0) {
      if (editDiscountType === "percent") {
        finalPrice = newPrice * (1 - discount / 100)
      } else {
        finalPrice = Math.max(0, newPrice - discount)
      }
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...item, price: finalPrice, total: finalPrice * item.quantity } : item,
      ),
    )

    setEditingItem(null)
    setEditPrice("")
    setEditDiscount("")
  }

  if (showPaymentPage) {
    return (
      <div className="h-screen bg-slate-50 flex">
        {/* Left Side - Authentic Thai Receipt */}
        <div className="w-[35%] bg-white p-3 border-r border-slate-200 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => setShowPaymentPage(false)}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Authentic Thai Receipt Format */}
          <div className="font-mono text-center space-y-1 mb-3">
            <div className="text-sm font-bold">บจก.ทราย 999 ซีฟู้ด (โกดัง)</div>
            <div className="text-xs">132 ต.ช้างคลาน อ.เมืองเชียงใหม่, เชียงใหม่, 50300</div>
            <div className="text-xs">โทรศัพท์: 0864047004</div>
          </div>

          <div className="text-center text-sm font-bold mb-2">ใบเสร็จ</div>
          <div className="border-t border-dotted border-slate-400 mb-2"></div>

          <div className="font-mono text-xs space-y-1 mb-2">
            <div className="flex justify-between">
              <span>เลขที่:</span>
              <span>{String(Date.now()).slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>สั่งกลับบ้าน:</span>
              <span className="font-medium">{selectedCustomer?.name || "ลูก"}</span>
            </div>
            <div className="flex justify-between">
              <span>ชื่อพนักงาน:</span>
              <span></span>
            </div>
            <div className="flex justify-between">
              <span>เวลา:</span>
              <span>
                {new Date()
                  .toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")}
              </span>
            </div>
          </div>

          <div className="border-t border-dotted border-slate-400 mb-2"></div>

          {/* Items Header */}
          <div className="font-mono text-xs flex justify-between mb-1">
            <span className="w-[50%]">สินค้า</span>
            <span className="w-[15%] text-center">Qty</span>
            <span className="w-[17%] text-right">ราคา</span>
            <span className="w-[18%] text-right">ราคารวม</span>
          </div>

          {/* Order Items */}
          <div className="font-mono text-xs space-y-1 mb-2">
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex justify-between">
                  <span className="w-[50%]">
                    {index + 1}. {item.name}
                  </span>
                  <span className="w-[15%] text-center">{item.quantity}</span>
                  <span className="w-[17%] text-right">{item.price.toFixed(2)}</span>
                  <span className="w-[18%] text-right">{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="font-mono text-xs mb-2">
            <div className="text-center">ยอดรวม</div>
          </div>

          <div className="border-t border-dotted border-slate-400 mb-2"></div>

          {/* Totals */}
          <div className="font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span>ทั้งหมด</span>
              <span>฿{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>เงินสด</span>
              <span>
                ฿{paymentMethod === "cash" && amountReceived > 0 ? amountReceived.toFixed(2) : total.toFixed(2)}
              </span>
            </div>
            {paymentMethod === "cash" && changeAmount > 0 && (
              <div className="flex justify-between">
                <span>เงินทอน</span>
                <span>฿{changeAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-dotted border-slate-400 mt-2 mb-2"></div>

          <div className="font-mono text-xs text-center space-y-1">
            <div>เลขบัญชี 1833766135 ธ.กสิกร</div>
            <div>ชื่อบัญชี บจก.ทราย999ซีฟู้ด</div>
            <div>ขอบคุณค่ะ</div>
          </div>
        </div>

        {/* Payment Section - 65% */}
        <div className="w-[65%] bg-white p-6 flex flex-col">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-slate-800 mb-2">฿{total.toFixed(2)}</div>
            <div className="text-slate-500 text-lg">ยอดที่ต้องชำระ</div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              <Button
                onClick={() => setPaymentMethod("cash")}
                variant={null}
                className={`h-20 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200
    ring-0 outline-none shadow-none focus:outline-none focus:ring-0 active:ring-0 ${
      paymentMethod === "cash"
        ? "bg-blue-50 text-blue-600 border border-blue-200"
        : "bg-slate-50 text-slate-600 border border-slate-200"
    }`}
              >
                <Banknote className={`w-6 h-6 ${paymentMethod === "cash" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-sm font-medium">เงินสด</span>
              </Button>

              <Button
                onClick={() => setPaymentMethod("qr")}
                variant={null}
                className={`h-20 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200
    ring-0 outline-none shadow-none focus:outline-none focus:ring-0 active:ring-0 ${
      paymentMethod === "qr"
        ? "bg-blue-50 text-blue-600 border border-blue-200"
        : "bg-slate-50 text-slate-600 border border-slate-200"
    }`}
              >
                <QrCode className={`w-6 h-6 ${paymentMethod === "qr" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-sm font-medium">QR Code</span>
              </Button>

              <Button
                onClick={() => setPaymentMethod("transfer")}
                variant={null}
                className={`h-20 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200
    ring-0 outline-none shadow-none focus:outline-none focus:ring-0 active:ring-0 ${
      paymentMethod === "transfer"
        ? "bg-blue-50 text-blue-600 border border-blue-200"
        : "bg-slate-50 text-slate-600 border border-slate-200"
    }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center ${
                    paymentMethod === "transfer" ? "text-blue-600" : "text-slate-500"
                  }`}
                >
                  <span className="text-xl font-bold">...</span>
                </div>
                <span className="text-sm font-medium">อื่น ๆ</span>
              </Button>
            </div>
          </div>

          {/* Cash Payment Interface */}
          {paymentMethod === "cash" && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-slate-600" />
                  จำนวนเงินที่รับ
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amountReceived || ""}
                    onChange={(e) => setAmountReceived(Number(e.target.value))}
                    className="w-full text-2xl font-semibold text-center py-4 bg-transparent border-0 border-b border-slate-300 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleQuickAmount(total)}
                  className="h-14 rounded-lg text-lg font-medium border hover:bg-slate-50"
                >
                  ฿{total.toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAmount(Math.ceil(total / 100) * 100)}
                  className="h-14 rounded-lg text-lg font-medium border hover:bg-slate-50"
                >
                  ฿{(Math.ceil(total / 100) * 100).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAmount(Math.ceil(total / 500) * 500)}
                  className="h-14 rounded-lg text-lg font-medium border hover:bg-slate-50"
                >
                  ฿{(Math.ceil(total / 500) * 500).toFixed(2)}
                </Button>
              </div>

              {amountReceived > 0 && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-slate-600">เงินทอน</span>
                    <span className="text-xl font-bold text-black">฿{changeAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Transfer/Credit Payment Interface */}
          {(paymentMethod === "transfer" || paymentMethod === "credit") && (
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-lg font-medium text-slate-800 mb-2">
                {paymentMethod === "transfer" ? "วิธีการชำระเงินอื่น ๆ" : "ชำระด้วยเครดิต"}
              </div>
              <div className="text-sm text-slate-600">
                {paymentMethod === "transfer" ? "กรุณาเลือกวิธีการชำระเงินอื่น ๆ" : "ชำระด้วยบัตรเครดิต/เดบิต"}
              </div>
            </div>
          )}

          {/* Complete Payment Button */}
          <Button
            onClick={handlePaymentComplete}
            disabled={paymentMethod === "cash" && amountReceived < total}
            className="w-full h-16 mt-auto bg-[#378afa] hover:bg-blue-700 text-white font-semibold rounded-lg text-xl transition-all duration-200"
          >
            ยืนยันการชำระเงิน
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 h-screen overflow-hidden">
      {/* Header - แบ่งเป็น 2 column */}
      <div className="bg-white shadow-sm border-b border-slate-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Category dropdown and Search bar */}
          <div className="w-full lg:w-[65%] p-2 md:p-3">
            <div className="flex gap-3 items-center">
              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 md:h-9 px-3 rounded-full hover:bg-slate-50 transition-colors whitespace-nowrap border-0"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const selectedCat = categories.find((cat) => cat.id === selectedCategory)
                        const IconComponent = selectedCat?.icon || Fish
                        return (
                          <>
                            <IconComponent className="w-4 h-4 text-blue-500" />
                            <span className="text-base">{selectedCat?.name || "ทั้งหมด"}</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )
                      })()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 border-0 shadow-lg">
                  {categories
                    .filter((category) => !category.name.includes("......"))
                    .map((category) => {
                      const IconComponent = category.icon
                      return (
                        <DropdownMenuItem
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50"
                        >
                          <div className="flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="font-medium text-sm text-slate-700">{category.name}</span>
                        </DropdownMenuItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex-1 flex justify-end">
                <div className="relative">
                  {!isSearchExpanded ? (
                    // Search icon only - positioned at far right of left panel
                    <button
                      onClick={() => setIsSearchExpanded(true)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <Search className="h-4 w-4 text-slate-500" />
                    </button>
                  ) : (
                    // Expanded search bar
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="ค้นหาสินค้าทะเล..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => {
                          if (!searchTerm) {
                            setIsSearchExpanded(false)
                          }
                        }}
                        autoFocus
                        className="pl-10 pr-10 py-2 h-9 text-sm bg-white border border-slate-200 rounded-full placeholder:text-slate-400 w-full focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      />
                      <button
                        onClick={() => {
                          setSearchTerm("")
                          setIsSearchExpanded(false)
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <X className="h-3 w-3 text-slate-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - ปุ่มสำหรับฝั่ง cart */}
          <div className="w-full lg:w-[35%] p-2 md:p-3 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 md:h-9 px-2 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-xs whitespace-nowrap"
              onClick={() => setShowSavedOrders(true)}
            >
              <Save className="w-4 h-4 mr-1" />
              รายการพักซื้อ {savedOrders.length > 0 && `(${savedOrders.length})`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 md:h-9 px-2 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-xs whitespace-nowrap"
              onClick={() => setShowSalesHistory(true)}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              ประวัติขาย
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] md:h-[calc(100vh-65px)] overflow-hidden">
        {/* Left Panel - Products */}
        <div className="w-full lg:w-[65%] bg-white border-r border-slate-200 p-2 lg:p-4 flex-1 lg:flex-none overflow-hidden">
          {/* Product Grid */}
          <ScrollArea className="h-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 p-2">
              {filteredProducts.slice(0, 25).map((product) => (
                <div
                  key={product.id}
                  className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-slate-200 shadow-md bg-white rounded-xl overflow-hidden cursor-pointer h-48 md:h-52 flex flex-col"
                  onClick={() => addToCart(product)}
                >
                  <div className="relative overflow-hidden h-32 md:h-36 flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg?height=144&width=160&query=aquatic product"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/aquatic-product.png"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="px-2 py-2 flex-1 flex flex-col justify-between">
                    <h3 className="text-xs md:text-sm font-medium text-slate-800 leading-tight mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs md:text-sm font-semibold text-blue-600">฿{product.price}</span>
                      <span className="text-xs md:text-sm text-slate-500">/{product.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Cart */}
        <div className="w-full lg:w-[35%] bg-white shadow-lg border-t lg:border-t-0 lg:border-sm border-slate-200 flex-shrink-0 overflow-hidden">
          <div className="p-3 md:p-4 lg:p-6 h-full flex flex-col bg-white">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomerDialog(true)}
                  className="h-8 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-sm justify-start px-3"
                >
                  <User className="h-4 w-4 mr-2" />
                  {selectedCustomer ? selectedCustomer.name : "เลือกลูกค้า"}
                </Button>
                {selectedCustomer && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveCustomer}
                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {cartItems.length} รายการ
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-[250px] lg:h-full">
                {cartItems.length === 0 ? (
                  <div className="flex items-center justify-center h-24 md:h-32 text-slate-500">
                    <div className="text-center">
                      <Fish className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs md:text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="relative overflow-hidden rounded-lg">
                        <div
                          className={`flex items-center justify-between p-2 bg-white transition-transform duration-300 ease-out ${
                            swipedItemId === item.id ? "-translate-x-16" : "translate-x-0"
                          }`}
                          onMouseDown={(e) => {
                            const startX = e.clientX
                            const handleMouseMove = (e: MouseEvent) => {
                              const deltaX = startX - e.clientX
                              if (deltaX > 50) {
                                setSwipedItemId(item.id)
                              } else if (deltaX < -20) {
                                setSwipedItemId(null)
                              }
                            }
                            const handleMouseUp = () => {
                              document.removeEventListener("mousemove", handleMouseMove)
                              document.removeEventListener("mouseup", handleMouseUp)
                            }
                            document.addEventListener("mousemove", handleMouseMove)
                            document.addEventListener("mouseup", handleMouseUp)
                          }}
                          onTouchStart={(e) => {
                            const startX = e.touches[0].clientX
                            const handleTouchMove = (e: TouchEvent) => {
                              const deltaX = startX - e.touches[0].clientX
                              if (deltaX > 50) {
                                setSwipedItemId(item.id)
                              } else if (deltaX < -20) {
                                setSwipedItemId(null)
                              }
                            }
                            const handleTouchEnd = () => {
                              document.removeEventListener("touchmove", handleTouchMove)
                              document.removeEventListener("touchend", handleTouchEnd)
                            }
                            document.addEventListener("touchmove", handleTouchMove)
                            document.addEventListener("touchend", handleTouchEnd)
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm  text-slate-800 truncate">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="text-xs font-semibold text-blue-600 ml-2">
                                ฿{Math.round(item.total)}
                              </span>
                            </div>
                          </div>
                          {swipedItemId !== item.id && (
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-6 w-6" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-6 w-6" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {swipedItemId === item.id && (
                          <div className="absolute right-0 top-0 h-full flex items-center bg-slate-100 pr-2 gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-12 w-12 md:h-14 md:w-14 text-blue-600 hover:bg-blue-50 rounded-lg"
                              onClick={() => {
                                editItem(item)
                                setSwipedItemId(null)
                              }}
                            >
                              <Edit className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-12 w-12 md:h-14 md:w-14 text-red-500 hover:bg-red-50 rounded-lg"
                              onClick={() => {
                                removeFromCart(item.id)
                                setSwipedItemId(null)
                              }}
                            >
                              <Trash2 className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="flex-shrink-0 mt-0">
              {/* Discount Section */}
              <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">ส่วนลด</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      variant={discountType === "amount" ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 h-9 text-xs rounded-lg transition-colors ${
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
                      className={`flex-1 h-9 text-xs rounded-lg transition-colors ${
                        discountType === "percent"
                          ? "bg-[#378afa] text-white hover:bg-[#378afa]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                      }`}
                      onClick={() => setDiscountType("percent")}
                    >
                      %
                    </Button>
                  </div>
                  <div className="relative mt-3">
                    <Input
                      type="number"
                      placeholder={discountType === "percent" ? "ใส่เปอร์เซ็นต์ (0-100)" : "ใส่จำนวนเงิน"}
                      value={discount || ""}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setDiscount(value < 0 ? 0 : value) // Ensure value is not negative
                      }}
                      className="h-9 text-xs pr-12"
                      min="0" // Add min attribute
                      max={discountType === "percent" ? 100 : undefined}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500 font-medium">
                      {discountType === "percent" ? "%" : "฿"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs mt-4">
                <span className="text-slate-600">ยอดรวม</span>
                <span className="font-semibold text-slate-800">฿{Math.round(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">ส่วนลด</span>
                  <span className="font-semibold text-red-600">-฿{Math.round(discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-dashed border-slate-300 pt-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-800">ยอดสุทธิ</span>
                  <span className="text-blue-600">฿{Math.round(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-4">
                <Button
                  onClick={handleConfirmSale}
                  className="w-full h-10 md:h-12 bg-[#378afa] hover:bg-blue-700 text-white font-semibold rounded-lg text-xs md:text-sm transition-colors"
                  disabled={cartItems.length === 0}
                >
                  ชำระเงิน
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <AlertDialog open={showSaveOrderDialog} onOpenChange={setShowSaveOrderDialog}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 md:h-10 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-xs transition-colors"
                        disabled={cartItems.length === 0}
                      >
                        <Save className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                        <span className="truncate">พักคำสั่งซื้อ</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-slate-800">พักการซื้อ</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-600">
                          พักการซื้อแล้ว คุณสามารถกลับมาดำเนินการต่อได้ในภายหลัง
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-lg">ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction onClick={saveOrder} className="rounded-lg bg-blue-600 hover:bg-blue-700">
                          ตกลง
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="h-8 md:h-10 rounded-lg border-slate-200 hover:bg-slate-50 bg-white text-xs transition-colors"
                    disabled={cartItems.length === 0}
                  >
                    <Trash2 className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                    <span className="truncate">ล้างตะกร้า</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-md rounded-lg max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-slate-800">เลือกลูกค้า</DialogTitle>
          </DialogHeader>

          {!showNewCustomerForm ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="ค้นหาลูกค้า..."
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  className="pl-10 h-10 rounded-lg"
                />
              </div>

              {/* Add New Customer Button */}
              <Button
                onClick={() => setShowNewCustomerForm(true)}
                className="w-full h-10 bg-[#378afa] hover:bg-blue-700 text-white rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มลูกค้าใหม่
              </Button>

              {/* Customer List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <h3 className="text-sm font-medium text-slate-600 mb-2">ลูกค้าล่าสุด</h3>
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.phone}</p>
                    </div>
                  </div>
                ))}
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-4 text-slate-500">
                    <p className="text-sm">ไม่พบลูกค้า</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" size="icon" onClick={() => setShowNewCustomerForm(false)} className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium text-slate-800">เพิ่มลูกค้าใหม่</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">ชื่อลูกค้า *</label>
                  <Input
                    placeholder="กรอกชื่อลูกค้า"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">เบอร์โทร *</label>
                  <Input
                    placeholder="กรอกเบอร์โทร"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">ที่อยู่</label>
                  <textarea
                    placeholder="กรอกที่อยู่"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    className="w-full h-20 px-3 py-2 border border-slate-200 rounded-lg resize-none text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNewCustomerForm(false)}
                  className="flex-1 h-10 rounded-lg"
                >
                  ยกเลิก
                </Button>
                <Button
                  onClick={handleAddNewCustomer}
                  disabled={!newCustomer.name || !newCustomer.phone}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  บันทึก
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Saved Orders Dialog */}
      <Dialog open={showSavedOrders} onOpenChange={setShowSavedOrders}>
        <DialogContent className="max-w-2xl rounded-lg max-h-[80vh] overflow-hidden">
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
                savedOrders.map((order) => {
                  const orderCustomer = customers.find((c) => c.id === order.customerId)

                  return (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-slate-800 truncate">{order.id}</h3>
                            <p className="text-sm text-slate-500">{order.timestamp.toLocaleString("th-TH")}</p>
                            <div className="mt-1">
                              {orderCustomer ? (
                                <p className="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md inline-block">
                                  👤 {orderCustomer.name}
                                </p>
                              ) : (
                                <p className="text-sm text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md inline-block">
                                  👤 ไม่ระบุลูกค้า
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-blue-600">
                              ฿{Math.round(order.items.reduce((sum, item) => sum + item.total, 0))}
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
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
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
                                  : "โอนเงิน"}
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

      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-800">แก้ไขสินค้า</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-6 w-6"
              onClick={() => setEditingItem(null)}
            />
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">ราคา</label>
              <Input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full rounded-lg"
                placeholder="ราคาสินค้า"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">ส่วนลด</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={editDiscount}
                  onChange={(e) => setEditDiscount(e.target.value)}
                  className="flex-1 rounded-lg"
                  placeholder="0"
                />
                <Select
                  value={editDiscountType}
                  onValueChange={(value: "percent" | "amount") => setEditDiscountType(value)}
                >
                  <SelectTrigger className="w-20 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">บาท</SelectItem>
                    <SelectItem value="percent">%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={saveEditedItem}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
            >
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default POSPage
