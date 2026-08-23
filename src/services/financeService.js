import apiClient from '../api/apiClient'
const get=async(url,params)=>(await apiClient.get(url,{params})).data
export const financeService={
  summary:()=>get('/admin/finance/summary'),stats:()=>get('/admin/finance/stats'),transactions:params=>get('/admin/finance/transactions',params),transaction:id=>get(`/admin/finance/transactions/${id}`),
  create:async payload=>(await apiClient.post('/admin/finance/transactions',payload)).data,
  update:async(id,payload)=>(await apiClient.patch(`/admin/finance/transactions/${id}`,payload)).data,
  approve:async id=>(await apiClient.post(`/admin/finance/transactions/${id}/approve`)).data,
  reject:async(id,rejectionReason)=>(await apiClient.post(`/admin/finance/transactions/${id}/reject`,{rejectionReason})).data,
  void:async(id,voidReason)=>(await apiClient.post(`/admin/finance/transactions/${id}/void`,{voidReason})).data,
  donations:params=>get('/admin/donations',params),donationStats:()=>get('/admin/donations/stats'),donation:id=>get(`/admin/donations/${id}`),
  verifyDonation:async id=>(await apiClient.post(`/admin/donations/${id}/verify`)).data,
  rejectDonation:async(id,rejectionReason)=>(await apiClient.post(`/admin/donations/${id}/reject`,{rejectionReason})).data,
}
