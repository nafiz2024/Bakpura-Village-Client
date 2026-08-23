import apiClient from '../api/apiClient'
const get=async(url,params)=>(await apiClient.get(url,{params})).data
export const documentService={
  list:params=>get('/admin/documents',params),stats:()=>get('/admin/documents/stats'),detail:id=>get(`/admin/documents/${id}`),
  create:async payload=>(await apiClient.post('/admin/documents',payload)).data,update:async(id,payload)=>(await apiClient.patch(`/admin/documents/${id}`,payload)).data,
  access:async(id,accessLevel)=>(await apiClient.patch(`/admin/documents/${id}/access`,{accessLevel})).data,
  submit:async id=>(await apiClient.post(`/admin/documents/${id}/submit-for-approval`)).data,approve:async id=>(await apiClient.post(`/admin/documents/${id}/approve`)).data,
  reject:async(id,rejectionReason)=>(await apiClient.post(`/admin/documents/${id}/reject`,{rejectionReason})).data,publish:async id=>(await apiClient.post(`/admin/documents/${id}/publish`)).data,
  unpublish:async id=>(await apiClient.post(`/admin/documents/${id}/unpublish`)).data,archive:async id=>(await apiClient.post(`/admin/documents/${id}/archive`)).data,restore:async id=>(await apiClient.post(`/admin/documents/${id}/restore`)).data,
  download:id=>get(`/admin/documents/${id}/download`),
}
