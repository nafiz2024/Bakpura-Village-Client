import { ChevronRight, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DEFAULT_BRANDING } from '../../constants/branding'
import ImageWithFallback from '../common/ImageWithFallback'

export default function ContactHero({ banner }) {
  return <section className="contact-hero"><div className="container">
    <nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link to="/">হোম</Link><ChevronRight size={15}/><span aria-current="page">যোগাযোগ</span></nav>
    <div className="contact-hero-grid">
      <div><p className="contact-eyebrow">আমরা আপনার কথা শুনতে চাই</p><h1>যোগাযোগ করুন</h1><p>সংগঠন, সদস্যপদ, সহযোগিতা, কার্যক্রম বা অন্যান্য বিষয়ে জানতে আমাদের সাথে যোগাযোগ করুন।</p><a className="button button--gold" href="#contact-form"><MessageSquareText/> বার্তা পাঠান</a></div>
      <ImageWithFallback src={banner} fallbackSrc={DEFAULT_BRANDING.bannerUrl} alt="বাকপুরা প্রবাসী ও যুব কল্যাণ সংগঠনের অফিসিয়াল ব্যানার" eager className="contact-hero-image"/>
    </div>
  </div></section>
}
