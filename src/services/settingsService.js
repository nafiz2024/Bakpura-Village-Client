import apiClient from '../api/apiClient'
const safePayload=(name,payload)=>name==='donation'?{...payload,paymentMethods:(payload.paymentMethods||[]).map(method=>({type:method.type,label:method.label||'',accountName:method.accountName||'',accountNumber:method.accountNumber||'',instructions:method.instructions||'',isEnabled:method.isEnabled===true,displayOrder:Number(method.displayOrder)||0}))}:payload
export const settingsService={
  all:async()=>(await apiClient.get('/admin/settings')).data,
  section:async name=>(await apiClient.get(`/admin/settings/${name}`)).data,
  update:async(name,payload)=>(await apiClient.patch(`/admin/settings/${name}`,safePayload(name,payload))).data,
}
