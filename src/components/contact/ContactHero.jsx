import { ChevronRight, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'

const imageUrl=value=>typeof value==='string'?value:value?.url
export default function ContactHero({banner}){const image=imageUrl(banner);return <section className="contact-hero"><div className="container"><nav className="contact-breadcrumb" aria-label="Breadcrumb"><Link to="/">হোম</Link><ChevronRight size={15}/><span aria-current="page">যোগাযোগ</span></nav><div className="contact-hero-grid"><div><p className="contact-eyebrow">আমরা আপনার কথা শুনতে চাই</p><h1>যোগাযোগ করুন</h1><p>সংগঠন, সদস্যপদ, সহযোগিতা, কার্যক্রম বা অন্যান্য বিষয়ে জানতে আমাদের সাথে যোগাযোগ করুন।</p><a className="button button--gold" href="#contact-form"><MessageSquareText/> বার্তা পাঠান</a></div>{image&&<img src={image} alt="সংগঠনের প্রকাশিত ব্যানার"/>}</div></div></section>}
