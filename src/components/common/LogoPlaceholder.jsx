export default function LogoPlaceholder({ compact = false }) {
  return <span className={`logo-placeholder ${compact ? 'logo-placeholder--compact' : ''}`} aria-label="অস্থায়ী লোগো স্থানধারক">লোগো</span>
}
