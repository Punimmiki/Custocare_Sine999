// import { AppSidebar } from "./components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Separator } from "@/components/ui/separator"
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { Bell, Search, User } from "lucide-react"
// import { CreateOrderPage } from "./components/create-order-page"

// export default function AdminLayout() {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">หน้าหลัก</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/orders">คำสั่งซื้อ</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>สร้างคำสั่งซื้อใหม่</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//           <div className="ml-auto flex items-center gap-2 px-4">
//             <Button variant="ghost" size="icon">
//               <Search className="h-4 w-4" />
//               <span className="sr-only">Search</span>
//             </Button>
//             <Button variant="ghost" size="icon">
//               <Bell className="h-4 w-4" />
//               <span className="sr-only">Notifications</span>
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <User className="h-4 w-4" />
//                   <span className="sr-only">User menu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>โปรไฟล์</DropdownMenuItem>
//                 <DropdownMenuItem>ตั้งค่า</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>ออกจากระบบ</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
//           <CreateOrderPage />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
