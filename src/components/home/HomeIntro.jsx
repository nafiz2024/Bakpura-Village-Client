import { ArrowRight, HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import { organizationName } from '../../constants/navigation'
import ImageWithFallback from '../common/ImageWithFallback'

export function AnnouncementBar({ value }) {
  if (!value?.enabled || !value.message) return null
  const text = <>{value.message}{value.link && <ArrowRight size={15}/>}</>
  return <aside className="home-announcement" aria-label="ঘোষণা"><div className="container">{value.link ? <a href={value.link}>{text}</a> : <span>{text}</span>}</div></aside>
}
export function HeroSection({ settings }) {
  const home = settings.homepage ?? {}, branding = settings.branding ?? {}
  return <section className="home-hero"><div className="container hero-grid"><div className="hero-copy"><p className="home-eyebrow"><HeartHandshake size={18}/> মানবিক ও সামাজিক কল্যাণে ঐক্যবদ্ধ</p><h1>{settings.organization?.name || organizationName}</h1><p className="hero-slogan">{home.slogan || settings.organization?.slogan || 'মানবতার সেবায়, সমাজের কল্যাণে'}</p><p className="hero-description">{home.heroDescription || 'একটি সংগঠন, হাজারো আশা, গড়বো উন্নত সমাজের ভাষা'}</p><div className="hero-actions"><Link className="button button--primary home-button" to="/activities">আমাদের কার্যক্রম <ArrowRight size={18}/></Link><Link className="button home-button button--outline" to="/membership">সদস্য হোন</Link>{settings.donation?.enabled !== false && <Link className="text-link" to="/donation">সহযোগিতা করুন</Link>}</div></div><div className="hero-visual"><ImageWithFallback src={branding.banner} alt="সংগঠনের অফিসিয়াল ব্যানার" eager className="hero-image"/></div></div></section>
}
export function ImpactStats({ stats }) {
  const shown = (Array.isArray(stats) ? stats : []).filter(x => x?.isVisible !== false && x?.label && x?.value !== undefined && x?.value !== '')
  if (!shown.length) return null
  return <section className="impact-section" aria-label="সংগঠনের প্রভাব"><div className="container impact-grid">{shown.map((x,i)=><div key={x._id || `${x.label}-${i}`}><strong>{x.value}</strong><span>{x.label}</span></div>)}</div></section>
}
export function AboutPreview({ settings }) {
  const copy = settings.organization?.aboutSummary || settings.homepage?.aboutSummary || 'মানবিক মূল্যবোধ, পারস্পরিক সহযোগিতা ও সামাজিক দায়বদ্ধতাকে সামনে রেখে এলাকার কল্যাণে সবাইকে একত্র করার একটি উন্মুক্ত প্ল্যাটফর্ম।'
  return <section className="home-section"><div className="container about-grid"><ImageWithFallback src={settings.branding?.banner} alt="সংগঠনের পরিচিতিমূলক চিত্র" className="about-image"/><div><p className="home-eyebrow">পরিচিতি</p><h2>আমাদের সম্পর্কে</h2><p>{copy}</p><Link className="text-link" to="/about">আরও জানুন <ArrowRight size={17}/></Link></div></div></section>
}
