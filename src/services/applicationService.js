import apiClient from '../api/apiClient'
const get=async(url,params)=>(await apiClient.get(url,{params})).data
export const applicationService={
  list:params=>get('/admin/membership-applications',params),stats:()=>get('/admin/membership-applications/stats'),detail:id=>get(`/admin/membership-applications/${id}`),
  review:async id=>(await apiClient.patch(`/admin/membership-applications/${id}/review`)).data,
  assign:async(id,adminId)=>(await apiClient.patch(`/admin/membership-applications/${id}/assign`,{adminId})).data,
  requestInfo:async(id,reviewNotes)=>(await apiClient.patch(`/admin/membership-applications/${id}/request-info`,{reviewNotes})).data,
  approve:async id=>(await apiClient.post(`/admin/membership-applications/${id}/approve`)).data,
  reject:async(id,rejectionReason)=>(await apiClient.post(`/admin/membership-applications/${id}/reject`,{rejectionReason})).data,
  archive:async id=>(await apiClient.post(`/admin/membership-applications/${id}/archive`)).data,
  admins:()=>get('/admin/admin-users',{status:'active',limit:100,sort:'name'}),
}
