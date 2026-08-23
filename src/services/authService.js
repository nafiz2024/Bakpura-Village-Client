import apiClient from '../api/apiClient'

export const authService={
  login:async credentials=>(await apiClient.post('/admin/auth/login',credentials)).data,
  getCurrentAdmin:async()=>(await apiClient.get('/admin/auth/me')).data,
  logout:async()=>(await apiClient.post('/admin/auth/logout')).data,
}
