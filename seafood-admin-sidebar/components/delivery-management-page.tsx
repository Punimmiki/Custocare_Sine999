"use client"

import { useState } from "react"

// Mock data for deliveries
const deliveriesData = [
  {
    id: "DEL-001",
    orderId: "ORD-2024-001",
    customerName: "นายสมชาย ใจดี",
    customerPhone: "081-234-5678",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    driver: "นายสมศักดิ์ ขับรถ",
    driverPhone: "089-123-4567",
    vehicle: "รถกระบะ ABC-1234",
    scheduledDate: "2024-01-16",
    scheduledTime: "09:00",
    status: "scheduled",
    priority: "normal",
    distance: "12.5",
    estimatedTime: "45",
    items: [
      { name: "กุ้งแม่น้ำ", quantity: 2, unit: "กก." },
      { name: "ปลาทูน่า", quantity: 1, unit: "กก." },
    ],
    notes: "ส่งก่อน 10:00 น.",
    createdAt: "2024-01-15",
  },
  {
    id: "DEL-002",
    orderId: "ORD-2024-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerPhone: "02-123-4567",
    address: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    driver: "นายประยุทธ์ ส่งของ",
    driverPhone: "088-987-6543",
    vehicle: "รถบรรทุก XYZ-5678",
    scheduledDate: "2024-01-16",
    scheduledTime: "14:00",
    status: "in_transit",
    priority: "high",
    distance: "8.2",
    estimatedTime: "30",
    items: [
      { name: "หอยแมลงภู่", quantity: 5, unit: "กก." },
      { name: "ปูม้า", quantity: 3, unit: "ตัว" },
    ],
    notes: "ลูกค้าประจำ ให้ส่วนลด 5%",
    createdAt: "2024-01-15",
  },
  {
    id: "DEL-003",
    orderId: "ORD-2024-003",
    customerName: "ร้านอาหาร สมุทรสาคร",
    customerPhone: "034-567-890",
    address: "789 ถนนเจ้าฟ้า ตำบลปากน้ำ อำเภอเมือง สมุทรปราการ 10270",
    driver: "นายวิชัย ขนส่ง",
    driverPhone: "087-555-1234",
    vehicle: "รถตู้ DEF-9012",
    scheduledDate: "2024-01-15",
    scheduledTime: "16:00",
    status: "delivered",
    priority: "normal",
    distance: "25.8",
    estimatedTime: "60",
    items: [
      { name: "ปลาแซลมอน", quantity: 2, unit: "กก." },
      { name: "กุ้งขาว", quantity: 3, unit: "กก." },
    ],
    notes: "",
    createdAt: "2024-01-14",
  },
  {
    id: "DEL-004",
    orderId: "ORD-2024-004",
    customerName: "นางสาวมาลี สวยงาม",
    customerPhone: "089-876-5432",
    address: "321 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310",
    driver: "นายสมชาย ขับรถ",
    driverPhone: "086-777-8888",
    vehicle: "มอเตอร์ไซค์ GHI-3456",
    scheduledDate: "2024-01-16",
    scheduledTime: "11:00",
    status: "cancelled",
    priority: "low",
    distance: "15.3",
    estimatedTime: "40",
    items: [{ name: "หอยเชลล์", quantity: 1, unit: "กก." }],
    notes: "ลูกค้ายกเลิก",
    createdAt: "2024-01-13",
  },
  {
    id: "DEL-005",
    orderId: "ORD-2024-005",
    customerName: "โรงแรม สีฟ้า",
    customerPhone: "076-111-2222",
    address: "654 ถนนชายหาด ตำบลป่าตอง อำเภอกะทู้ ภูเก็ต 83150",
    driver: "นายอนุชา ไกลบ้าน",
    driverPhone: "084-222-3333",
    vehicle: "รถบรรทุก JKL-7890",
    scheduledDate: "2024-01-17",
    scheduledTime: "08:00",
    status: "scheduled",
    priority: "high",
    distance: "45.2",
    estimatedTime: "90",
    items: [
      { name: "ปลาหมึกกล้วย", quantity: 4, unit: "กก." },
      { name: "กุ้งแม่น้ำ", quantity: 1, unit: "กก." },
    ],
    notes: "ส่งไปภูเก็ต ต้องใช้น้ำแข็ง",
    createdAt: "2024-01-12",
  },
]

interface Delivery {
  id: string
  orderId: string
  customerName: string
  customerPhone: string
  address: string
  driver: string
  driverPhone: string
  vehicle: string
  scheduledDate: string
  scheduledTime: string
  status: "scheduled" | "in_transit" | "delivered" | "cancelled"
  priority: "low" | "normal" | "high"
  distance: string
  estimatedTime: string
  items: Array<{
    name: string
    quantity: number
    unit: string
  }>
  notes: string
  createdAt: string
}

export function DeliveryManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false)
  const [showCreateDelivery, setShowCreateDelivery] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

//
}