import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { organizationName, publicNavigation } from '../../constants/navigation'
import { DEFAULT_BRANDING, getBrandLogo } from '../../constants/branding'
import { homeService, payload } from '../../services/homeService'
import ImageWithFallback from '../common/ImageWithFallback'

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState({})
  useEffect(() => { let active = true; homeService.settings().then(value => { if (active) setSettings(payload(value) || {}) }).catch(() => {}); return () => { active = false } }, [])
  useEffect(() => { if (!open) return; const close = (event) => event.key === 'Escape' && setOpen(false); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close) }, [open])
  return <header className="public-header">
    <div className="container navbar-row">
      <Link className="brand" to="/" aria-label={`${organizationName} হোম`}><ImageWithFallback src={getBrandLogo(settings)} fallbackSrc={DEFAULT_BRANDING.logoUrl} eager className="brand-logo" alt={`${organizationName} এর লোগো`}/><span>{settings.organization?.nameBn || settings.organization?.name || organizationName}</span></Link>
      <nav className="desktop-nav" aria-label="প্রধান নেভিগেশন">{publicNavigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}</nav>
      <div className="nav-actions"><Link className="admin-link" to="/admin/login">Admin Login</Link><Link className="button button--gold" to="/donation">সহযোগিতা করুন</Link>
        <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav container" aria-label="মোবাইল নেভিগেশন">{publicNavigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setOpen(false)}>{item.label}</NavLink>)}<Link to="/donation" onClick={() => setOpen(false)}>সহযোগিতা করুন</Link><Link to="/admin/login" onClick={() => setOpen(false)}>Admin Login</Link></nav>}
  </header>
}
