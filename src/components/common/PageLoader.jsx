export default function PageLoader({ label = 'লোড হচ্ছে…' }) {
  return <div className="page-loader" role="status"><span className="spinner" aria-hidden="true"/><span>{label}</span></div>
}
