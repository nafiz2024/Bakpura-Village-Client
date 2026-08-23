import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLoader from '../components/common/PageLoader'
import ScrollToTop from '../components/common/ScrollToTop'
import ProtectedAdminRoute from '../components/auth/ProtectedAdminRoute'
import AdminLayout from '../layouts/AdminLayout'
import PublicLayout from '../layouts/PublicLayout'

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const HomePage = lazy(() => import('../pages/public/HomePage'))
const AboutPage = lazy(() => import('../pages/public/AboutPage'))
const ActivitiesPage = lazy(() => import('../pages/public/ActivitiesPage'))
const ActivityDetailsPage = lazy(() => import('../pages/public/ActivityDetailsPage'))
const CommitteePage = lazy(() => import('../pages/public/CommitteePage'))
const NewsPage = lazy(() => import('../pages/public/NewsPage'))
const NewsDetailsPage = lazy(() => import('../pages/public/NewsDetailsPage'))
const GalleryPage = lazy(() => import('../pages/public/GalleryPage'))
const MembershipPage = lazy(() => import('../pages/public/MembershipPage'))
const DonationPage = lazy(() => import('../pages/public/DonationPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('../pages/public/PrivacyPolicyPage'))
const AdminLoginPage = lazy(() => import('../pages/public/AdminLoginPage'))
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'))
const MembersPage = lazy(() => import('../pages/admin/MembersPage'))
const MemberDetailsPage = lazy(() => import('../pages/admin/MemberDetailsPage'))
const MembershipApplicationsPage = lazy(() => import('../pages/admin/MembershipApplicationsPage'))
const FinancePage = lazy(() => import('../pages/admin/FinancePage'))
const DocumentsPage = lazy(() => import('../pages/admin/DocumentsPage'))
const RolesPermissionsPage = lazy(() => import('../pages/admin/RolesPermissionsPage'))
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage'))

export default function AppRoutes() {
  return <Suspense fallback={<PageLoader label="পেজ লোড হচ্ছে…"/>}><ScrollToTop/><Routes>
    <Route element={<PublicLayout/>}>
      <Route index element={<HomePage/>}/><Route path="about" element={<AboutPage/>}/>
      <Route path="activities" element={<ActivitiesPage/>}/><Route path="activities/:slug" element={<ActivityDetailsPage/>}/>
      <Route path="committee" element={<CommitteePage/>}/><Route path="news" element={<NewsPage/>}/><Route path="news/:slug" element={<NewsDetailsPage/>}/>
      <Route path="gallery" element={<GalleryPage/>}/><Route path="membership" element={<MembershipPage/>}/><Route path="donation" element={<DonationPage/>}/>
      <Route path="contact" element={<ContactPage/>}/><Route path="privacy-policy" element={<PrivacyPolicyPage/>}/><Route path="admin/login" element={<AdminLoginPage/>}/>
    </Route>
    <Route element={<ProtectedAdminRoute/>}><Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<DashboardPage/>}/>
      <Route path="members" element={<MembersPage/>}/><Route path="members/inactive" element={<MembersPage/>}/><Route path="members/:id" element={<MemberDetailsPage/>}/>
      <Route path="membership-applications" element={<MembershipApplicationsPage/>}/><Route path="finance" element={<FinancePage/>}/>
      <Route path="documents" element={<DocumentsPage/>}/><Route path="roles-permissions" element={<RolesPermissionsPage/>}/><Route path="settings" element={<SettingsPage/>}/>
      <Route path="activities" element={<Navigate to="/activities" replace/>}/><Route path="news" element={<Navigate to="/news" replace/>}/>
      <Route path="gallery" element={<Navigate to="/gallery" replace/>}/><Route path="committee" element={<Navigate to="/committee" replace/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Route></Route>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></Suspense>
}
