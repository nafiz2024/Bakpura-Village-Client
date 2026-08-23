import apiClient from '../api/apiClient'

const get=async(url,params)=>(await apiClient.get(url,{params})).data
export const dashboardService={
  memberStats:()=>get('/admin/members/stats'),recentMembers:()=>get('/admin/members',{limit:5,sort:'newest'}),
  applicationStats:()=>get('/admin/membership-applications/stats'),activityStats:()=>get('/admin/activities/stats'),
  newsStats:()=>get('/admin/news/stats'),galleryStats:()=>get('/admin/gallery/media/stats'),
  financeStats:()=>get('/admin/finance/stats'),financeSummary:()=>get('/admin/finance/summary'),
  documentStats:()=>get('/admin/documents/stats'),contactStats:()=>get('/admin/contact-messages/stats'),
  auditStats:()=>get('/admin/audit-logs/stats'),recentAudit:()=>get('/admin/audit-logs',{limit:5,sort:'newest'}),
  health:()=>get('/health'),branding:()=>get('/settings/public'),
}
export const dashboardPayload=value=>value?.data??value??null
