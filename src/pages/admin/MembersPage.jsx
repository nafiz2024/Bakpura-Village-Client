import { Plus, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import MemberConfirm from '../../components/admin/members/MemberConfirm'
import MemberFormDrawer from '../../components/admin/members/MemberFormDrawer'
import MembersTable, { MemberPagination } from '../../components/admin/members/MembersTable'
import MemberToolbar from '../../components/admin/members/MemberToolbar'
import AccessDenied from '../../components/auth/AccessDenied'
import { useAuth } from '../../context/auth-context'
import { memberService } from '../../services/memberService'
import '../../styles/admin-members.css'

const queryObject=params=>Object.fromEntries([...params.entries()].filter(([,value])=>value!==''))
export default function MembersPage(){
  const {hasPermission}=useAuth(),location=useLocation(),[params,setParams]=useSearchParams()
  const [state,setState]=useState({status:'loading',members:[],pagination:null,stats:null}),[retry,setRetry]=useState(0),[drawer,setDrawer]=useState(false),[notice,setNotice]=useState(''),[action,setAction]=useState(null),[actionState,setActionState]=useState({submitting:false,error:''})
  const can=permission=>hasPermission(permission),query=queryObject(params),effectiveQuery={page:query.page||'1',limit:query.limit||'20',sort:query.sort||'newest',...(location.pathname.endsWith('/inactive')&&!query.status?{status:'inactive'}:query)},queryKey=JSON.stringify(effectiveQuery)
  useEffect(()=>{let current=true;const requestQuery=JSON.parse(queryKey);Promise.allSettled([memberService.list(requestQuery),memberService.stats()]).then(([list,stats])=>{if(!current)return;if(list.status==='rejected'){setState(old=>({...old,status:list.reason?.response?.status===403?'denied':'error'}));return}setState({status:'ready',members:list.value.data||[],pagination:list.value.pagination||null,stats:stats.status==='fulfilled'?stats.value.data:null})});return()=>{current=false}},[queryKey,retry])
  if(!can('members.view'))return <AccessDenied/>
  const markLoading=()=>setState(old=>({...old,status:'loading'}))
  const change=(key,value)=>{const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);if(key!=='page')next.set('page','1');markLoading();setParams(next)}
  const clear=()=>{markLoading();setParams({})}
  const created=member=>{setDrawer(false);setNotice('সদস্য সফলভাবে যোগ করা হয়েছে।');markLoading();setRetry(x=>x+1);if(member?.id)window.setTimeout(()=>setNotice(''),5000)}
  const retryLoad=()=>{markLoading();setRetry(x=>x+1)}
  const confirm=async()=>{if(!action||actionState.submitting)return;setActionState({submitting:true,error:''});try{if(action.type==='archive')await memberService.archive(action.member.id);else if(action.type==='restore')await memberService.restore(action.member.id);else await memberService.setStatus(action.member.id,action.member.status==='active'?'inactive':'active');setNotice(action.type==='archive'?'সদস্য আর্কাইভ করা হয়েছে।':action.type==='restore'?'সদস্য পুনরুদ্ধার করা হয়েছে।':'সদস্যের অবস্থা পরিবর্তন করা হয়েছে।');setAction(null);setActionState({submitting:false,error:''});retryLoad()}catch(error){setActionState({submitting:false,error:error.response?.status===403?'এই কাজের অনুমতি আপনার নেই।':error.response?.status===409?'বর্তমান অবস্থায় এই পরিবর্তন করা যাবে না।':'কাজটি সম্পন্ন করা যায়নি।'})}}
  return <div className="members-page"><header className="members-header"><div><p>Members Management</p><h1>সদস্য ব্যবস্থাপনা</h1><span>সংগঠনের সদস্যদের তথ্য, অবস্থা এবং সদস্যপদ সংক্রান্ত প্রশাসনিক ব্যবস্থাপনা।</span></div>{can('members.create')&&<button className="button button--primary" onClick={()=>setDrawer(true)}><Plus/> নতুন সদস্য যোগ করুন</button>}</header>{notice&&<p className="member-notice" role="status">{notice}</p>}{state.stats&&<section className="member-stat-grid">{[['total','মোট সদস্য'],['active','সক্রিয় সদস্য'],['inactive','নিষ্ক্রিয় সদস্য'],['expatriate','প্রবাসী সদস্য']].filter(([key])=>state.stats[key]!==undefined).map(([key,label])=><article key={key}><UsersRound/><span>{label}</span><strong>{state.stats[key]}</strong></article>)}</section>}<MemberToolbar query={effectiveQuery} onChange={change} onSearch={value=>change('search',value.trim())} onClear={clear}/>{state.status==='loading'&&<div className="members-state"><div className="spinner"/><p>সদস্যের তথ্য লোড হচ্ছে…</p></div>}{state.status==='denied'&&<AccessDenied/>}{state.status==='error'&&<div className="members-state"><h2>সদস্যের তথ্য লোড করা যায়নি</h2><button className="button button--primary" onClick={retryLoad}>আবার চেষ্টা করুন</button></div>}{state.status==='ready'&&(state.members.length?<><MembersTable members={state.members} can={can} onAction={(type,member)=>setAction({type,member})}/><div className="member-list-footer"><span>মোট {state.pagination?.total??state.members.length} জন সদস্য</span><MemberPagination pagination={state.pagination} onPage={page=>change('page',String(page))}/></div></>:<div className="members-state"><UsersRound/><h2>কোনো সদস্য পাওয়া যায়নি</h2><p>ফিল্টার পরিবর্তন করুন অথবা নতুন সদস্য যোগ করুন।</p></div>)}<MemberFormDrawer open={drawer} onClose={()=>setDrawer(false)} onCreated={created}/><MemberConfirm action={action} onCancel={()=>setAction(null)} onConfirm={confirm} submitting={actionState.submitting} error={actionState.error}/></div>
}
