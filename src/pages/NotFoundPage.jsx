import { Link } from 'react-router-dom'

export default function NotFoundPage() { return <main className="not-found"><div><p className="eyebrow">404</p><h1>পেজটি পাওয়া যায়নি</h1><p>আপনি যে ঠিকানাটি খুঁজছেন সেটি বিদ্যমান নয়।</p><Link className="button button--primary" to="/">হোমে ফিরুন</Link></div></main> }
