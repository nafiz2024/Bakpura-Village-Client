import apiClient from '../api/apiClient'

const get = async (url) => (await apiClient.get(url)).data
export const homeService = {
  settings: () => get('/settings/public'),
  activities: () => get('/activities/featured'),
  importantNews: () => get('/news/important'),
  news: () => get('/news/featured'),
  gallery: () => get('/gallery/media/featured'),
}
export const payload = (value) => value?.data ?? value ?? null
export const list = (value) => {
  const data = payload(value)
  if (Array.isArray(data)) return data
  return data?.items ?? data?.results ?? data?.docs ?? data?.activities ?? data?.news ?? data?.media ?? []
}
