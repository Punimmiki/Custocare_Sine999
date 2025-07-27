"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import { th } from "date-fns/locale"
import { FileText, Search, Calendar, User, Receipt, Camera, Download, Filter, Grid3X3, List, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminLayout } from "@/components/admin-layout"
import { Badge } from "@/components/ui/badge"

// Sample documents data
const documentsData = [
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
              <Button variant="outline" size="sm" onClick={onPrev} disabled={currentIndex === 0}>
                ก่อนหน้า
              </Button>
              <Button variant="outline" size="sm" onClick={onNext} disabled={currentIndex === images.length - 1}>
                ถัดไป
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

const DocumentsPage = () => {
  const [documents, setDocuments] = React.useState(documentsData)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [dateFilter, setDateFilter] = React.useState("")
  const [documentTypeFilter, setDocumentTypeFilter] = React.useState("all")
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("table")
  const [selectedImages, setSelectedImages] = React.useState<
    Array<{ id: string; name: string; url: string; uploadedAt: string }>
  >([])
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = React.useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)
  const [galleryTitle, setGalleryTitle] = React.useState("")

  // Group documents by date
  const groupedDocuments = React.useMemo(() => {
    const filtered = documents.filter((doc) => {
      const matchesSearch =
        doc.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.customerName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDate = !dateFilter || doc.date === dateFilter

      const matchesType =
        documentTypeFilter === "all" ||
        (documentTypeFilter === "payment" && doc.paymentSlips.length > 0) ||
        (documentTypeFilter === "delivery" && doc.deliveryPhotos.length > 0)

      return matchesSearch && matchesDate && matchesType
    })

    // Group by date
    const grouped = filtered.reduce(
      (acc, doc) => {
        const date = doc.date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(doc)
        return acc
      },
      {} as Record<string, typeof filtered>,
    )

    // Sort dates in descending order
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    return sortedDates.map((date) => ({
      date,
      documents: grouped[date],
    }))
  }, [documents, searchTerm, dateFilter, documentTypeFilter])

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
    setDateFilter("")
    setDocumentTypeFilter("all")
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
        <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-48"
              />
            </div>
            <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-40" />
            <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="payment">สลิป</SelectItem>
                <SelectItem value="delivery">รูป</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || dateFilter || documentTypeFilter !== "all") && (
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                ล้าง
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Documents List */}
      {viewMode === "table" ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">วันที่</th>
                    <th className="text-left p-4 font-medium">รหัสคำสั่งซื้อ</th>
                    <th className="text-left p-4 font-medium">ลูกค้า</th>
                    <th className="text-center p-4 font-medium">สลิปโอนเงิน</th>
                    <th className="text-center p-4 font-medium">รูปการจัดส่ง</th>
                    <th className="text-center p-4 font-medium">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา
                      </td>
                    </tr>
                  ) : (
                    groupedDocuments.flatMap(({ date, documents: docsInDate }) =>
                      docsInDate.map((doc, index) => (
                        <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            {index === 0 && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {format(parseISO(date), "dd/MM/yyyy", { locale: th })}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{doc.orderId}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{doc.customerName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {doc.paymentSlips.length > 0 ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <Receipt className="h-3 w-3 mr-1" />
                                {doc.paymentSlips.length} รูป
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {doc.deliveryPhotos.length > 0 ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Camera className="h-3 w-3 mr-1" />
                                {doc.deliveryPhotos.length} รูป
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              {doc.paymentSlips.length > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openGallery(doc.paymentSlips, `สลิปโอนเงิน - ${doc.orderId}`)}
                                  className="h-8 px-2 text-xs"
                                >
                                  <Receipt className="h-3 w-3 mr-1" />
                                  ดูสลิป
                                </Button>
                              )}
                              {doc.deliveryPhotos.length > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openGallery(doc.deliveryPhotos, `รูปการจัดส่ง - ${doc.orderId}`)}
                                  className="h-8 px-2 text-xs"
                                >
                                  <Camera className="h-3 w-3 mr-1" />
                                  ดูรูป
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )),
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groupedDocuments.flatMap(({ date, documents: docsInDate }) =>
            docsInDate.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{doc.orderId}</CardTitle>
                      <p className="text-sm text-muted-foreground">{doc.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{format(parseISO(doc.date), "dd/MM/yyyy", { locale: th })}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                          className="h-7 px-2 text-xs"
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
                          className="h-7 px-2 text-xs"
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
            )),
          )}
        </div>
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

export default function Documents() {
  return (
    <AdminLayout>
      <DocumentsPage />
    </AdminLayout>
  )
}
