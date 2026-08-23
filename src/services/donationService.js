import apiClient from '../api/apiClient'
export const donationService={submitDonation:async data=>(await apiClient.post('/donations',data)).data}
