import { Link } from 'react-router-dom'
import { organizationName, publicNavigation } from '../../constants/navigation'

export default function PublicFooter() {
  return <footer className="public-footer"><div className="container footer-grid">
    <section><h2>{organizationName}</h2><p>মানবতার সেবায়, সমাজের কল্যাণে</p></section>
    <section><h2>Quick Links</h2><ul>{publicNavigation.slice(0, 4).map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}</ul></section>
    <section><h2>Important Links</h2><ul><li><Link to="/membership">সদস্য হোন</Link></li><li><Link to="/donation">সহযোগিতা করুন</Link></li><li><Link to="/privacy-policy">Privacy Policy</Link></li></ul></section>
    <section><h2>Contact</h2><p className="muted-light">যোগাযোগের তথ্য শীঘ্রই যুক্ত হবে।</p></section>
  </div><div className="container footer-bottom">© 2026 {organizationName}। সর্বস্বত্ব সংরক্ষিত।</div></footer>
}
