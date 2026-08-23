export const DEFAULT_BRANDING = Object.freeze({
  logoUrl: '/branding/bakpura-official-logo.png',
  bannerUrl: '/branding/bakpura-official-banner.png',
})

const safeUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return ''
  const candidate = value.trim()
  if (candidate === DEFAULT_BRANDING.logoUrl || candidate === DEFAULT_BRANDING.bannerUrl) return candidate
  try {
    const parsed = new URL(candidate)
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : ''
  } catch {
    return ''
  }
}

export const getBrandLogo = settings => safeUrl(settings?.branding?.logo?.url) || DEFAULT_BRANDING.logoUrl
export const getBrandBanner = settings => safeUrl(settings?.branding?.banner?.url) || DEFAULT_BRANDING.bannerUrl
