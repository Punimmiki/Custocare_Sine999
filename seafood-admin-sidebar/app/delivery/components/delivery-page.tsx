"use client"

import * as React from "react"
import { useState, useEffect } from "react" // Import useState and useEffect for the useMobile logic
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { th } from "date-fns/locale" // Import Thai locale for date-fns
import {
  Truck,
  Plus,
  Search,
  Phone,
  User,
  Printer,
  Eye,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample delivery data
const initialDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customerName: "นายสมชาย ใจดี",
    customerAddress: "123 ถนนสุขุมทุม แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110",
    driverName: "นายสมศักดิ์ ขับรถ",
    vehiclePlate: "กข-1234",
    vehicleType: "รถกระบะ",
    serviceProvider: "Kerry Express",
    driverPhone: "081-111-2222",
    status: "preparing",
    deliveryDate: "2024-07-27",
    notes: "ส่งก่อน 14:00 น.",
    items: [
      { name: "ปลาทูน่าสด", quantity: 5, unit: "กิโลกรัม", price: 250, total: 1250 },
      { name: "กุ้งขาว", quantity: 2, unit: "กิโลกรัม", price: 400, total: 800 },
      { name: "หอยแมลงภู่", quantity: 3, unit: "กิโลกรัม", price: 180, total: 540 },
    ],
    images: ["/placeholder.svg?height=80&width=80&text=Image+1", "/placeholder.svg?height=80&width=80&text=Image+2"],
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customerName: "บริษัท อาหารทะเล จำกัด",
    customerAddress: "456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    driverName: "นายประยุทธ์ ส่งของ",
    vehiclePlate: "คง-5678",
    vehicleType: "รถตู้",
    serviceProvider: "Flash Express",
    driverPhone: "089-333-4444",
    status: "shipped",
    deliveryDate: "2024-07-28",
    notes: "ติดต่อล่วงหน้า 30 นาที",
    items: [
      { name: "ปลาแซลมอนสด", quantity: 10, unit: "กิโลกรัม", price: 450, total: 4500 },
      { name: "ปูม้า", quantity: 4, unit: "ตัว", price: 300, total: 1200 },
      { name: "หอยเชลล์", quantity: 2, unit: "กิโลกรัม", price: 220, total: 440 },
    ],
    images: ["/placeholder.svg?height=80&width=80&text=Image+A"],
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customerName: "นางสาวมาลี สวยงาม",
    customerAddress: "789 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    driverName: "นายวิชัย จัดส่ง",
    vehiclePlate: "จฉ-9012",
    vehicleType: "รถกระบะ",
    serviceProvider: "ไปรษณีย์ไทย",
    driverPhone: "082-555-6666",
    status: "delivered",
    deliveryDate: "2024-07-26",
    notes: "",
    items: [
      { name: "ปลาทับทิมแดง", quantity: 3, unit: "กิโลกรัม", price: 320, total: 960 },
      { name: "กุ้งแชบ๊วย", quantity: 1, unit: "กิโลกรัม", price: 500, total: 500 },
    ],
    images: [],
  },
]

const statusMap = {
  preparing: {
    label: "รอแพ็ค",
    className: "bg-yellow-100 text-yellow-600 border-yellow-200",
  },
  shipped: {
    label: "รอส่ง",
    className: "bg-blue-100 text-blue-600 border-blue-200",
  },
  delivered: {
    label: "จัดส่งแล้ว",
    className: "bg-green-100 text-green-600 border-green-200",
  },
}

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = React.useState(initialDeliveries)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [vehicleTypeFilter, setVehicleTypeFilter] = React.useState("all")
  const [serviceProviderFilter, setServiceProviderFilter] = React.useState("all")
  const [deliveryDateFilter, setDeliveryDateFilter] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)
  const { toast } = useToast()

  // useMobile hook logic integrated directly
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize) // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize)
    } // Clean up event listener on unmount
  }, [])

  // State for managing images in the dialog
  const [dialogImages, setDialogImages] = React.useState<string[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // In a real application, you would upload this file to a server
      // and get a URL back. For this demo, we'll use a placeholder.
      const newImage = `/placeholder.svg?height=80&width=80&text=New+Image+${dialogImages.length + 1}`
      setDialogImages((prevImages) => [...prevImages, newImage])
      toast({
        title: "อัปโหลดรูปภาพสำเร็จ",
        description: "รูปภาพถูกเพิ่มเข้าสู่รายการแล้ว (จำลอง)",
      })
      // Clear the input so the same file can be selected again if needed
      event.target.value = ""
    }
  }

  // Print functions
  const generatePrintContent = (delivery: any, type: "shippingLabel" | "packingList" | "pickList") => {
    const subtotal = delivery.items?.reduce((sum: number, item: any) => sum + item.total, 0) || 0
    const vat = subtotal * 0.07 // VAT 7%
    const grandTotal = subtotal + vat

    let title = ""
    let content = ""

    switch (type) {
      case "shippingLabel":
        title = "ใบปะหน้าพัสดุ"
        content = `
          <div style="font-family: Arial, sans-serif; padding: 10px; max-width: 600px; border: 1px solid #000; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 10px;">
              <h2 style="margin: 0; font-size: 24px;">ใบส่งพัสดุ</h2>
            </div>
            <div style="display: flex; border-top: 1px solid #000; border-bottom: 1px solid #000;">
              <div style="flex: 1; padding: 10px; border-right: 1px solid #000;">
                <h3 style="margin: 0 0 5px 0; font-size: 16px;">ผู้ส่ง (Sender)</h3>
                <p style="margin: 0; font-size: 14px;"><strong>ชื่อ:</strong> ชื่อบริษัท (กรุณาตั้งค่าใน Settings)</p>
                <p style="margin: 0; font-size: 14px;"><strong>โทร:</strong> เบอร์โทรบริษัท (กรุณาตั้งค่าใน Settings)</p>
                <p style="margin: 0; font-size: 14px;"><strong>ที่อยู่:</strong> ที่อยู่บริษัท (กรุณาตั้งค่าใน Settings)</p>
              </div>
              <div style="flex: 1; padding: 10px;">
                <h3 style="margin: 0 0 5px 0; font-size: 16px;">ผู้รับ (Receiver)</h3>
                <p style="margin: 0; font-size: 14px;"><strong>ชื่อ:</strong> ${delivery.customerName}</p>
                <p style="margin: 0; font-size: 14px;"><strong>โทร:</strong> ${delivery.driverPhone || "N/A"}</p>
                <p style="margin: 0; font-size: 14px;"><strong>ที่อยู่:</strong> ${delivery.customerAddress}</p>
              </div>
            </div>
            <div style="padding: 10px; border-bottom: 1px solid #000;">
              <p style="margin: 0; font-size: 14px;"><strong>เลขที่ใบส่งสินค้า:</strong> ${delivery.orderId}</p>
              <p style="margin: 0; font-size: 14px;"><strong>วันที่ส่งสินค้า:</strong> ${format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}</p>
            </div>
            <div style="padding: 10px; border-bottom: 1px solid #000;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #000; padding: 5px; font-size: 14px;">ลำดับ</th>
                    <th style="border: 1px solid #000; padding: 5px; font-size: 14px;">รายการ</th>
                    <th style="border: 1px solid #000; padding: 5px; font-size: 14px;">จำนวน</th>
                    <th style="border: 1px solid #000; padding: 5px; font-size: 14px;">หน่วย</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    delivery.items
                      ?.map(
                        (item: any, index: number) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center; font-size: 14px;">${index + 1}</td>
                    <td style="border: 1px solid #000; padding: 5px; font-size: 14px;">${item.name}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center; font-size: 14px;">${item.quantity}</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: center; font-size: 14px;">${item.unit}</td>
                  </tr>
                  `,
                      )
                      .join("") ||
                    '<tr><td colspan="4" style="border: 1px solid #000; padding: 5px; text-align: center; font-size: 14px;">ไม่มีรายการสินค้า</td></tr>'
                  }
                </tbody>
              </table>
            </div>
            <div style="padding: 10px; display: flex; justify-content: space-between; font-size: 14px; border-bottom: 1px solid #000;">
              <span><strong>ประเภทการส่ง:</strong> ${delivery.serviceProvider || "ไม่ระบุ"}</span>
              <span><strong>หมายเหตุ:</strong> ${delivery.notes || "ไม่มี"}</span>
            </div>
            <div style="text-align: center; padding: 10px;">
              <p style="margin: 0; font-size: 14px;">[บาร์โค้ด / QR Code]</p>
              <img src="https://barcode.tec-it.com/barcode.ashx?data=${delivery.id}&code=Code128&dpi=96" alt="Barcode" style="width: 80%; max-width: 300px; height: auto; margin-top: 5px;">
              <p style="font-size: 16px; font-weight: bold; margin-top: 5px;">${delivery.id}</p>
            </div>
          </div>
`
        break
      case "packingList":
        title = "ใบจัดสินค้า/ใบส่งของ"
        content = `
          <div style="font-family: Arial, sans-serif; padding: 10px; max-width: 800px; border: 1px solid #000; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <div style="text-align: center; flex-grow: 1;">
                <h2 style="margin: 0; font-size: 24px;">${title}</h2>
                <p style="margin: 0; font-size: 14px; color: #666;">SHIPPING SLIP</p>
              </div>
              
            </div>

            <div style="padding: 10px; border-top: 1px solid #000; background-color: #f8f8f8;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px;">ข้อมูลผู้ส่ง (Sender)</h3>
              <p style="margin: 0; font-size: 14px;"><strong>ชื่อ:</strong> ชื่อบริษัท (กรุณาตั้งค่าใน Settings)</p>
              <p style="margin: 0; font-size: 14px;"><strong>โทร:</strong> เบอร์โทรบริษัท (กรุณาตั้งค่าใน Settings)</p>
              <p style="margin: 0; font-size: 14px;"><strong>ที่อยู่:</strong> ที่อยู่บริษัท (กรุณาตั้งค่าใน Settings)</p>
            </div>

            <div style="padding: 10px; border-top: 1px solid #000; background-color: #f8f8f8;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px;">ข้อมูลผู้รับ (Receiver)</h3>
              <p style="margin: 0; font-size: 14px;"><strong>ชื่อ:</strong> ${delivery.customerName}</p>
              <p style="margin: 0; font-size: 14px;"><strong>โทร:</strong> ${delivery.driverPhone || "N/A"}</p>
              <p style="margin: 0; font-size: 14px;"><strong>ที่อยู่:</strong> ${delivery.customerAddress}</p>
            </div>

            <div style="display: flex; border-top: 1px solid #000;">
              <div style="flex: 1; padding: 10px; border-right: 1px solid #000; background-color: #f8f9fa;">
                <p style="margin: 0; font-size: 14px;"><strong>เลขที่คำสั่งซื้อ</strong></p>
                <p style="margin: 0; font-size: 14px;">${delivery.orderId}</p>
              </div>
              <div style="flex: 1; padding: 10px; background-color: #f8f8f8;">
                <p style="margin: 0; font-size: 14px;"><strong>วันที่ส่งสินค้า</strong></p>
                <p style="margin: 0; font-size: 14px;">${format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}</p>
              </div>
            </div>

            <div style="padding: 10px; border-top: 1px solid #000;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px;">รายการสินค้า</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f0f0f0; font-size: 14px;">ลำดับ</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: left; background-color: #f0f0f0; font-size: 14px;">รายการสินค้า</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f0f0f0; font-size: 14px;">จำนวน</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f0f0f0; font-size: 14px;">หน่วย</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    delivery.items
                      ?.map(
                        (item: any, index: number) => `
                  <tr>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">${index + 1}</td>
                    <td style="border: 1px solid #000; padding: 8px; font-size: 14px;">${item.name}</td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">${item.quantity}</td>
                    <td style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">${item.unit}</td>
                  </tr>`,
                      )
                      .join("") ||
                    '<tr><td colspan="4" style="border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px;">ไม่มีรายการสินค้า</td></tr>'
                  }
                </tbody>
              </table>
            </div>

            <div style="display: flex; border-top: 1px solid #000;">
              <div style="flex: 1; padding: 10px; border-right: 1px solid #000; background-color: #f8f8f8;">
                <p style="margin: 0; font-size: 14px;"><strong>ประเภทการส่ง</strong></p>
                <p style="margin: 0; font-size: 14px;">${delivery.serviceProvider || "ไม่ระบุ"}</p>
              </div>
              <div style="flex: 1; padding: 10px; background-color: #f8f8f8;">
                <p style="margin: 0; font-size: 14px;"><strong>หมายเหตุ</strong></p>
                <p style="margin: 0; font-size: 14px;">${delivery.notes || "ไม่มี"}</p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
              <div style="width: 30%; border: 1px solid #000; padding: 10px; text-align: center; background-color: #f8f8f8;">
                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #000;">ผู้จัดสินค้า</p>
                <p style="margin: 0 0 15px 0; font-size: 14px;">Receiver</p>
                <p style="margin: 0; font-size: 14px;">ลงชื่อ / Signature</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 5px 0; height: 1px;"></div>
                <p style="margin: 0; font-size: 14px;">วันที่ / Date:</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 0 0; height: 1px;"></div>
              </div>
              <div style="width: 30%; border: 1px solid #000; padding: 10px; text-align: center; background-color: #f8f8f8;">
                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">ผู้ตรวจสอบ</p>
                <p style="margin: 0 0 15px 0; font-size: 14px;">Inspector</p>
                <p style="margin: 0; font-size: 14px;">ลงชื่อ / Signature</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 5px 0; height: 1px;"></div>
                <p style="margin: 0; font-size: 14px;">วันที่ / Date:</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 0 0; height: 1px;"></div>
              </div>
              <div style="width: 30%; border: 1px solid #000; padding: 10px; text-align: center; background-color: #f8f8f8;">
                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">ผู้จัดส่ง</p>
                <p style="margin: 0 0 15px 0; font-size: 14px;">Delivery Staff</p>
                <p style="margin: 0; font-size: 14px;">ลงชื่อ / Signature</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 5px 0; height: 1px;"></div>
                <p style="margin: 0; font-size: 14px;">วันที่ / Date:</p>
                <div style="border-bottom: 1px solid #000; margin: 5px 0 0 0; height: 1px;"></div>
              </div>
            </div>
          </div>
`
        break
      case "pickList":
        title = "Pick List"
        content = `
        <div style="font-family: Arial, sans-serif; padding: 10px; max-width: 800px; margin: 0 auto;">
          <h1 style="text-align: center; margin-bottom: 20px; font-size: 24px;">${title} สำหรับคำสั่งซื้อ: ${delivery.orderId}</h1>
          <p style="text-align: center; margin-bottom: 20px; font-size: 16px; color: #666;">รายการสินค้าสำหรับจัดเตรียม (ตัดแยกได้)</p>
          <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
            ${
              delivery.items
                ?.map(
                  (item: any) => `
              <div style="width: 200px; height: 150px; border: 1px solid #000; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; page-break-inside: avoid;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #333;">ลูกค้า: ${delivery.customerName}</p>
                <p style="margin: 10px 0 5px 0; font-size: 18px; font-weight: bold; color: #000;">${item.name}</p>
                <p style="margin: 0; font-size: 28px; font-weight: bold; color: #000;">${item.quantity} ${item.unit}</p>
              </div>`,
                )
                .join("") ||
              '<div style="text-align: center; padding: 20px; font-size: 16px; color: #666;">ไม่มีรายการสินค้าสำหรับจัดเตรียม</div>'
            }
          </div>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 15px;">
            พิมพ์เมื่อ: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: th })}
          </div>
        </div>`
        break
    }
    return content
  }

  const handlePrintDocument = (delivery: any, type: "shippingLabel" | "packingList" | "pickList") => {
    let docName = ""
    switch (type) {
      case "shippingLabel":
        docName = "ใบปะหน้าพัสดุ"
        break
      case "packingList":
        docName = "Packing List"
        break
      case "pickList":
        docName = "Pick List"
        break
    }
    toast({
      title: `กำลังพิมพ์${docName}`,
      description: `พิมพ์${docName} สำหรับ ${delivery.orderId} - ${delivery.customerName}`,
    })
    const printContent = generatePrintContent(delivery, type)
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const filteredDeliveries = React.useMemo(() => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
      const matchesVehicleType = vehicleTypeFilter === "all" || delivery.vehicleType === vehicleTypeFilter
      const matchesServiceProvider =
        serviceProviderFilter === "all" || delivery.serviceProvider === serviceProviderFilter

      let matchesDate = true
      if (deliveryDateFilter) {
        const deliveryDate = parseISO(delivery.deliveryDate)
        const filterDate = parseISO(deliveryDateFilter)
        matchesDate = format(deliveryDate, "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd")
      }

      return matchesSearch && matchesStatus && matchesVehicleType && matchesServiceProvider && matchesDate
    })
  }, [deliveries, searchTerm, statusFilter, vehicleTypeFilter, serviceProviderFilter, deliveryDateFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDeliveries = filteredDeliveries.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, vehicleTypeFilter, serviceProviderFilter, deliveryDateFilter])

  const totalDeliveries = deliveries.length
  const preparingCount = deliveries.filter((d) => d.status === "preparing").length
  const shippedCount = deliveries.filter((d) => d.status === "shipped").length
  const deliveredCount = deliveries.filter((d) => d.status === "delivered").length

  const allVehicleTypes = Array.from(new Set(initialDeliveries.map((d) => d.vehicleType)))
  const allServiceProviders = Array.from(new Set(initialDeliveries.map((d) => d.serviceProvider)))

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setVehicleTypeFilter("all")
    setServiceProviderFilter("all")
    setDeliveryDateFilter("")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">การจัดส่ง</h1>
          <p className="text-muted-foreground">จัดการการจัดส่งและติดตามสถานะ</p>
        </div>
        <Link href="/delivery/create">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มการจัดส่งใหม่
          </Button>
        </Link>
      </div>

      {/* Stats Cards (Clickable for filtering) */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors border-0 rounded-2xl",
            statusFilter === "all" && "border-primary",
          )}
          onClick={() => setStatusFilter("all")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">การจัดส่งทั้งหมด</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeliveries}</div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors border-0 rounded-2xl",
            statusFilter === "preparing" && "border-primary",
          )}
          onClick={() => setStatusFilter("preparing")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอแพ็ค</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{preparingCount}</div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors border-0 rounded-2xl",
            statusFilter === "shipped" && "border-primary",
          )}
          onClick={() => setStatusFilter("shipped")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{shippedCount}</div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "cursor-pointer hover:bg-muted/50 transition-colors border-0 rounded-2xl",
            statusFilter === "delivered" && "border-primary",
          )}
          onClick={() => setStatusFilter("delivered")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">จัดส่งแล้ว</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deliveredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          </div>
          <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto bg-transparent">
            ล้างตัวกรอง
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-full">
              <Label htmlFor="search">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ, ชื่อลูกค้า, คนขับ, หรือทะเบียนรถ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label>สถานะการจัดส่ง</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="preparing">รอแพ็ค</SelectItem>
                  <SelectItem value="shipped">รอส่ง</SelectItem>
                  <SelectItem value="delivered">จัดส่งแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ประเภทรถ</Label>
              <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภทรถ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allVehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ผู้ให้บริการ</Label>
              <Select value={serviceProviderFilter} onValueChange={setServiceProviderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกผู้ให้บริการ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allServiceProviders.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label>วันที่ส่ง</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deliveryDateFilter && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deliveryDateFilter
                      ? format(new Date(deliveryDateFilter), "dd/MM/yyyy", { locale: th })
                      : "เลือกวันที่ส่ง"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deliveryDateFilter ? new Date(deliveryDateFilter) : undefined}
                    onSelect={(date) => {
                      if (date) setDeliveryDateFilter(date.toISOString()) // หรือ format ให้เป็น 'yyyy-MM-dd'
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries List (Conditional Rendering) */}
      <Card className="overflow-hidden border-0 rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>รายการจัดส่ง</CardTitle>
              <CardDescription>
                แสดง {startIndex + 1}-{Math.min(endIndex, filteredDeliveries.length)} จาก {filteredDeliveries.length}{" "}
                รายการ (ทั้งหมด {totalDeliveries} รายการ)
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
        <CardContent className="p-0 overflow-hidden">
          {isMobile ? (
            // Mobile View: Cards
            <div className="grid gap-4 p-4">
              {currentDeliveries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">ไม่พบการจัดส่งที่ตรงกับเงื่อนไขการค้นหา</div>
              ) : (
                currentDeliveries.map((delivery) => (
                  <Card key={delivery.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{delivery.orderId}</span>
                        <Badge className={statusMap[delivery.status as keyof typeof statusMap]?.className}>
                          {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm">{delivery.customerName}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{delivery.driverName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{delivery.driverPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>{format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}</span>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <Dialog
                          onOpenChange={(open) => {
                            if (open) {
                              setDialogImages(delivery.images || [])
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                              <Eye className="h-3 w-3 mr-1" /> ดูรายละเอียด
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[90vw] sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-center">รายละเอียดการจัดส่ง</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              {/* Delivery Images */}
                              <div>
                                <h4 className="text-sm font-medium mb-2">รูปภาพการจัดส่ง</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {(dialogImages.length > 0 ? dialogImages : delivery.images || []).map(
                                    (imgSrc, index) => (
                                      <div
                                        key={index}
                                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                                      >
                                        <img
                                          src={imgSrc || "/placeholder.svg"}
                                          alt={`Delivery image ${index + 1}`}
                                          className="w-full h-full object-cover rounded-lg"
                                        />
                                      </div>
                                    ),
                                  )}
                                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                    <input
                                      type="file"
                                      ref={fileInputRef}
                                      onChange={handleFileChange}
                                      className="hidden"
                                      accept="image/*"
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="w-full h-full rounded-lg border-dashed flex flex-col items-center justify-center text-muted-foreground bg-transparent"
                                      onClick={handleImageUploadClick}
                                    >
                                      <Upload className="h-6 w-6" />
                                      <span className="text-xs mt-1">เพิ่มรูป</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              {/* Delivery Details */}
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">รหัส:</span>
                                  <span className="font-medium">{delivery.orderId}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ลูกค้า:</span>
                                  <span className="font-medium">{delivery.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">คนขับ:</span>
                                  <span className="font-medium">{delivery.driverName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">เบอร์โทร:</span>
                                  <span className="font-medium">{delivery.driverPhone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ทะเบียนรถ:</span>
                                  <span className="font-medium">{delivery.vehiclePlate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ประเภทรถ:</span>
                                  <span className="font-medium">{delivery.vehicleType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ผู้ให้บริการ:</span>
                                  <span className="font-medium">{delivery.serviceProvider}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">วันที่จัดส่ง:</span>
                                  <span className="font-medium">
                                    {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">สถานะ:</span>
                                  <Badge className={statusMap[delivery.status as keyof typeof statusMap]?.className}>
                                    {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                                  </Badge>
                                </div>
                                {delivery.notes && (
                                  <div className="pt-2 border-t">
                                    <span className="text-muted-foreground text-xs">หมายเหตุ:</span>
                                    <div className="mt-1 text-sm">{delivery.notes}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                              <Printer className="h-3 w-3 mr-1" /> พิมพ์
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>พิมพ์เอกสาร</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "shippingLabel")}>
                              ใบปะหน้าพัสดุ
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "packingList")}>
                              Packing List
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "pickList")}>
                              Pick List
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          ) : (
            // Desktop View: Table
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[80px] text-center">รหัส</TableHead>
                      <TableHead className="min-w-[120px] text-center">ลูกค้า</TableHead>
                      <TableHead className="min-w-[120px] text-center">คนขับ</TableHead>
                      <TableHead className="min-w-[100px] text-center">ทะเบียน</TableHead>
                      <TableHead className="min-w-[120px] text-center">เบอร์โทร</TableHead>
                      <TableHead className="min-w-[100px] text-center">ประเภทรถ</TableHead>
                      <TableHead className="min-w-[130px] text-center">ผู้ให้บริการ</TableHead>
                      <TableHead className="min-w-[120px] text-center">วันที่จัดส่ง</TableHead>
                      <TableHead className="min-w-[100px] text-center">สถานะ</TableHead>
                      <TableHead className="min-w-[140px] text-center">การดำเนินการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDeliveries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                          ไม่พบการจัดส่งที่ตรงกับเงื่อนไขการค้นหา
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                          <TableCell className="font-medium text-sm truncate text-center">{delivery.orderId}</TableCell>
                          <TableCell className="text-center">
                            <div>
                              <p className="font-medium text-sm truncate" title={delivery.customerName}>
                                {delivery.customerName}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <User className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm truncate" title={delivery.driverName}>
                                {delivery.driverName}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Truck className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm truncate">{delivery.vehiclePlate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm truncate">{delivery.driverPhone}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm truncate text-center" title={delivery.vehicleType}>
                            {delivery.vehicleType}
                          </TableCell>
                          <TableCell className="text-sm truncate text-center" title={delivery.serviceProvider}>
                            {delivery.serviceProvider}
                          </TableCell>
                          <TableCell className="text-sm text-center">
                            <div className="flex items-center justify-center gap-1">
                              <CalendarDays className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">
                                {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={statusMap[delivery.status as keyof typeof statusMap]?.className}>
                              {statusMap[delivery.status as keyof typeof statusMap]?.label || delivery.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1">
                              <Dialog
                                onOpenChange={(open) => {
                                  if (open) {
                                    setDialogImages(delivery.images || [])
                                  }
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                                    <Eye className="h-3 w-3 mr-1" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[90vw] sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle className="text-center">รายละเอียดการจัดส่ง</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {/* Delivery Images */}
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">รูปภาพการจัดส่ง</h4>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {(dialogImages.length > 0 ? dialogImages : delivery.images || []).map(
                                          (imgSrc, index) => (
                                            <div
                                              key={index}
                                              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                                            >
                                              <img
                                                src={imgSrc || "/placeholder.svg"}
                                                alt={`Delivery image ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                              />
                                            </div>
                                          ),
                                        )}
                                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                          <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                          />
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-full h-full rounded-lg border-dashed flex flex-col items-center justify-center text-muted-foreground bg-transparent"
                                            onClick={handleImageUploadClick}
                                          >
                                            <Upload className="h-6 w-6" />
                                            <span className="text-xs mt-1">เพิ่มรูป</span>
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Delivery Details */}
                                    <div className="space-y-3 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">รหัส:</span>
                                        <span className="font-medium">{delivery.orderId}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">ลูกค้า:</span>
                                        <span className="font-medium">{delivery.customerName}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">คนขับ:</span>
                                        <span className="font-medium">{delivery.driverName}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">เบอร์โทร:</span>
                                        <span className="font-medium">{delivery.driverPhone}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">ทะเบียนรถ:</span>
                                        <span className="font-medium">{delivery.vehiclePlate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">ประเภทรถ:</span>
                                        <span className="font-medium">{delivery.vehicleType}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">ผู้ให้บริการ:</span>
                                        <span className="font-medium">{delivery.serviceProvider}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">วันที่จัดส่ง:</span>
                                        <span className="font-medium">
                                          {format(parseISO(delivery.deliveryDate), "dd/MM/yyyy", { locale: th })}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">สถานะ:</span>
                                        <Badge
                                          className={statusMap[delivery.status as keyof typeof statusMap]?.className}
                                        >
                                          {statusMap[delivery.status as keyof typeof statusMap]?.label ||
                                            delivery.status}
                                        </Badge>
                                      </div>
                                      {delivery.notes && (
                                        <div className="pt-2 border-t">
                                          <span className="text-muted-foreground text-xs">หมายเหตุ:</span>
                                          <div className="mt-1 text-sm">{delivery.notes}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8 px-2 text-xs bg-transparent">
                                    <Printer className="h-3 w-3 mr-1" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>พิมพ์เอกสาร</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "shippingLabel")}>
                                    ใบปะหน้าพัสดุ
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "packingList")}>
                                    Packing List
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handlePrintDocument(delivery, "pickList")}>
                                    Pick List
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-6 pb-4 gap-4">
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
      </Card>
    </div>
  )
}

export { DeliveryPage }
export default DeliveryPage
