import { CircleDollarSign, FileText, Gauge, Settings, ShieldCheck, UserRoundCheck, UsersRound } from 'lucide-react'

export const organizationName = 'বাকপুরা প্রবাসী ও যুব কল্যাণ সংগঠন'

export const publicNavigation = [
  { label: 'হোম', to: '/', end: true }, { label: 'আমাদের সম্পর্কে', to: '/about' },
  { label: 'কার্যক্রম', to: '/activities' }, { label: 'কমিটি', to: '/committee' },
  { label: 'সংবাদ ও নোটিশ', to: '/news' }, { label: 'গ্যালারি', to: '/gallery' },
  { label: 'সদস্য হোন', to: '/membership' }, { label: 'যোগাযোগ', to: '/contact' },
]

export const adminNavigation = [
  { label: 'ড্যাশবোর্ড', to: '/admin/dashboard', icon: Gauge },
  { label: 'সদস্য ব্যবস্থাপনা', icon: UsersRound, children: [
    { label: 'সকল সদস্য', to: '/admin/members' }, { label: 'নিষ্ক্রিয় সদস্য', to: '/admin/members/inactive' },
  ], permission: 'members.view'},
  { label: 'সদস্যপদ আবেদন', to: '/admin/membership-applications', icon: UserRoundCheck, permission: 'applications.view' },
  { label: 'অর্থ ও সহযোগিতা', to: '/admin/finance', icon: CircleDollarSign, permission: 'finance.view' },
  { label: 'ডকুমেন্টস', to: '/admin/documents', icon: FileText, permission: 'documents.view' },
  { label: 'Admin & Permissions', to: '/admin/roles-permissions', icon: ShieldCheck, permissions: ['roles.view','admins.view'] },
  { label: 'Settings', to: '/admin/settings', icon: Settings, permission: 'settings.view' },
]
