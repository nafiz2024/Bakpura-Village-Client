import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GalleryFilters, GalleryHero } from '../../components/gallery/GalleryHeroFilters'
import { FeaturedGallery, GalleryLoadMore, PhotoGallery, VideoGallery, mediaUrl } from '../../components/gallery/GalleryMedia'
import GalleryAlbums from '../../components/gallery/GalleryAlbums'
import GalleryLightbox from '../../components/gallery/GalleryLightbox'
import GalleryClosing from '../../components/gallery/GalleryClosing'
import { galleryItems, galleryPagination, galleryService } from '../../services/galleryService'
import { homeService, payload } from '../../services/homeService'
import '../../styles/gallery.css'

const safeMediaUrl=value=>{try{return ['http:','https:'].includes(new URL(value,window.location.origin).protocol)}catch{return false}}
const publicMedia=x=>x?.isPublic!==false&&x?.active!==false&&x?.archived!==true&&(!x.status||x.status==='active')&&safeMediaUrl(mediaUrl(x))
const publicAlbum=x=>x?.isPublic!==false&&x?.archived!==true&&(!x.status||x.status==='published')
const unique=items=>items.filter((x,i,all)=>all.findIndex(y=>(y._id||y.url||y.imageUrl)===(x._id||x.url||x.imageUrl))===i)
export default function GalleryPage(){
  const [params,setParams]=useSearchParams(),category=params.get('category')||'',mediaType=params.get('mediaType')||'',album=params.get('album')||'',page=Math.max(1,Number(params.get('page'))||1)
  const [state,setState]=useState({items:[],meta:{page:1,pages:1},key:'',error:false}),[featured,setFeatured]=useState([]),[albums,setAlbums]=useState([]),[settings,setSettings]=useState({}),[retry,setRetry]=useState(0),[lightbox,setLightbox]=useState(null)
  const key=`${category}|${mediaType}|${album}|${page}|${retry}`
  const update=useCallback(values=>{const next=new URLSearchParams(params);Object.entries(values).forEach(([k,v])=>v&&v!==1?next.set(k,String(v)):next.delete(k));setParams(next)},[params,setParams])
  useEffect(()=>{const controller=new AbortController();galleryService.getMedia({page,limit:12,...(category&&{category}),...(mediaType&&{mediaType}),...(album&&{album})},controller.signal).then(value=>{const incoming=galleryItems(value).filter(publicMedia);setState(old=>({items:page===1?incoming:unique([...old.items,...incoming]),meta:galleryPagination(value,page),key,error:false}))}).catch(error=>{if(error.name!=='CanceledError')setState(old=>({...old,key,error:true}))});return()=>controller.abort()},[category,mediaType,album,page,retry,key])
  useEffect(()=>{const controller=new AbortController();Promise.allSettled([galleryService.getFeaturedMedia(controller.signal),galleryService.getAlbums(controller.signal),homeService.settings()]).then(([media,albumResult,setting])=>{if(media.status==='fulfilled')setFeatured(galleryItems(media.value).filter(publicMedia));if(albumResult.status==='fulfilled')setAlbums(galleryItems(albumResult.value).filter(publicAlbum));if(setting.status==='fulfilled')setSettings(payload(setting.value)||{})});return()=>controller.abort()},[])
  const featuredIds=new Set(featured.map(x=>x._id||mediaUrl(x))),items=unique(state.items),photos=items.filter(x=>(x.mediaType||'image')==='image'&&!featuredIds.has(x._id||mediaUrl(x))),videos=items.filter(x=>x.mediaType==='video'),lightboxItems=useMemo(()=>unique([...featured.filter(x=>(x.mediaType||'image')==='image'),...photos]),[featured,photos])
  const openLightbox=useCallback((item,trigger)=>{const index=lightboxItems.findIndex(x=>(x._id||mediaUrl(x))===(item._id||mediaUrl(item)));setLightbox({index:Math.max(0,index),trigger})},[lightboxItems]),closeLightbox=useCallback(()=>setLightbox(null),[]),changeLightbox=useCallback(index=>setLightbox(old=>old?{...old,index}:old),[])
  const change=values=>update({...values,page:1}),reset=()=>setParams({})
  return <><GalleryHero banner={settings.branding?.banner}/><GalleryFilters category={category} mediaType={mediaType} album={album} albums={albums} onCategory={value=>change({category:value})} onMediaType={value=>change({mediaType:value})} onAlbum={value=>change({album:value})}/><FeaturedGallery items={featured} onOpen={openLightbox}/><PhotoGallery items={photos} loading={state.key!==key} error={state.error} onRetry={()=>setRetry(x=>x+1)} onReset={reset} onOpen={openLightbox}/><GalleryLoadMore page={state.meta.page} pages={state.meta.pages} onMore={value=>update({page:value})}/><GalleryAlbums albums={albums} selected={album} onSelect={value=>change({album:value})}/><VideoGallery items={videos}/><GalleryClosing settings={settings}/>{lightbox&&<GalleryLightbox items={lightboxItems} index={lightbox.index} onClose={closeLightbox} onChange={changeLightbox} returnFocus={lightbox.trigger}/>}</>
}
