import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { organizationName } from '../../constants/navigation'
import ImageWithFallback from '../common/ImageWithFallback'

export default function AboutHero({ settings }) {
  const organization = settings.organization ?? {}
  return <section className="about-hero"><div className="container"><nav className="about-breadcrumb" aria-label="ব্রেডক্রাম্ব"><Link to="/"><Home size={15}/> হোম</Link><ChevronRight size={15}/><span aria-current="page">আমাদের সম্পর্কে</span></nav><div className="about-hero-grid"><div><p className="about-kicker">পরিচয় · উদ্দেশ্য · মূল্যবোধ</p><h1>আমাদের সম্পর্কে</h1><p className="about-org-name">{organization.nameBn || organization.name || organizationName}</p><p className="about-slogan">{organization.sloganBn || organization.slogan || 'মানবতার সেবায়, সমাজের কল্যাণে'}</p></div><div className="about-hero-image-wrap"><ImageWithFallback src={settings.branding?.banner} alt="সংগঠনের অফিসিয়াল ব্যানার" eager className="about-hero-image"/></div></div></div></section>
}
