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

const publicRoutes = [
  ['activities/:slug', 'কার্যক্রমের বিস্তারিত'],
  ['news/:slug', 'সংবাদ/নোটিশের বিস্তারিত'],
  ['donation', 'সহযোগিতা করুন'], ['contact', 'যোগাযোগ'], ['privacy-policy', 'Privacy Policy'],
]
const adminRoutes = [
  ['dashboard', 'অ্যাডমিন ড্যাশবোর্ড'], ['members', 'সকল সদস্য'], ['members/inactive', 'নিষ্ক্রিয় সদস্য'],
  ['members/:id', 'সদস্যের বিস্তারিত'], ['membership-applications', 'সদস্যপদ আবেদন'], ['activities', 'কার্যক্রম ব্যবস্থাপনা'],
  ['news', 'সংবাদ ও নোটিশ ব্যবস্থাপনা'], ['gallery', 'গ্যালারি ব্যবস্থাপনা'], ['committee', 'কমিটি ব্যবস্থাপনা'],
  ['finance', 'অর্থ ও সহযোগিতা'], ['documents', 'ডকুমেন্টস'], ['roles-permissions', 'Admin & Permissions'], ['settings', 'Settings'],
]

export default function AppRoutes() {
  return <><ScrollToTop/><Routes>
    <Route element={<PublicLayout/>}>
      <Route index element={<HomePage/>}/><Route path="about" element={<AboutPage/>}/><Route path="activities" element={<ActivitiesPage/>}/><Route path="committee" element={<CommitteePage/>}/><Route path="news" element={<NewsPage/>}/><Route path="gallery" element={<GalleryPage/>}/><Route path="membership" element={<MembershipPage/>}/>
      {publicRoutes.map(([path,title])=><Route key={path} path={path} element={<PagePlaceholder title={title}/>}/>)}
    </Route>
    <Route path="/admin/login" element={<PagePlaceholder title="Admin Login — পরবর্তী ধাপে তৈরি হবে"/>}/>
    <Route path="/admin" element={<AdminLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/>{adminRoutes.map(([path,title])=><Route key={path} path={path} element={<PagePlaceholder title={title}/>}/>)}</Route>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></>
}
