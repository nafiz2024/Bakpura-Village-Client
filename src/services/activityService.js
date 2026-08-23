import apiClient from '../api/apiClient'

export const activityService = {
  getActivities: async (params, signal) => (await apiClient.get('/activities', { params, signal })).data,
  getFeatured: async (signal) => (await apiClient.get('/activities/featured', { signal })).data,
  getActivity: async (slug, signal) => (await apiClient.get(`/activities/${encodeURIComponent(slug)}`, { signal })).data,
}

export const activityPayload = (response) => response?.data ?? response ?? {}
export const activityItems = (response) => {
  const data = activityPayload(response)
  if (Array.isArray(data)) return data
  return data.items ?? data.results ?? data.docs ?? data.activities ?? []
}
export const paginationMeta = (response, fallbackPage = 1) => {
  const data = activityPayload(response)
  const meta = response?.pagination ?? data.pagination ?? response?.meta ?? data.meta ?? data
  return { page:Number(meta.page || fallbackPage), pages:Number(meta.pages || meta.totalPages || 1), total:Number(meta.total || meta.totalDocs || 0) }
}
