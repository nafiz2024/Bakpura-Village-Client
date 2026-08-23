import apiClient from '../api/apiClient'
const get=async(url,options={})=>(await apiClient.get(url,options)).data
export const newsService={
  getNews:(params,signal)=>get('/news',{params,signal}),
  getImportant:signal=>get('/news/important',{signal}),
  getPinned:signal=>get('/news/pinned',{signal}),
  getFeatured:signal=>get('/news/featured',{signal}),
}
export const newsPayload=value=>value?.data??value??{}
export const newsItems=value=>{const data=newsPayload(value);if(Array.isArray(data))return data;return data.items??data.results??data.docs??data.news??[]}
export const newsPagination=(value,fallback=1)=>{const data=newsPayload(value),meta=value?.pagination??data.pagination??value?.meta??data.meta??data;return{page:Number(meta.page||fallback),pages:Number(meta.pages||meta.totalPages||1),total:Number(meta.total||meta.totalDocs||0)}}
