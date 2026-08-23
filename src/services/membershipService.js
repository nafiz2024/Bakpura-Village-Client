import apiClient from '../api/apiClient'
export const membershipService={submitApplication:async data=>(await apiClient.post('/membership-applications',data)).data}
