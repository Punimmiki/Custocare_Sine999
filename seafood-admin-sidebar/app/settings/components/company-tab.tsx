"use client"

import * as React from "react"
import { Building, Save, Clock, Globe, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CompanyTab() {
  const [companyData, setCompanyData] = React.useState({
    companyName: "บริษัท ซีฟู้ด เฟรช จำกัด",
    registrationNumber: "0105563123456",
    address: "123/45 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500",
    phone: "02-234-5678",
    openingHours: "08:00 - 20:00",
    closingDays: "ไม่มีวันหยุด",
    website: "https://www.seafoodfresh.com",
    lineId: "@seafoodfresh",
    email: "info@seafoodfresh.com",
    fax: "02-234-5679",
    taxId: "0105563123456",
  })

  const handleInputChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Save company settings logic here
    console.log("Saving company settings:", companyData)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">ตั้งค่าบริษัท</h2>
        <p className="text-muted-foreground">จัดการข้อมูลบริษัทและการติดต่อ</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            ข้อมูลบริษัท
          </CardTitle>
          <CardDescription>ข้อมูลพื้นฐานของบริษัท</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="company-name">ชื่อบริษัท *</Label>
              <Input
                id="company-name"
                value={companyData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="กรอกชื่อบริษัท"
              />
            </div>
            <div>
              <Label htmlFor="registration-number">เลขทะเบียนนิติบุคคล *</Label>
              <Input
                id="registration-number"
                value={companyData.registrationNumber}
                onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                placeholder="0105563123456"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">ที่อยู่ *</Label>
            <Textarea
              id="address"
              value={companyData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="ที่อยู่ของบริษัท"
              rows={3}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="02-xxx-xxxx"
              />
            </div>
            <div>
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="info@company.com"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="fax">แฟกซ์</Label>
              <Input
                id="fax"
                value={companyData.fax}
                onChange={(e) => handleInputChange("fax", e.target.value)}
                placeholder="02-xxx-xxxx"
              />
            </div>
            <div>
              <Label htmlFor="tax-id">เลขประจำตัวผู้เสียภาษี</Label>
              <Input
                id="tax-id"
                value={companyData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                placeholder="0105563123456"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            เวลาทำการ
          </CardTitle>
          <CardDescription>กำหนดเวลาเปิด-ปิดร้าน</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="opening-hours">เวลาเปิด-ปิดร้าน *</Label>
              <Input
                id="opening-hours"
                value={companyData.openingHours}
                onChange={(e) => handleInputChange("openingHours", e.target.value)}
                placeholder="08:00 - 20:00"
              />
            </div>
            <div>
              <Label htmlFor="closing-days">วันหยุด</Label>
              <Input
                id="closing-days"
                value={companyData.closingDays}
                onChange={(e) => handleInputChange("closingDays", e.target.value)}
                placeholder="วันอาทิตย์"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            ช่องทางออนไลน์
          </CardTitle>
          <CardDescription>ข้อมูลการติดต่อออนไลน์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website">เว็บไซต์</Label>
            <Input
              id="website"
              type="url"
              value={companyData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://www.company.com"
            />
          </div>
          <div>
            <Label htmlFor="line-id" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              LINE ID
            </Label>
            <Input
              id="line-id"
              value={companyData.lineId}
              onChange={(e) => handleInputChange("lineId", e.target.value)}
              placeholder="@company"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  )
}
