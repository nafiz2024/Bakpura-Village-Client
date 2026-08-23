import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { organizationName, publicNavigation } from '../../constants/navigation'
import { DEFAULT_BRANDING, getBrandLogo } from '../../constants/branding'
import { homeService, payload } from '../../services/homeService'
import ImageWithFallback from '../common/ImageWithFallback'

export default function PublicFooter() {
  const [settings, setSettings] = useState({})
  useEffect(() => { let active = true; homeService.settings().then(value => { if (active) setSettings(payload(value) || {}) }).catch(() => {}); return () => { active = false } }, [])
  return <footer className="public-footer"><div className="container footer-grid">
    <section><ImageWithFallback src={getBrandLogo(settings)} fallbackSrc={DEFAULT_BRANDING.logoUrl} className="footer-logo" alt={`${organizationName} এর লোগো`}/><h2>{settings.organization?.nameBn || settings.organization?.name || organizationName}</h2><p>{settings.organization?.sloganBn || settings.organization?.slogan || 'মানবতার সেবায়, সমাজের কল্যাণে'}</p></section>
    <section><h2>Quick Links</h2><ul>{publicNavigation.slice(0, 4).map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}</ul></section>
    <section><h2>Important Links</h2><ul><li><Link to="/membership">সদস্য হোন</Link></li><li><Link to="/donation">সহযোগিতা করুন</Link></li><li><Link to="/privacy-policy">Privacy Policy</Link></li></ul></section>
    <section><h2>Contact</h2><p className="muted-light">যোগাযোগের তথ্য শীঘ্রই যুক্ত হবে।</p></section>
  </div><div className="container footer-bottom">© 2026 {organizationName}। সর্বস্বত্ব সংরক্ষিত।</div></footer>
}
