import { Navigate, Route, Routes } from 'react-router-dom'
import PagePlaceholder from '../components/common/PagePlaceholder'
import ScrollToTop from '../components/common/ScrollToTop'
import AdminLayout from '../layouts/AdminLayout'
import PublicLayout from '../layouts/PublicLayout'
import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/public/HomePage'
import AboutPage from '../pages/public/AboutPage'
import ActivitiesPage from '../pages/public/ActivitiesPage'
import CommitteePage from '../pages/public/CommitteePage'
import NewsPage from '../pages/public/NewsPage'
import GalleryPage from '../pages/public/GalleryPage'
import MembershipPage from '../pages/public/MembershipPage'
import DonationPage from '../pages/public/DonationPage'
import ContactPage from '../pages/public/ContactPage'
import AdminLoginPage from '../pages/public/AdminLoginPage'
import ProtectedAdminRoute from '../components/auth/ProtectedAdminRoute'
import DashboardPage from '../pages/admin/DashboardPage'
import MembersPage from '../pages/admin/MembersPage'
import MemberDetailsPage from '../pages/admin/MemberDetailsPage'
import MembershipApplicationsPage from '../pages/admin/MembershipApplicationsPage'
import FinancePage from '../pages/admin/FinancePage'

const publicRoutes = [
  ['activities/:slug', 'কার্যক্রমের বিস্তারিত'],
  ['news/:slug', 'সংবাদ/নোটিশের বিস্তারিত'],
  ['privacy-policy', 'Privacy Policy'],
]
const adminRoutes = [
  ['activities', 'কার্যক্রম ব্যবস্থাপনা'],
  ['news', 'সংবাদ ও নোটিশ ব্যবস্থাপনা'], ['gallery', 'গ্যালারি ব্যবস্থাপনা'], ['committee', 'কমিটি ব্যবস্থাপনা'],
  ['documents', 'ডকুমেন্টস'], ['roles-permissions', 'Admin & Permissions'], ['settings', 'Settings'],
]

export default function AppRoutes() {
  return <><ScrollToTop/><Routes>
    <Route element={<PublicLayout/>}>
      <Route index element={<HomePage/>}/><Route path="about" element={<AboutPage/>}/><Route path="activities" element={<ActivitiesPage/>}/><Route path="committee" element={<CommitteePage/>}/><Route path="news" element={<NewsPage/>}/><Route path="gallery" element={<GalleryPage/>}/><Route path="membership" element={<MembershipPage/>}/><Route path="donation" element={<DonationPage/>}/><Route path="contact" element={<ContactPage/>}/>
      <Route path="admin/login" element={<AdminLoginPage/>}/>
      {publicRoutes.map(([path,title])=><Route key={path} path={path} element={<PagePlaceholder title={title}/>}/>)}
    </Route>
    <Route element={<ProtectedAdminRoute/>}><Route path="/admin" element={<AdminLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<DashboardPage/>}/><Route path="members" element={<MembersPage/>}/><Route path="members/inactive" element={<MembersPage/>}/><Route path="members/:id" element={<MemberDetailsPage/>}/><Route path="membership-applications" element={<MembershipApplicationsPage/>}/><Route path="finance" element={<FinancePage/>}/>{adminRoutes.map(([path,title])=><Route key={path} path={path} element={<PagePlaceholder title={title}/>}/>)}</Route></Route>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></>
}
