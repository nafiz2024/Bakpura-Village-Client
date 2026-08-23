import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { NewsFilters, NewsHero } from '../../components/news/NewsHeroFilters'
import { FeaturedNews, ImportantNotices, NewsGrid, Pagination } from '../../components/news/NewsContent'
import { NoticeBoard, PinnedAndEvents, PublicInfoAndCTA } from '../../components/news/NewsBoards'
import { homeService, payload } from '../../services/homeService'
import { newsItems, newsPagination, newsService } from '../../services/newsService'
import '../../styles/news.css'

const isPublic=x=>x?.archived!==true&&x?.isArchived!==true&&x?.isPublished!==false&&(!x.status||x.status==='published')
const unique=items=>items.filter((x,i,all)=>all.findIndex(y=>(y._id||y.slug)===(x._id||x.slug))===i)
export default function NewsPage(){
  const [params,setParams]=useSearchParams(),page=Math.max(1,Number(params.get('page'))||1),search=params.get('search')||'',type=params.get('type')||'',year=params.get('year')||'',sort=params.get('sort')||'recent'
  const [state,setState]=useState({items:[],meta:{page:1,pages:1},key:'',error:false}),[prominent,setProminent]=useState({important:[],pinned:[],featured:[]}),[settings,setSettings]=useState({}),[retry,setRetry]=useState(0)
  const key=`${page}|${search}|${type}|${year}|${sort}|${retry}`
  const update=useCallback(values=>{const next=new URLSearchParams(params);Object.entries(values).forEach(([k,v])=>v&&v!==1?next.set(k,String(v)):next.delete(k));setParams(next)},[params,setParams])
  useEffect(()=>{const controller=new AbortController();newsService.getNews({page,limit:9,...(search&&{search}),...(type&&{type}),...(year&&{year}),sort},controller.signal).then(value=>setState({items:newsItems(value).filter(isPublic),meta:newsPagination(value,page),key,error:false})).catch(error=>{if(error.name!=='CanceledError')setState(old=>({...old,key,error:true}))});return()=>controller.abort()},[page,search,type,year,sort,retry,key])
  useEffect(()=>{const controller=new AbortController();Promise.allSettled([newsService.getImportant(controller.signal),newsService.getPinned(controller.signal),newsService.getFeatured(controller.signal),homeService.settings()]).then(([important,pinned,featured,setting])=>{setProminent({important:important.status==='fulfilled'?newsItems(important.value).filter(isPublic):[],pinned:pinned.status==='fulfilled'?newsItems(pinned.value).filter(isPublic):[],featured:featured.status==='fulfilled'?newsItems(featured.value).filter(isPublic):[]});if(setting.status==='fulfilled')setSettings(payload(setting.value)||{})});return()=>controller.abort()},[])
  const featured=prominent.featured[0]||null,featuredId=featured?featured._id||featured.slug:null,important=prominent.important.filter(x=>(x._id||x.slug)!==featuredId),importantIds=new Set(important.map(x=>x._id||x.slug)),pinned=prominent.pinned.filter(x=>x.slug&&!importantIds.has(x._id||x.slug)&&(x._id||x.slug)!==featuredId)
  const items=unique(state.items),years=useMemo(()=>[...new Set(items.map(x=>new Date(x.publishedAt||x.createdAt).getFullYear()).filter(Number.isFinite))].sort((a,b)=>b-a),[items])
  const reset=()=>setParams({}),change=values=>update({...values,page:1})
  return <><NewsHero banner={settings.branding?.banner}/><ImportantNotices items={important}/><NewsFilters search={search} type={type} sort={sort} year={year} years={years} onSearch={value=>change({search:value})} onType={value=>change({type:value})} onSort={value=>change({sort:value})} onYear={value=>change({year:value})}/><FeaturedNews item={featured}/><NewsGrid items={items} loading={state.key!==key} error={state.error} onRetry={()=>setRetry(x=>x+1)} onReset={reset}/><Pagination page={state.meta.page} pages={state.meta.pages} onPage={value=>update({page:value})}/><NoticeBoard items={items}/><PinnedAndEvents pinned={pinned} items={items}/><PublicInfoAndCTA settings={settings}/></>
}
