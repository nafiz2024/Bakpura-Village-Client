import { ChevronDown, LogOut, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { adminNavigation } from '../../constants/navigation'

export default function AdminSidebar({ open, onClose }) {
  return <><button className={`sidebar-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-label="সাইডবার বন্ধ করুন"/><aside className={`admin-sidebar ${open ? 'is-open' : ''}`} aria-label="অ্যাডমিন নেভিগেশন"><div className="sidebar-mobile-title"><strong>মেনু</strong><button type="button" onClick={onClose} aria-label="সাইডবার বন্ধ করুন"><X/></button></div><nav>{adminNavigation.map((item) => item.children ? <details key={item.label} open><summary><item.icon size={19}/><span>{item.label}</span><ChevronDown className="chevron" size={16}/></summary><div className="submenu">{item.children.map((child) => <NavLink key={child.to} to={child.to} onClick={onClose}>{child.label}</NavLink>)}</div></details> : <NavLink key={item.to} to={item.to} onClick={onClose}><item.icon size={19}/><span>{item.label}</span></NavLink>)}</nav><button className="logout-placeholder" type="button" disabled title="লগআউট পরবর্তী ধাপে যুক্ত হবে"><LogOut size={19}/> Logout</button></aside></>
}
