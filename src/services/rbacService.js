import apiClient from '../api/apiClient'
const get=async(url,params)=>(await apiClient.get(url,{params})).data
export const rbacService={
  admins:params=>get('/admin/admin-users',params),adminStats:()=>get('/admin/admin-users/stats'),admin:id=>get(`/admin/admin-users/${id}`),
  createAdmin:async payload=>(await apiClient.post('/admin/admin-users',payload)).data,updateAdmin:async(id,payload)=>(await apiClient.patch(`/admin/admin-users/${id}`,payload)).data,
  changeRole:async(id,role)=>(await apiClient.patch(`/admin/admin-users/${id}/role`,{role})).data,disable:async id=>(await apiClient.post(`/admin/admin-users/${id}/disable`)).data,enable:async id=>(await apiClient.post(`/admin/admin-users/${id}/enable`)).data,
  roles:()=>get('/admin/roles'),role:id=>get(`/admin/roles/${id}`),catalog:()=>get('/admin/roles/permissions'),
  createRole:async payload=>(await apiClient.post('/admin/roles',payload)).data,updateRole:async(id,payload)=>(await apiClient.patch(`/admin/roles/${id}`,payload)).data,
}
