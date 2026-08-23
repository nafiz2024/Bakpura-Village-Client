import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { DEFAULT_BRANDING } from '../../constants/branding'

export default function ImageWithFallback({ src, fallbackSrc = '', alt, eager = false, className = '' }) {
  const normalizedSrc = typeof src === 'string' ? src : src?.url
  const contextualFallback = fallbackSrc || (/banner|hero-image|about-image/.test(className) ? DEFAULT_BRANDING.bannerUrl : '')
  const [failedSource, setFailedSource] = useState('')
  const current = failedSource === normalizedSrc ? contextualFallback : normalizedSrc
  if (!current || failedSource === contextualFallback) return <div className={`image-fallback ${className}`} role="img" aria-label={alt || 'ছবি পাওয়া যায়নি'}><ImageIcon/><span>ছবি পাওয়া যায়নি</span></div>
  return <img className={className} src={current} alt={alt || ''} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} onError={() => setFailedSource(current)}/>
}
