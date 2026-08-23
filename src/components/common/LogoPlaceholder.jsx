import { DEFAULT_BRANDING } from '../../constants/branding'
import { organizationName } from '../../constants/navigation'

export default function LogoPlaceholder({ compact = false }) {
  return <img src={DEFAULT_BRANDING.logoUrl} className={`official-logo ${compact ? 'official-logo--compact' : ''}`} alt={`${organizationName} এর লোগো`}/>
}
