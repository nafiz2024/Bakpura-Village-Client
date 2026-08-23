import apiClient from '../api/apiClient'

export const memberService={
  list:async(params)=>(await apiClient.get('/admin/members',{params})).data,
  stats:async()=>(await apiClient.get('/admin/members/stats')).data,
  create:async(data)=>(await apiClient.post('/admin/members',data)).data,
  setStatus:async(id,status)=>(await apiClient.patch(`/admin/members/${id}/status`,{status})).data,
  archive:async id=>(await apiClient.post(`/admin/members/${id}/archive`)).data,
  restore:async id=>(await apiClient.post(`/admin/members/${id}/restore`)).data,
}
