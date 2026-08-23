import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PageLoader from '../common/PageLoader'
import { useAuth } from '../../context/auth-context'

export default function ProtectedAdminRoute(){const {isAuthenticated,isLoading}=useAuth(),location=useLocation();if(isLoading)return <PageLoader label="অ্যাডমিন সেশন যাচাই হচ্ছে…"/>;return isAuthenticated?<Outlet/>:<Navigate to="/admin/login" replace state={{from:location.pathname+location.search}}/>}
