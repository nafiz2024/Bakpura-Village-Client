import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return <div className="admin-shell"><AdminNavbar onMenuToggle={() => setSidebarOpen(true)}/><AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/><main className="admin-main"><Outlet/></main></div>
}
