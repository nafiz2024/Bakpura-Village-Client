import { useEffect, useState } from 'react'
import CommitteeHero from '../../components/committee/CommitteeHero'
import { CommitteeIntro, CommitteeSelector, LeadershipSection, MembersGrid } from '../../components/committee/CommitteePeople'
import { CommitteeTerm, MessageAndPrivacy, Representation, Responsibilities, Structure } from '../../components/committee/CommitteeInformation'
import CommitteeCTA from '../../components/committee/CommitteeCTA'
import PageLoader from '../../components/common/PageLoader'
import { committeeList, committeeService, publicCommittee } from '../../services/committeeService'
import { homeService, payload } from '../../services/homeService'
import '../../styles/committee.css'

export default function CommitteePage(){
  const [committees,setCommittees]=useState([]),[selected,setSelected]=useState(''),[committee,setCommittee]=useState(null),[settings,setSettings]=useState({}),[status,setStatus]=useState('loading'),[retry,setRetry]=useState(0)
  useEffect(()=>{const controller=new AbortController();Promise.allSettled([committeeService.getCommittees(controller.signal),homeService.settings()]).then(([result,setting])=>{if(setting.status==='fulfilled')setSettings(payload(setting.value)||{});if(result.status==='rejected'){setStatus('error');return}const items=committeeList(result.value).filter(x=>x?.isPublic!==false&&x?.active!==false);setCommittees(items);if(!items.length){setStatus('empty');return}setSelected(current=>current||items[0].slug||'');if(!items[0].slug){setCommittee(publicCommittee(items[0]));setStatus('ready')}});return()=>controller.abort()},[retry])
  useEffect(()=>{if(!selected)return;const controller=new AbortController();committeeService.getCommittee(selected,controller.signal).then(value=>{const next=publicCommittee(value);setCommittee(next);setStatus(next?'ready':'empty')}).catch(error=>{if(error.name!=='CanceledError')setStatus('error')});return()=>controller.abort()},[selected,retry])
  const changeCommittee=slug=>{setStatus('loading');setSelected(slug);setCommittee(null)}
  const members=committee?.members ?? []
  return <><CommitteeHero banner={settings.branding?.banner}/><CommitteeSelector committees={committees} selected={selected} onSelect={changeCommittee}/>{status==='loading'&&<PageLoader label="কমিটির তথ্য লোড হচ্ছে…"/>}{status==='error'&&<section className="committee-state"><h2>কমিটির তথ্য লোড করা যায়নি</h2><p>অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।</p><button className="button button--primary" onClick={()=>setRetry(x=>x+1)}>আবার চেষ্টা করুন</button></section>}{status==='empty'&&<section className="committee-state"><h2>কমিটির তথ্য বর্তমানে প্রকাশিত হয়নি।</h2><p>প্রকাশিত তথ্য পাওয়া গেলে এখানে প্রদর্শিত হবে।</p></section>}{status==='ready'&&committee&&<><CommitteeIntro committee={committee}/><LeadershipSection members={members}/><MembersGrid members={members} hasFeatured={members.some(x=>x.isFeatured)}/><Representation members={members}/><Structure members={members}/><Responsibilities/><CommitteeTerm term={committee.term}/><MessageAndPrivacy message={committee.leadershipMessage}/></>}<CommitteeCTA settings={settings}/></>
}
