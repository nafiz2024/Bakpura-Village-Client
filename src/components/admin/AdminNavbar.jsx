import { Bell, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { organizationName } from '../../constants/navigation'
import { useAuth } from '../../context/auth-context'
import LogoPlaceholder from '../common/LogoPlaceholder'

export default function AdminNavbar({onMenuToggle}){const {admin}=useAuth();return <header className="admin-navbar"><button className="admin-menu-toggle" type="button" onClick={onMenuToggle} aria-label="সাইডবার খুলুন"><Menu/></button><div className="admin-brand"><LogoPlaceholder compact/><span><strong>{organizationName}</strong><small>Admin Panel</small></span></div><label className="admin-search"><Search size={18}/><span className="sr-only">অনুসন্ধান</span><input type="search" placeholder="অনুসন্ধান" disabled/></label><div className="admin-navbar-actions"><Link to="/">ওয়েবসাইট দেখুন</Link><button type="button" aria-label="নোটিফিকেশন" disabled><Bell/></button><span className="admin-profile"><span className="avatar" aria-hidden="true">{admin?.fullName?.trim()?.[0]||'—'}</span><span><strong>{admin?.fullName||admin?.username||'Admin'}</strong><small>{admin?.role||''}</small></span></span></div></header>}
