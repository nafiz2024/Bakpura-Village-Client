import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageWithFallback from '../common/ImageWithFallback'

export default function ActivitiesHero({ banner }) { return <section className="activities-hero"><div className="container"><nav className="activities-breadcrumb" aria-label="ব্রেডক্রাম্ব"><Link to="/"><Home size={15}/> হোম</Link><ChevronRight size={15}/><span aria-current="page">কার্যক্রম</span></nav><div className="activities-hero-grid"><div><p className="activities-eyebrow">মানবিক উদ্যোগ · সামাজিক কল্যাণ</p><h1>আমাদের কার্যক্রম</h1><p>মানবিক সহায়তা, সামাজিক কল্যাণ এবং সম্মিলিত উদ্যোগের মাধ্যমে মানুষের পাশে দাঁড়ানোর প্রচেষ্টাই আমাদের কার্যক্রমের মূল উদ্দেশ্য।</p></div><ImageWithFallback src={banner} alt="সংগঠনের কার্যক্রমের অফিসিয়াল ব্যানার" eager className="activities-hero-image"/></div></div></section> }
