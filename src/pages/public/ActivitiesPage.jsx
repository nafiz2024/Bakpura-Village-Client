import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ActivitiesHero from '../../components/activities/ActivitiesHero'
import ActivityFilters, { ActivityAreas } from '../../components/activities/ActivityFilters'
import { ActivitiesGrid, FeaturedActivity, Pagination } from '../../components/activities/ActivityContent'
import { ActivityGallery, Collaboration, ImpactAndProcess, TransparencyAndCTA, UpcomingActivities } from '../../components/activities/ActivitySupportSections'
import { activityItems, activityPayload, activityService, paginationMeta } from '../../services/activityService'
import { homeService, payload } from '../../services/homeService'
import '../../styles/activities.css'

const isPublic = item => item?.archived !== true && item?.isArchived !== true && item?.isPublished !== false && (!item.status || item.status === 'published')
export default function ActivitiesPage(){
  const [params,setParams]=useSearchParams(), page=Math.max(1,Number(params.get('page'))||1), category=params.get('category')||'', search=params.get('search')||'', sort=params.get('sort')||'recent'
  const [state,setState]=useState({items:[],meta:{page:1,pages:1,total:0},key:'',error:false}),[featured,setFeatured]=useState(null),[settings,setSettings]=useState({}),[reload,setReload]=useState(0)
  const requestKey=`${page}|${category}|${search}|${sort}|${reload}`
  const update=useCallback((values)=>{const next=new URLSearchParams(params);Object.entries(values).forEach(([key,value])=>value&&value!==1?next.set(key,String(value)):next.delete(key));setParams(next)},[params,setParams])
  useEffect(()=>{const controller=new AbortController();activityService.getActivities({page,limit:9,...(category&&{category}),...(search&&{search}),sort},controller.signal).then(response=>setState({items:activityItems(response).filter(isPublic),meta:paginationMeta(response,page),key:requestKey,error:false})).catch(error=>{if(error.name!=='CanceledError')setState(old=>({...old,key:requestKey,error:true}))});return()=>controller.abort()},[page,category,search,sort,reload,requestKey])
  useEffect(()=>{const controller=new AbortController();Promise.allSettled([activityService.getFeatured(controller.signal),homeService.settings()]).then(([activity,setting])=>{if(activity.status==='fulfilled'){const data=activityItems(activity.value);const candidate=(data.length?data:[activityPayload(activity.value)]).find(x=>x&&isPublic(x));setFeatured(candidate||null)}if(setting.status==='fulfilled')setSettings(payload(setting.value)||{})});return()=>controller.abort()},[])
  const reset=()=>setParams({}), change=(values)=>update({...values,page:1})
  return <><ActivitiesHero banner={settings.branding?.banner}/><ActivityFilters category={category} search={search} sort={sort} onCategory={value=>change({category:value})} onSearch={value=>change({search:value})} onSort={value=>change({sort:value})}/><ActivityAreas selected={category} onSelect={value=>change({category:value})}/><FeaturedActivity item={featured}/><ActivitiesGrid items={state.items} loading={state.key!==requestKey} error={state.error} onRetry={()=>setReload(x=>x+1)} onReset={reset}/><Pagination page={state.meta.page} pages={state.meta.pages} onPage={value=>update({page:value})}/><ImpactAndProcess/><Collaboration/><UpcomingActivities items={state.items}/><ActivityGallery items={state.items}/><TransparencyAndCTA activities={state.items} settings={settings}/></>
}
