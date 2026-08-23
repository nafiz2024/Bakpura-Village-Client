import { useEffect, useState } from 'react'
import { AboutPreview, AnnouncementBar, HeroSection, ImpactStats } from '../../components/home/HomeIntro'
import { ActivityCategories, CommunityHighlight, FeaturedActivities } from '../../components/home/ActivitySections'
import { GalleryPreview, LatestNews } from '../../components/home/MediaSections'
import { DonationCTA, MembershipCTA } from '../../components/home/HomeCtas'
import { homeService, list, payload } from '../../services/homeService'
import '../../styles/home.css'

export default function HomePage() {
  const [state,setState] = useState({settings:{},activities:[],news:[],gallery:[]}), [loading,setLoading] = useState(true)
  useEffect(()=>{ let current=true; Promise.allSettled([homeService.settings(),homeService.activities(),homeService.importantNews(),homeService.news(),homeService.gallery()]).then(([s,a,n1,n2,g])=>{if(!current)return;const news=[...(n1.status==='fulfilled'?list(n1.value):[]),...(n2.status==='fulfilled'?list(n2.value):[])].filter((x,i,all)=>all.findIndex(y=>(y._id||y.slug)===(x._id||x.slug))===i);setState({settings:s.status==='fulfilled'?payload(s.value)||{}:{},activities:a.status==='fulfilled'?list(a.value):[],news,gallery:g.status==='fulfilled'?list(g.value):[]});setLoading(false)});return()=>{current=false}},[])
  const {settings,activities,news,gallery}=state
  return <><AnnouncementBar value={settings.announcement}/><HeroSection settings={settings}/><ImpactStats stats={settings.homepage?.stats || settings.homepageStats}/><AboutPreview settings={settings}/><ActivityCategories/><FeaturedActivities items={activities} loading={loading}/><CommunityHighlight/><LatestNews items={news} loading={loading}/><GalleryPreview items={gallery} loading={loading}/><MembershipCTA value={settings.membership}/><DonationCTA value={settings.donation}/></>
}
