import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function ImageWithFallback({ src, alt, eager = false, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div className={`image-fallback ${className}`} role="img" aria-label={alt || 'ছবি পাওয়া যায়নি'}><ImageIcon/><span>ছবি শীঘ্রই যুক্ত হবে</span></div>
  return <img className={className} src={src} alt={alt || ''} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)}/>
}
