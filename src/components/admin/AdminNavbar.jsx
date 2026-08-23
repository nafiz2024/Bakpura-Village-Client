import { Bell, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { organizationName } from '../../constants/navigation'
import LogoPlaceholder from '../common/LogoPlaceholder'

export default function AdminNavbar({ onMenuToggle }) {
  return <header className="admin-navbar"><button className="admin-menu-toggle" type="button" onClick={onMenuToggle} aria-label="সাইডবার খুলুন"><Menu/></button><div className="admin-brand"><LogoPlaceholder compact/><span><strong>{organizationName}</strong><small>Admin Panel</small></span></div><label className="admin-search"><Search size={18}/><span className="sr-only">অনুসন্ধান</span><input type="search" placeholder="অনুসন্ধান" disabled/></label><div className="admin-navbar-actions"><Link to="/">View Website</Link><button type="button" aria-label="নোটিফিকেশন" disabled><Bell/></button><span className="admin-profile"><span className="avatar" aria-hidden="true">—</span><span>Admin তথ্য লোড হবে</span></span></div></header>
}
