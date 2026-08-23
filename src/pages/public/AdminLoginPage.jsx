import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AdminLoginForm from '../../components/auth/AdminLoginForm'
import PageLoader from '../../components/common/PageLoader'
import LogoPlaceholder from '../../components/common/LogoPlaceholder'
import { organizationName } from '../../constants/navigation'
import { useAuth } from '../../context/auth-context'
import { homeService, payload } from '../../services/homeService'
import '../../styles/admin-auth.css'

export default function AdminLoginPage(){const {isAuthenticated,isLoading}=useAuth(),[branding,setBranding]=useState({});useEffect(()=>{let current=true;homeService.settings().then(value=>{if(current)setBranding(payload(value)?.branding||{})}).catch(()=>{});return()=>{current=false}},[]);if(isLoading)return <PageLoader label="অ্যাডমিন সেশন যাচাই হচ্ছে…"/>;if(isAuthenticated)return <Navigate to="/admin/dashboard" replace/>;const logo=branding.logo?.url,banner=branding.banner?.url;return <section className="admin-login-page"><div className="admin-login-card"><div className="admin-login-brand" style={banner?{backgroundImage:`linear-gradient(rgba(6,43,92,.89),rgba(6,43,92,.96)),url(${banner})`}:undefined}><div>{logo?<img className="auth-logo" src={logo} alt="সংগঠনের লোগো"/>:<LogoPlaceholder/>}<span>Admin Panel</span></div><h2>{organizationName}</h2><p>শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য। লগইন তথ্য কারও সাথে শেয়ার করবেন না এবং প্রশাসনিক তথ্য ব্যক্তিগত রাখুন।</p><ShieldCheck className="auth-shield" aria-hidden="true"/></div><div className="admin-login-panel"><AdminLoginForm/><div className="auth-public-links"><Link to="/"><ArrowLeft/> ওয়েবসাইটে ফিরে যান</Link><Link to="/contact">যোগাযোগ</Link></div></div></div></section>}
