import { Outlet } from 'react-router-dom'
import PublicFooter from '../components/public/PublicFooter'
import PublicNavbar from '../components/public/PublicNavbar'

export default function PublicLayout() { return <div className="site-shell"><PublicNavbar/><main id="main-content"><Outlet/></main><PublicFooter/></div> }
