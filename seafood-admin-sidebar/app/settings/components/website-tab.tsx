"use client"

import * as React from "react"
import { Globe, Save, ImageIcon, Youtube, Truck, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function WebsiteTab() {
  const [websiteData, setWebsiteData] = React.useState({
    logo: "",
    headerPicture: "",
    headerText: `ยินดีต้อนรับสู่ ซีฟู้ด เฟรช

อาหารทะเลสดใหม่ คุณภาพพรีเมียม
ส่งตรงจากทะเลสู่โต๊ะอาหารของคุณ

ดูวิดีโอแนะนำสินค้าของเรา: https://youtube.com/watch?v=example`,
    headerYoutubeLink: "https://youtube.com/watch?v=example",
    shippingInfo: `ค่าจัดส่ง

🚚 ส่งฟรี! เมื่อสั่งซื้อครบ 1,000 บาท (ในเขตกรุงเทพฯ และปริมณฑล)
📦 ค่าจัดส่งปกติ 50 บาท (ในเขตกรุงเทพฯ และปริมณฑล)
🌍 ส่งต่างจังหวัด เริ่มต้น 100 บาท

⏰ เวลาจัดส่ง
- สั่งก่อน 14:00 น. ส่งในวันเดียวกัน
- สั่งหลัง 14:00 น. ส่งในวันถัดไป

📞 ติดต่อสอบถาม: 02-234-5678`,
    footerText: `บริษัท ซีฟู้ด เฟรช จำกัด
123/45 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500

📞 โทร: 02-234-5678
📧 อีเมล: info@seafoodfresh.com
🌐 เว็บไซต์: www.seafoodfresh.com
📱 LINE: @seafoodfresh

เวลาทำการ: จันทร์-อาทิตย์ 08:00-20:00

ติดตามเราได้ที่:
Facebook: SeafoodFresh
Instagram: @seafoodfresh
TikTok: @seafoodfresh`,
    footerImage: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    if (file) {
      setWebsiteData((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(file),
      }))
    }
  }

  const handleSave = () => {
    console.log("Saving website settings:", websiteData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ตั้งค่าเว็บไซต์</h2>
        <p className="text-muted-foreground">จัดการเนื้อหาและรูปภาพสำหรับเว็บไซต์</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            โลโก้ร้านค้า
          </CardTitle>
          <CardDescription>อัปโหลดโลโก้ร้านของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="logo-upload">อัปโหลดโลโก้</Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload("logo", e.target.files?.[0] || null)}
              className="mb-2"
            />
            {websiteData.logo && (
              <div className="mt-2">
                <img
                  src={websiteData.logo}
                  alt="Store Logo Preview"
                  className="max-w-[150px] h-auto object-contain rounded-md border shadow"
                />
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              แนะนำขนาดโลโก้ 500x500 พิกเซล (รูปแบบ PNG พื้นหลังโปร่งใส)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            ส่วนหัวเว็บไซต์ (Header)
          </CardTitle>
          <CardDescription>จัดการรูปภาพและเนื้อหาส่วนหัวของเว็บไซต์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="header-picture">รูปภาพหัวเว็บ (Header Picture)</Label>
            <Input
              id="header-picture"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload("headerPicture", e.target.files?.[0] || null)}
              className="mb-2"
            />
            {websiteData.headerPicture && (
              <div className="mt-2">
                <img
                  src={websiteData.headerPicture}
                  alt="Header Preview"
                  className="max-w-xs h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              แนะนำขนาด 1920x600 พิกเซล (รูปแบบ JPG, PNG)
            </p>
          </div>
          <div>
            <Label htmlFor="header-text">เนื้อหาส่วนหัว (Header Text)</Label>
            <Textarea
              id="header-text"
              value={websiteData.headerText}
              onChange={(e) => handleInputChange("headerText", e.target.value)}
              placeholder="เนื้อหาที่จะแสดงในส่วนหัวของเว็บไซต์"
              rows={6}
            />
            <p className="text-sm text-muted-foreground mt-1">
              สามารถใส่รูปภาพและลิงก์ YouTube ได้
            </p>
          </div>
          <div>
            <Label htmlFor="youtube-link" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              ลิงก์ YouTube
            </Label>
            <Input
              id="youtube-link"
              type="url"
              value={websiteData.headerYoutubeLink}
              onChange={(e) => handleInputChange("headerYoutubeLink", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
            <p className="text-sm text-muted-foreground mt-1">
              ลิงก์วิดีโอ YouTube ที่จะแสดงในส่วนหัว
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            ข้อมูลค่าจัดส่ง
          </CardTitle>
          <CardDescription>ข้อมูลค่าจัดส่งที่จะแสดงในเว็บไซต์</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="shipping-info">ข้อมูลค่าจัดส่ง</Label>
            <Textarea
              id="shipping-info"
              value={websiteData.shippingInfo}
              onChange={(e) => handleInputChange("shippingInfo", e.target.value)}
              placeholder="ข้อมูลค่าจัดส่งและเงื่อนไข"
              rows={10}
            />
            <p className="text-sm text-muted-foreground mt-1">
              ข้อมูลค่าจัดส่ง เงื่อนไข และรายละเอียดการจัดส่ง
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            ส่วนท้ายเว็บไซต์ (Footer)
          </CardTitle>
          <CardDescription>จัดการเนื้อหาและรูปภาพส่วนท้ายของเว็บไซต์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="footer-text">เนื้อหาส่วนท้าย (Footer Text)</Label>
            <Textarea
              id="footer-text"
              value={websiteData.footerText}
              onChange={(e) => handleInputChange("footerText", e.target.value)}
              placeholder="ข้อมูลติดต่อ ที่อยู่ และข้อมูลบริษัท"
              rows={12}
            />
            <p className="text-sm text-muted-foreground mt-1">
              ข้อมูลติดต่อ ที่อยู่ เวลาทำการ และช่องทางการติดต่อ
            </p>
          </div>
          <div>
            <Label htmlFor="footer-image">รูปภาพส่วนท้าย</Label>
            <Input
              id="footer-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload("footerImage", e.target.files?.[0] || null)}
              className="mb-2"
            />
            {websiteData.footerImage && (
              <div className="mt-2">
                <img
                  src={websiteData.footerImage}
                  alt="Footer Preview"
                  className="max-w-xs h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              รูปภาพเพิ่มเติมสำหรับส่วนท้าย เช่น โลโก้ หรือรูปภาพประกอบ
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ตัวอย่างการแสดงผล</CardTitle>
          <CardDescription>ตัวอย่างเนื้อหาที่จะแสดงในเว็บไซต์</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Header Preview:</h3>
            <div className="whitespace-pre-wrap text-sm">{websiteData.headerText}</div>
            {websiteData.headerYoutubeLink && (
              <div className="mt-2">
                <a
                  href={websiteData.headerYoutubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  🎥 ดูวิดีโอ
                </a>
              </div>
            )}
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Shipping Info Preview:</h3>
            <div className="whitespace-pre-wrap text-sm">{websiteData.shippingInfo}</div>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Footer Preview:</h3>
            <div className="whitespace-pre-wrap text-sm">{websiteData.footerText}</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  )
}
