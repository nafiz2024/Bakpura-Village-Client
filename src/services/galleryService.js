import apiClient from '../api/apiClient'
const get=async(url,options={})=>(await apiClient.get(url,options)).data
export const galleryService={
  getMedia:(params,signal)=>get('/gallery/media',{params,signal}),
  getFeaturedMedia:signal=>get('/gallery/media/featured',{signal}),
  getAlbums:signal=>get('/gallery/albums',{signal}),
}
export const galleryPayload=value=>value?.data??value??{}
export const galleryItems=value=>{const data=galleryPayload(value);if(Array.isArray(data))return data;return data.items??data.results??data.docs??data.media??data.albums??[]}
export const galleryPagination=(value,fallback=1)=>{const data=galleryPayload(value),meta=value?.pagination??data.pagination??value?.meta??data.meta??data;return{page:Number(meta.page||fallback),pages:Number(meta.pages||meta.totalPages||1),total:Number(meta.total||meta.totalDocs||0)}}
