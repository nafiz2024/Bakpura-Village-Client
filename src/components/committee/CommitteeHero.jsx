import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageWithFallback from '../common/ImageWithFallback'

export default function CommitteeHero({ banner }){return <section className="committee-hero"><div className="container"><nav className="committee-breadcrumb" aria-label="ব্রেডক্রাম্ব"><Link to="/"><Home size={15}/> হোম</Link><ChevronRight size={15}/><span aria-current="page">কমিটি</span></nav><div className="committee-hero-grid"><div><p className="committee-eyebrow">দায়িত্বশীল নেতৃত্ব · সম্মিলিত অংশগ্রহণ</p><h1>আমাদের কমিটি</h1><p>সংগঠনের মানবিক, সামাজিক ও উন্নয়নমূলক কার্যক্রমকে সুসংগঠিতভাবে পরিচালনার জন্য দায়িত্বশীল নেতৃত্ব ও সম্মিলিত অংশগ্রহণ গুরুত্বপূর্ণ।</p></div><ImageWithFallback src={banner} alt="সংগঠনের অফিসিয়াল ব্যানার" eager className="committee-hero-image"/></div></div></section>}
