import apiClient from '../api/apiClient'

export const contactService = {
  submitContactMessage: async (data) => (await apiClient.post('/contact', data)).data,
}
