"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import { th } from "date-fns/locale"
import {
  FileText,
  Search,
  CalendarIcon,
  User,
  Receipt,
  Camera,
  Download,
  Grid3X3,
  List,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock orders data ที่ตรงกับ documents
export const ordersData = [
  {
    id: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    channel: "Line",
    orderDate: "2024-07-27",
    receiveDate: "2024-07-30",
    totalPrice: 2450,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "cash",
    printed: true,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [
      { name: "ปลาแซลมอนสด", quantity: 2, unit: "กิโลกรัม", price: 450, total: 900 },
      { name: "กุ้งแม่น้ำ", quantity: 1, unit: "กิโลกรัม", price: 280, total: 280 },
      { name: "ปลาทูน่าสด", quantity: 3, unit: "กิโลกรัม", price: 380, total: 1140 },
    ],
    shippingAddress: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    notes: "ต้องการสินค้าสดใหม่",
  },
  {
    id: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    channel: "Facebook",
    orderDate: "2024-07-28",
    receiveDate: "2024-08-02",
    totalPrice: 8900,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "scb",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [
      { name: "ปลาแซลมอน", quantity: 10, unit: "กิโลกรัม", price: 450, total: 4500 },
      { name: "หอยแมลงภู่", quantity: 5, unit: "กิโลกรัม", price: 120, total: 600 },
      { name: "กุ้งขาว", quantity: 15, unit: "กิโลกรัม", price: 180, total: 2700 },
      { name: "ปลาทูน่าสด", quantity: 8, unit: "กิโลกรัม", price: 250, total: 2000 },
    ],
    shippingAddress: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    notes: "สำหรับงานเลี้ยงบริษัท",
  },
  {
    id: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    channel: "Tel",
    orderDate: "2024-07-26",
    receiveDate: "2024-07-29",
    totalPrice: 1200,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "kbank",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: true,
    },
    items: [
      { name: "กุ้งขาว", quantity: 2, unit: "กิโลกรัม", price: 180, total: 360 },
      { name: "หอยแมลงภู่", quantity: 3, unit: "กิโลกรัม", price: 120, total: 360 },
      { name: "ปลาทูน่าสด", quantity: 2, unit: "กิโลกรัม", price: 240, total: 480 },
    ],
    shippingAddress: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    notes: "",
  },
  {
    id: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    channel: "Line",
    orderDate: "2024-07-27",
    receiveDate: "2024-07-30",
    totalPrice: 15600,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "bbl",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 20, unit: "กิโลกรัม", price: 250, total: 5000 },
      { name: "ปลาแซลมอน", quantity: 15, unit: "กิโลกรัม", price: 450, total: 6750 },
      { name: "กุ้งขาว", quantity: 10, unit: "กิโลกรัม", price: 180, total: 1800 },
      { name: "หอยแมลงภู่", quantity: 15, unit: "กิโลกรัม", price: 120, total: 1800 },
    ],
    shippingAddress: "321 ถนนรัชดาภิเษก แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    notes: "สำหรับร้านอาหาร ต้องการคุณภาพดี",
  },
  {
    id: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    channel: "Facebook",
    orderDate: "2024-07-28",
    receiveDate: "2024-08-01",
    totalPrice: 3200,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "cash",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
    items: [
      { name: "ปลาแซลมอน", quantity: 5, unit: "กิโลกรัม", price: 450, total: 2250 },
      { name: "กุ้งขาว", quantity: 3, unit: "กิโลกรัม", price: 180, total: 540 },
      { name: "หอยแมลงภู่", quantity: 2, unit: "กิโลกรัม", price: 120, total: 240 },
    ],
    shippingAddress: "654 ถนนเพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400",
    notes: "ชำระเงินมัดจำแล้ว 1,500 บาท",
  },
  {
    id: "ORD-006",
    customerName: "ร้านอาหารญี่ปุ่น",
    channel: "Tel",
    orderDate: "2024-07-25",
    receiveDate: "2024-07-28",
    totalPrice: 25400,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "scb",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: false,
      pickList: true,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 30, unit: "กิโลกรัม", price: 250, total: 7500 },
      { name: "ปลาแซลมอน", quantity: 25, unit: "กิโลกรัม", price: 450, total: 11250 },
      { name: "กุ้งขาว", quantity: 20, unit: "กิโลกรัม", price: 180, total: 3600 },
      { name: "หอยแมลงภู่", quantity: 15, unit: "กิโลกรัม", price: 120, total: 1800 },
    ],
    shippingAddress: "888 ถนนสุขุมวิท แขวงพระโขนง เขตวัฒนา กรุงเทพฯ 10110",
    notes: "สำหรับบุฟเฟ่ต์โรงแรม ต้องการจัดส่งเช้า 6 โมง",
  },
  {
    id: "ORD-007",
    customerName: "ร้านอาหารเกาหลี",
    channel: "Line",
    orderDate: "2024-07-24",
    receiveDate: "2024-07-27",
    totalPrice: 4800,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "kbank",
    printed: true,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: false,
    },
    items: [
      { name: "ปลาแซลมอน", quantity: 8, unit: "กิโลกรัม", price: 450, total: 3600 },
      { name: "กุ้งขาว", quantity: 5, unit: "กิโลกรัม", price: 180, total: 900 },
      { name: "หอยแมลงภู่", quantity: 3, unit: "กิโลกรัม", price: 100, total: 300 },
    ],
    shippingAddress: "999 ถนนพระราม 9 แขวงห้วยขวง เขตห้วยขวง กรุงเทพฯ 10310",
    notes: "สำหรับร้านอาหารเกาหลี",
  },
  {
    id: "ORD-008",
    customerName: "นายสมศักดิ์ รักปลา",
    channel: "Facebook",
    orderDate: "2024-07-23",
    receiveDate: "2024-07-26",
    totalPrice: 1800,
    orderStatus: "completed",
    paymentStatus: "paid",
    paymentMethod: "cash",
    printed: false,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: true,
    },
    items: [
      { name: "ปลาทูน่าสด", quantity: 4, unit: "กิโลกรัม", price: 250, total: 1000 },
      { name: "กุ้งขาว", quantity: 3, unit: "กิโลกรัม", price: 180, total: 540 },
      { name: "หอยแมลงภู่", quantity: 2, unit: "กิโลกรัม", price: 130, total: 260 },
    ],
    shippingAddress: "555 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240",
    notes: "ลูกค้าประจำ",
  },
  // เพิ่มข้อมูลตัวอย่างเพื่อทดสอบสถานะใหม่
  {
    id: "ORD-009",
    customerName: "ร้านอาหารทะเลใหม่",
    channel: "Tel",
    orderDate: "2024-07-29",
    receiveDate: "2024-08-03",
    totalPrice: 5000,
    orderStatus: "pending", // New status
    paymentStatus: "unpaid", // New status
    paymentMethod: "kbank",
    printed: false,
    customerType: "ลูกค้าเครดิต",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: false,
      packingList: false,
      pickList: false,
    },
    items: [
      { name: "ปลาหมึกสด", quantity: 5, unit: "กิโลกรัม", price: 200, total: 1000 },
      { name: "ปูม้า", quantity: 2, unit: "กิโลกรัม", price: 500, total: 1000 },
    ],
    shippingAddress: "1000 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900",
    notes: "ลูกค้าใหม่",
  },
  {
    id: "ORD-010",
    customerName: "นางสาวฟ้าใส",
    channel: "Line",
    orderDate: "2024-07-29",
    receiveDate: "2024-08-01",
    totalPrice: 1500,
    orderStatus: "packing", // New status
    paymentStatus: "partially_paid", // New status
    paymentMethod: "cash",
    printed: true,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งไปรษณีย์",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [{ name: "กุ้งแช่แข็ง", quantity: 3, unit: "กิโลกรัม", price: 300, total: 900 }],
    shippingAddress: "222 ถนนพญาไท แขวงพญาไท เขตราชเทวี กรุงเทพฯ 10400",
    notes: "รีบใช้",
  },
  {
    id: "ORD-011",
    customerName: "นายแดง",
    channel: "Facebook",
    orderDate: "2024-07-30",
    receiveDate: "2024-08-02",
    totalPrice: 2000,
    orderStatus: "delivering", // New status
    paymentStatus: "paid", // New status
    paymentMethod: "scb",
    printed: true,
    customerType: "ลูกค้าเงินสด",
    deliveryMethod: "ขนส่งเอกชน",
    documents: {
      packageLabel: true,
      packingList: true,
      pickList: true,
    },
    items: [{ name: "ปลาอินทรี", quantity: 2, unit: "กิโลกรัม", price: 500, total: 1000 }],
    shippingAddress: "333 ถนนเพชรเกษม แขวงบางแค เขตบางแค กรุงเทพฯ 10160",
    notes: "จัดส่งด่วน",
  },
]

export const orderStatusMapData = {
  pending: { label: "รอยืนยันคำสั่งซื้อ", color: "bg-gray-50 text-gray-600 border-gray-200" },
  packing: { label: "รอแพ็คของ", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  delivering: { label: "รอจัดส่ง", color: "bg-orange-50 text-orange-600 border-orange-200" },
  completed: { label: "จัดส่งแล้ว", color: "bg-green-50 text-green-600 border-green-200" },
} as const

export const paymentStatusMapData = {
  unpaid: { label: "รอชำระเงิน", color: "bg-red-50 text-red-600 border-red-200" },
  partially_paid: { label: "ชำระบางส่วน", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  paid: { label: "ชำระเงินแล้ว", color: "bg-green-50 text-green-600 border-green-200" },
} as const

export const customerTypeMapData = {
  ลูกค้าเงินสด: { color: "bg-green-50 text-green-700 border-green-200" },
  ลูกค้าเครดิต: { color: "bg-purple-50 text-purple-700 border-purple-200" },
} as const

export const bankMapData = {
  cash: { name: "เงินสด", color: "bg-green-100 text-green-800" },
  scb: { name: "ไทยพาณิชย์", color: "bg-purple-100 text-purple-800" },
  kbank: { name: "กสิกรไทย", color: "bg-green-100 text-green-800" },
  bbl: { name: "กรุงเทพ", color: "bg-blue-100 text-blue-800" },
  ktb: { name: "กรุงไทย", color: "bg-blue-100 text-blue-800" },
  tmb: { name: "ทหารไทย", color: "bg-yellow-100 text-yellow-800" },
} as const

// Sample documents data
export const documentsData = [
  {
    id: "DOC-001",
    orderId: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    date: "2024-07-27",
    paymentSlips: [
      {
        id: "slip-001-1",
        name: "สลิปโอนเงิน_ORD-001_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip+1",
        uploadedAt: "2024-07-27T08:30:00",
      },
      {
        id: "slip-001-2",
        name: "สลิปโอนเงิน_ORD-001_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip+2",
        uploadedAt: "2024-07-27T08:35:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-001-1",
        name: "จัดส่ง_ORD-001_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-27T14:20:00",
      },
      {
        id: "delivery-001-2",
        name: "จัดส่ง_ORD-001_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+2",
        uploadedAt: "2024-07-27T14:25:00",
      },
      {
        id: "delivery-001-3",
        name: "จัดส่ง_ORD-001_3.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+3",
        uploadedAt: "2024-07-27T14:30:00",
      },
    ],
  },
  {
    id: "DOC-002",
    orderId: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    date: "2024-07-28",
    paymentSlips: [
      {
        id: "slip-002-1",
        name: "สลิปโอนเงิน_ORD-002.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip",
        uploadedAt: "2024-07-28T09:15:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-002-1",
        name: "จัดส่ง_ORD-002_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-28T15:45:00",
      },
      {
        id: "delivery-002-2",
        name: "จัดส่ง_ORD-002_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+2",
        uploadedAt: "2024-07-28T15:50:00",
      },
    ],
  },
  {
    id: "DOC-003",
    orderId: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    date: "2024-07-26",
    paymentSlips: [
      {
        id: "slip-003-1",
        name: "สลิปโอนเงิน_ORD-003.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip",
        uploadedAt: "2024-07-26T10:20:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-003-1",
        name: "จัดส่ง_ORD-003_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-26T16:10:00",
      },
    ],
  },
  {
    id: "DOC-004",
    orderId: "ORD-004",
    customerName: "ร้านอาหารทะเลสด",
    date: "2024-07-27",
    paymentSlips: [
      {
        id: "slip-004-1",
        name: "สลิปโอนเงิน_ORD-004.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip",
        uploadedAt: "2024-07-27T11:30:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-004-1",
        name: "จัดส่ง_ORD-004_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-27T17:20:00",
      },
      {
        id: "delivery-004-2",
        name: "จัดส่ง_ORD-004_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+2",
        uploadedAt: "2024-07-27T17:25:00",
      },
    ],
  },
  {
    id: "DOC-005",
    orderId: "ORD-005",
    customerName: "นายประยุทธ์ รักทะเล",
    date: "2024-07-28",
    paymentSlips: [],
    deliveryPhotos: [
      {
        id: "delivery-005-1",
        name: "จัดส่ง_ORD-005_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-28T13:40:00",
      },
    ],
  },
  {
    id: "DOC-006",
    orderId: "ORD-006",
    customerName: "ร้านอาหารญี่ปุ่น",
    date: "2024-07-25",
    paymentSlips: [
      {
        id: "slip-006-1",
        name: "สลิปโอนเงิน_ORD-006.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip",
        uploadedAt: "2024-07-25T12:15:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-006-1",
        name: "จัดส่ง_ORD-006_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-25T18:30:00",
      },
      {
        id: "delivery-006-2",
        name: "จัดส่ง_ORD-006_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+2",
        uploadedAt: "2024-07-25T18:35:00",
      },
      {
        id: "delivery-006-3",
        name: "จัดส่ง_ORD-006_3.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+3",
        uploadedAt: "2024-07-25T18:40:00",
      },
    ],
  },
  // เพิ่มข้อมูลตัวอย่างเพื่อทดสอบ pagination
  {
    id: "DOC-007",
    orderId: "ORD-007",
    customerName: "ร้านอาหารเกาหลี",
    date: "2024-07-24",
    paymentSlips: [
      {
        id: "slip-007-1",
        name: "สลิปโอนเงิน_ORD-007.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip",
        uploadedAt: "2024-07-24T10:15:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-007-1",
        name: "จัดส่ง_ORD-007_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-24T16:30:00",
      },
    ],
  },
  {
    id: "DOC-008",
    orderId: "ORD-008",
    customerName: "นายสมศักดิ์ รักปลา",
    date: "2024-07-23",
    paymentSlips: [],
    deliveryPhotos: [
      {
        id: "delivery-008-1",
        name: "จัดส่ง_ORD-008_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+1",
        uploadedAt: "2024-07-23T14:20:00",
      },
      {
        id: "delivery-008-2",
        name: "จัดส่ง_ORD-008_2.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+2",
        uploadedAt: "2024-07-23T14:25:00",
      },
    ],
  },
  {
    id: "DOC-009", // Corresponds to ORD-009
    orderId: "ORD-009",
    customerName: "ร้านอาหารทะเลใหม่",
    date: "2024-07-29",
    paymentSlips: [],
    deliveryPhotos: [],
  },
  {
    id: "DOC-010", // Corresponds to ORD-010
    orderId: "ORD-010",
    customerName: "นางสาวฟ้าใส",
    date: "2024-07-29",
    paymentSlips: [
      {
        id: "slip-010-1",
        name: "สลิปโอนเงิน_ORD-010.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip+10",
        uploadedAt: "2024-07-29T10:00:00",
      },
    ],
    deliveryPhotos: [],
  },
  {
    id: "DOC-011", // Corresponds to ORD-011
    orderId: "ORD-011",
    customerName: "นายแดง",
    date: "2024-07-30",
    paymentSlips: [
      {
        id: "slip-011-1",
        name: "สลิปโอนเงิน_ORD-011.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Payment+Slip+11",
        uploadedAt: "2024-07-30T11:00:00",
      },
    ],
    deliveryPhotos: [
      {
        id: "delivery-011-1",
        name: "จัดส่ง_ORD-011_1.jpg",
        url: "/placeholder.svg?height=400&width=300&text=Delivery+Photo+11",
        uploadedAt: "2024-07-30T15:00:00",
      },
    ],
  },
]

// Image viewer component
const ImageViewer = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: Array<{ id: string; name: string; url: string; uploadedAt: string }>
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) => {
  const currentImage = images[currentIndex]
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="relative">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-semibold">{currentImage.name}</h3>
              <p className="text-sm text-muted-foreground">
                อัพโหลดเมื่อ: {format(parseISO(currentImage.uploadedAt), "dd/MM/yyyy HH:mm", { locale: th })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {images.length}
              </span>
              <Button variant="outline" size="sm" onClick={onNext} disabled={currentIndex === images.length - 1}>
                ถัดไป
              </Button>
              <Button variant="outline" size="sm" onClick={onPrev} disabled={currentIndex === 0}>
                ก่อนหน้า
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-center">
              <img
                src={currentImage.url || "/placeholder.svg"}
                alt={currentImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Gallery viewer component
const GalleryViewer = ({
  images,
  title,
  onClose,
  onImageClick,
}: {
  images: Array<{ id: string; name: string; url: string; uploadedAt: string }>
  title: string
  onClose: () => void
  onImageClick: (index: number) => void
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group cursor-pointer" onClick={() => onImageClick(index)}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-center mt-1 truncate" title={image.name}>
                {image.name}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState(documentsData)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [dateFilter, setDateFilter] = React.useState<Date | undefined>(undefined)
  const [documentTypeFilter, setDocumentTypeFilter] = React.useState("all")
  const [customerTypeFilter, setCustomerTypeFilter] = React.useState("all") // New state for customer type filter
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("table")
  const [selectedImages, setSelectedImages] = React.useState<
    Array<{ id: string; name: string; url: string; uploadedAt: string }>
  >([])
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = React.useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)
  const [galleryTitle, setGalleryTitle] = React.useState("")
  const [showOrderDetail, setShowOrderDetail] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null)

  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  // Filter and flatten documents
  const filteredDocuments = React.useMemo(() => {
    return documents.filter((doc) => {
      const order = ordersData.find((o) => o.id === doc.orderId) // Find the corresponding order
      const matchesSearch =
        doc.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDate = !dateFilter || doc.date === format(dateFilter, "yyyy-MM-dd")
      const matchesType =
        documentTypeFilter === "all" ||
        (documentTypeFilter === "payment" && doc.paymentSlips.length > 0) ||
        (documentTypeFilter === "delivery" && doc.deliveryPhotos.length > 0)
      const matchesCustomerType = customerTypeFilter === "all" || (order && order.customerType === customerTypeFilter)

      return matchesSearch && matchesDate && matchesType && matchesCustomerType
    })
  }, [documents, searchTerm, dateFilter, documentTypeFilter, customerTypeFilter]) // Add customerTypeFilter to dependencies

  // Pagination calculations
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, dateFilter, documentTypeFilter, customerTypeFilter]) // Add customerTypeFilter to dependencies

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const openGallery = (images: Array<{ id: string; name: string; url: string; uploadedAt: string }>, title: string) => {
    setSelectedImages(images)
    setGalleryTitle(title)
    setIsGalleryOpen(true)
  }

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(false)
    setIsImageViewerOpen(true)
  }

  const closeImageViewer = () => {
    setIsImageViewerOpen(false)
    setSelectedImages([])
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setSelectedImages([])
    setGalleryTitle("")
  }

  const nextImage = () => {
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setDateFilter(undefined)
    setDocumentTypeFilter("all")
    setCustomerTypeFilter("all") // Clear customer type filter
  }

  const handleViewOrder = (orderId: string) => {
    const order = ordersData.find((o) => o.id === orderId)
    if (order) {
      setSelectedOrder(order)
      setShowOrderDetail(true)
    }
  }

  const totalDocuments = documents.length
  const totalPaymentSlips = documents.reduce((sum, doc) => sum + doc.paymentSlips.length, 0)
  const totalDeliveryPhotos = documents.reduce((sum, doc) => sum + doc.deliveryPhotos.length, 0)

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">เอกสาร</h1>
          <p className="text-muted-foreground">จัดการเอกสารและรูปภาพจากการจัดส่ง</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Receipt className="h-3 w-3 mr-1" />
            {totalPaymentSlips} สลิป
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Camera className="h-3 w-3 mr-1" />
            {totalDeliveryPhotos} รูป
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <FileText className="h-3 w-3 mr-1" />
            {totalDocuments} คำสั่งซื้อ
          </Badge>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 border-0 rounded-2xl">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            ดาวน์โหลดทั้งหมด
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8 px-2"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-2"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 min-w-0">
              <Label htmlFor="search">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ค้นหาด้วยรหัสคำสั่งซื้อหรือชื่อลูกค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label>วันที่</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateFilter && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[9999]" side="bottom" align="start">
                  <Calendar mode="single" selected={dateFilter} onSelect={(date) => setDateFilter(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full sm:w-48">
              <Label>ประเภทเอกสาร</Label>
              <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="payment">สลิปโอนเงิน</SelectItem>
                  <SelectItem value="delivery">รูปการจัดส่ง</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* New Customer Type Filter */}
            <div className="w-full sm:w-48">
              <Label>ประเภทลูกค้า</Label>
              <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="ลูกค้าเงินสด">ลูกค้าเงินสด</SelectItem>
                  <SelectItem value="ลูกค้าเครดิต">ลูกค้าเครนดิต</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent" onClick={handleClearFilters}>
              ล้างตัวกรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>รายการเอกสาร</CardTitle>
              <CardDescription>
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredDocuments.length)} จาก {filteredDocuments.length}{" "}
                รายการ (ทั้งหมด {totalDocuments} รายการ)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="itemsPerPage" className="text-sm">
                แสดง:
              </Label>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">รายการ</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              {/* Group documents by date */}
              {(() => {
                // Group documents by date
                const groupedDocuments = currentDocuments.reduce(
                  (groups, doc) => {
                    const date = doc.date
                    if (!groups[date]) {
                      groups[date] = []
                    }
                    groups[date].push(doc)
                    return groups
                  },
                  {} as Record<string, typeof currentDocuments>,
                )

                // Sort dates in descending order (newest first)
                const sortedDates = Object.keys(groupedDocuments).sort(
                  (a, b) => new Date(b).getTime() - new Date(a).getTime(),
                )

                return (
                  <div className="space-y-0">
                    {/* Single table header */}
                    <table className="w-full">
                      <thead className="border-b bg-muted/30 sticky top-0 z-[1]">
                        <tr>
                          <th className="text-center p-4 font-medium">รหัสคำสั่งซื้อ</th>
                          <th className="text-center p-4 font-medium">ลูกค้า</th>
                          <th className="text-center p-4 font-medium">สถานะคำสั่งซื้อ</th>
                          <th className="text-center p-4 font-medium">สถานะการชำระเงิน</th>
                          <th className="text-center p-4 font-medium">สลิปโอนเงิน</th>
                          <th className="text-center p-4 font-medium">รูปการจัดส่ง</th>
                          <th className="text-center p-4 font-medium">การดำเนินการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedDates.map((date) => {
                          const docsForDate = groupedDocuments[date]
                          return (
                            <React.Fragment key={date}>
                              {/* Date row */}
                              <tr className="bg-gray-50 border-b">
                                <td colSpan={7} className="p-3">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                      {format(parseISO(date), "dd/MM/yyyy", { locale: th })}
                                      <span className="text-sm font-normal text-gray-600 ml-2">
                                        (ทั้งหมด {docsForDate.length} คำสั่งซื้อ)
                                      </span>
                                    </h3>
                                  </div>
                                </td>
                              </tr>
                              {/* Document rows for this date */}
                              {docsForDate.map((doc) => {
                                const order = ordersData.find((o) => o.id === doc.orderId)
                                return (
                                  <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                                    <td className="p-4 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{doc.orderId}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span>{doc.customerName}</span>
                                      </div>
                                    </td>
                                    {/* New Order Status Column */}
                                    <td className="p-4 text-center">
                                      {order && (
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "border",
                                            orderStatusMapData[order.orderStatus as keyof typeof orderStatusMapData]
                                              ?.color,
                                          )}
                                        >
                                          {
                                            orderStatusMapData[order.orderStatus as keyof typeof orderStatusMapData]
                                              ?.label
                                          }
                                        </Badge>
                                      )}
                                    </td>
                                    {/* New Payment Status Column */}
                                    <td className="p-4 text-center">
                                      {order && (
                                        <Badge
                                          variant="outline"
                                          className={cn(
                                            "border",
                                            paymentStatusMapData[
                                              order.paymentStatus as keyof typeof paymentStatusMapData
                                            ]?.color,
                                          )}
                                        >
                                          {
                                            paymentStatusMapData[
                                              order.paymentStatus as keyof typeof paymentStatusMapData
                                            ]?.label
                                          }
                                        </Badge>
                                      )}
                                    </td>
                                    {/* Payment Slips Button */}
                                    <td className="p-4 text-center">
                                      {doc.paymentSlips.length > 0 ? (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openGallery(doc.paymentSlips, `สลิปโอนเงิน - ${doc.orderId}`)}
                                          className="h-8 px-2 text-xs bg-transparent"
                                        >
                                          <Receipt className="h-3 w-3" />
                                          <span className="ml-1">{doc.paymentSlips.length}</span>
                                        </Button>
                                      ) : (
                                        <span className="text-muted-foreground text-sm">-</span>
                                      )}
                                    </td>
                                    {/* Delivery Photos Button */}
                                    <td className="p-4 text-center">
                                      {doc.deliveryPhotos.length > 0 ? (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openGallery(doc.deliveryPhotos, `รูปการจัดส่ง - ${doc.orderId}`)}
                                          className="h-8 px-2 text-xs bg-transparent"
                                        >
                                          <Camera className="h-3 w-3" />
                                          <span className="ml-1">{doc.deliveryPhotos.length}</span>
                                        </Button>
                                      ) : (
                                        <span className="text-muted-foreground text-sm">-</span>
                                      )}
                                    </td>
                                    {/* Actions Column */}
                                    <td className="p-4 text-center">
                                      <div className="flex justify-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleViewOrder(doc.orderId)}
                                          className="h-8 px-2 text-xs bg-transparent"
                                        >
                                          <Eye className="h-3 w-3 mr-1" />
                                      
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                            </React.Fragment>
                          )
                        })}
                        {/* No data message */}
                        {sortedDates.length === 0 && (
                          <tr>
                            <td colSpan={7} className="text-center py-8 text-muted-foreground">
                              ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )
              })()}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-6">
              {currentDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{doc.orderId}</CardTitle>
                        <p className="text-sm text-muted-foreground">{doc.customerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {format(parseISO(doc.date), "dd/MM/yyyy", { locale: th })}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order and Payment Status in Grid View */}
                    {(() => {
                      const order = ordersData.find((o) => o.id === doc.orderId)
                      return (
                        order && (
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "border",
                                orderStatusMapData[order.orderStatus as keyof typeof orderStatusMapData]?.color,
                              )}
                            >
                              {orderStatusMapData[order.orderStatus as keyof typeof orderStatusMapData]?.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "border",
                                paymentStatusMapData[order.paymentStatus as keyof typeof paymentStatusMapData]?.color,
                              )}
                            >
                              {paymentStatusMapData[order.paymentStatus as keyof typeof paymentStatusMapData]?.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                "border",
                                customerTypeMapData[order.customerType as keyof typeof customerTypeMapData]?.color,
                              )}
                            >
                              {order.customerType}
                            </Badge>
                          </div>
                        )
                      )
                    })()}

                    {/* Payment Slips */}
                    {doc.paymentSlips.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">สลิปโอนเงิน ({doc.paymentSlips.length})</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openGallery(doc.paymentSlips, `สลิปโอนเงิน - ${doc.orderId}`)}
                            className="h-7 px-2 text-xs bg-transparent"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            ดู
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {doc.paymentSlips.slice(0, 3).map((slip, index) => (
                            <div
                              key={slip.id}
                              className="aspect-square bg-blue-50 border-2 border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => {
                                setSelectedImages(doc.paymentSlips)
                                openImageViewer(index)
                              }}
                            >
                              <img
                                src={slip.url || "/placeholder.svg"}
                                alt={slip.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Delivery Photos */}
                    {doc.deliveryPhotos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">รูปการจัดส่ง ({doc.deliveryPhotos.length})</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openGallery(doc.deliveryPhotos, `รูปการจัดส่ง - ${doc.orderId}`)}
                            className="h-7 px-2 text-xs bg-transparent"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            ดู
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {doc.deliveryPhotos.slice(0, 3).map((photo, index) => (
                            <div
                              key={photo.id}
                              className="aspect-square bg-green-50 border-2 border-green-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => {
                                setSelectedImages(doc.deliveryPhotos)
                                openImageViewer(index)
                              }}
                            >
                              <img
                                src={photo.url || "/placeholder.svg"}
                                alt={photo.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {doc.paymentSlips.length === 0 && doc.deliveryPhotos.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">ไม่มีเอกสาร</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                หน้า {currentPage} จาก {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 px-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  ก่อนหน้า
                </Button>
                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 px-2"
                >
                  ถัดไป
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      {showOrderDetail && selectedOrder && (
        <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 rounded-3xl shadow-2xl">
            <DialogHeader>
              <DialogTitle>รายละเอียดคำสั่งซื้อ {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* ข้อมูลลูกค้า */}
              <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">ชื่อลูกค้า</Label>
                      <p className="text-sm">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">ประเภทลูกค้า</Label>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 border",
                          customerTypeMapData[selectedOrder.customerType as keyof typeof customerTypeMapData]?.color,
                        )}
                      >
                        {selectedOrder.customerType}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">ช่องทางการสั่งซื้อ</Label>
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                        {selectedOrder.channel}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">วิธีการจัดส่ง</Label>
                      <p className="text-sm">{selectedOrder.deliveryMethod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ข้อมูลคำสั่งซื้อ */}
              <Card className="border-0 shadow-sm rounded-2xl bg-gray-50 border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลคำสั่งซื้อ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">วันที่สั่งซื้อ</Label>
                      <p className="text-sm">
                        {format(new Date(selectedOrder.orderDate), "dd/MM/yyyy", { locale: th })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">วันที่ต้องการรับสินค้า</Label>
                      <p className="text-sm">
                        {format(new Date(selectedOrder.receiveDate), "dd/MM/yyyy", { locale: th })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">สถานะคำสั่งซื้อ</Label>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 border",
                          orderStatusMapData[selectedOrder.orderStatus as keyof typeof orderStatusMapData].color,
                        )}
                      >
                        {orderStatusMapData[selectedOrder.orderStatus as keyof typeof orderStatusMapData].label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">สถานะการชำระเงิน</Label>
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 border",
                          paymentStatusMapData[selectedOrder.paymentStatus as keyof typeof paymentStatusMapData].color,
                        )}
                      >
                        {paymentStatusMapData[selectedOrder.paymentStatus as keyof typeof paymentStatusMapData].label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ที่อยู่จัดส่ง */}
              <Card className="border-0 shadow-sm rounded-2xl bg-gray-50 ">
                <CardHeader>
                  <CardTitle className="text-lg">ที่อยู่จัดส่ง</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedOrder.shippingAddress}</p>
                </CardContent>
              </Card>

              {/* รายการสินค้า */}
              <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">รายการสินค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">ชื่อสินค้า</TableHead>
                          <TableHead className="text-center">จำนวน</TableHead>
                          <TableHead className="text-center">หน่วย</TableHead>
                          <TableHead className="text-center">ราคาต่อหน่วย</TableHead>
                          <TableHead className="text-center">ราคารวม</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">{item.name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-center">{item.unit}</TableCell>
                            <TableCell className="text-center">฿{item.price.toLocaleString()}</TableCell>
                            <TableCell className="text-center">฿{item.total.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        ยอดรวมทั้งสิ้น: ฿{selectedOrder.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* หมายเหตุ */}
              {selectedOrder.notes && (
                <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg">หมายเหตุ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* สถานะเอกสาร */}
              <Card className="border-0 shadow-sm rounded-2xl bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-lg">สถานะเอกสาร</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={selectedOrder.documents.packageLabel} disabled />
                      <Label className="text-sm">ใบปะหน้าพัสดุ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={selectedOrder.documents.packingList} disabled />
                      <Label className="text-sm">Packing List</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={selectedOrder.documents.pickList} disabled />
                      <Label className="text-sm">Pick List</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderDetail(false)}
                  className="border-0 shadow-sm rounded-2xl hover:shadow-md bg-transparent"
                >
                  ปิด
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Gallery Viewer */}
      {isGalleryOpen && (
        <GalleryViewer
          images={selectedImages}
          title={galleryTitle}
          onClose={closeGallery}
          onImageClick={openImageViewer}
        />
      )}

      {/* Image Viewer */}
      {isImageViewerOpen && (
        <ImageViewer
          images={selectedImages}
          currentIndex={currentImageIndex}
          onClose={closeImageViewer}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  )
}

export { DocumentsPage }
