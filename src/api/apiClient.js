import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  timeout: 15000,
})

let unauthorizedHandler=null
export const setAdminUnauthorizedHandler=(handler)=>{unauthorizedHandler=handler}
apiClient.interceptors.response.use(response=>response,error=>{
  const url=error.config?.url||''
  const isAdminRequest=url.startsWith('/admin/')
  const isAuthProbe=url==='/admin/auth/me'||url==='/admin/auth/login'
  if(error.response?.status===401&&isAdminRequest&&!isAuthProbe)unauthorizedHandler?.()
  return Promise.reject(error)
})

export default apiClient
