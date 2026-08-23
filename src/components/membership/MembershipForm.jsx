import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { genderOptions, membershipTypeLabels } from '../../constants/membership'
import { membershipService } from '../../services/membershipService'

const initial={fullName:'',fatherName:'',motherName:'',dateOfBirth:'',gender:'',phone:'',email:'',country:'',city:'',village:'',address:'',membershipType:'',reasonForJoining:'',occupation:'',organization:''}
const trim=value=>typeof value==='string'?value.trim():value
function validate(values,settings){
  const errors={}
  if(!trim(values.fullName))errors.fullName='পূর্ণ নাম লিখুন।'
  else if(values.fullName.length>120)errors.fullName='নাম সর্বোচ্চ ১২০ অক্ষরের হতে পারে।'
  if(settings.requirePhone&&!trim(values.phone))errors.phone='মোবাইল নম্বর লিখুন।'
  if(settings.requireEmail&&!trim(values.email))errors.email='ইমেইল লিখুন।'
  else if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))errors.email='সঠিক ইমেইল লিখুন।'
  if(values.dateOfBirth&&new Date(values.dateOfBirth)>new Date())errors.dateOfBirth='ভবিষ্যতের জন্মতারিখ গ্রহণযোগ্য নয়।'
  if(!settings.allowedTypes.includes(values.membershipType))errors.membershipType='সদস্যপদের ধরন নির্বাচন করুন।'
  if(trim(values.reasonForJoining).length<20)errors.reasonForJoining='যোগদানের কারণ অন্তত ২০ অক্ষরে লিখুন।'
  else if(values.reasonForJoining.length>1000)errors.reasonForJoining='যোগদানের কারণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে।'
  if(values.membershipType==='expatriate'){
    if(!trim(values.country))errors.country='প্রবাসের দেশ লিখুন।'
    if(!trim(values.city))errors.city='প্রবাসের শহর লিখুন।'
    if(!trim(values.occupation))errors.occupation='পেশা লিখুন।'
  }
  return errors
}
function Field({label,name,error,required,children,...props}){return <label className="form-field"><span>{label}{required&&<b aria-hidden="true"> *</b>}</span>{children||<input name={name} aria-invalid={Boolean(error)} aria-describedby={error?`${name}-error`:undefined} {...props}/>} {error&&<small id={`${name}-error`} className="field-error">{error}</small>}</label>}

export default function MembershipForm({settings,onSuccess}){
  const [values,setValues]=useState(()=>({...initial,membershipType:settings.allowedTypes[0]||''})),[errors,setErrors]=useState({}),[submitting,setSubmitting]=useState(false),[serverError,setServerError]=useState('')
  const update=event=>setValues(old=>({...old,[event.target.name]:event.target.value}))
  const submit=async event=>{
    event.preventDefault()
    if(submitting)return
    const nextErrors=validate(values,settings)
    setErrors(nextErrors);setServerError('')
    if(Object.keys(nextErrors).length)return
    const isExpatriate=values.membershipType==='expatriate'
    const request={
      fullName:trim(values.fullName),fatherName:trim(values.fatherName)||undefined,motherName:trim(values.motherName)||undefined,
      dateOfBirth:values.dateOfBirth||undefined,gender:values.gender||undefined,phone:trim(values.phone)||undefined,
      email:trim(values.email)||undefined,country:trim(values.country)||undefined,city:trim(values.city)||undefined,
      village:trim(values.village)||undefined,address:trim(values.address)||undefined,membershipType:values.membershipType,
      reasonForJoining:trim(values.reasonForJoining),occupation:trim(values.occupation)||undefined,
      organization:trim(values.organization)||undefined,isExpatriate,profession:isExpatriate?trim(values.occupation)||undefined:undefined,
    }
    setSubmitting(true)
    try{const result=await membershipService.submitApplication(request);onSuccess(result?.data??result)}
    catch(error){const status=error.response?.status;setServerError(status===400?'ফর্মের তথ্য পরীক্ষা করুন।':status===409?'এই যোগাযোগ তথ্য দিয়ে ইতোমধ্যে একটি সক্রিয় আবেদন রয়েছে।':status===429?'অল্প সময়ের মধ্যে অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।':'এই মুহূর্তে আবেদন জমা দেওয়া যাচ্ছে না। পরে আবার চেষ্টা করুন।')}
    finally{setSubmitting(false)}
  }
  const expatriate=values.membershipType==='expatriate'
  return <section id="membership-form" className="membership-section membership-form-section"><div className="container"><header className="membership-heading"><p className="membership-eyebrow">সদস্যপদ আবেদন</p><h2>আবেদন ফর্ম</h2><p>তারকাচিহ্নিত তথ্যগুলো প্রয়োজনীয়। জমা দেওয়ার আগে তথ্য যাচাই করুন।</p></header><form onSubmit={submit} noValidate>
    <fieldset><legend>ব্যক্তিগত তথ্য</legend><div className="membership-form-grid">
      <Field label="পূর্ণ নাম" name="fullName" value={values.fullName} onChange={update} error={errors.fullName} required maxLength="120"/>
      <Field label="পিতার নাম" name="fatherName" value={values.fatherName} onChange={update} maxLength="120"/>
      <Field label="মাতার নাম" name="motherName" value={values.motherName} onChange={update} maxLength="120"/>
      <Field label="জন্মতারিখ" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={update} error={errors.dateOfBirth}/>
      <Field label="লিঙ্গ" name="gender"><select name="gender" value={values.gender} onChange={update}>{genderOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></Field>
    </div></fieldset>
    <fieldset><legend>যোগাযোগ</legend><div className="membership-form-grid">
      <Field label="মোবাইল নম্বর" name="phone" type="tel" value={values.phone} onChange={update} error={errors.phone} required={settings.requirePhone} maxLength="30"/>
      <Field label="ইমেইল" name="email" type="email" value={values.email} onChange={update} error={errors.email} required={settings.requireEmail} maxLength="160"/>
      <Field label="দেশ" name="country" value={values.country} onChange={update} error={errors.country} required={expatriate} maxLength="100"/>
      <Field label="শহর" name="city" value={values.city} onChange={update} error={errors.city} required={expatriate} maxLength="100"/>
      <Field label="গ্রাম" name="village" value={values.village} onChange={update} maxLength="100"/>
      <Field label="ঠিকানা" name="address" value={values.address} onChange={update} maxLength="300"/>
    </div></fieldset>
    <fieldset><legend>সদস্যপদ ও পেশা</legend><div className="membership-form-grid">
      <Field label="সদস্যের ধরন" name="membershipType" error={errors.membershipType} required><select name="membershipType" value={values.membershipType} onChange={update} aria-invalid={Boolean(errors.membershipType)} aria-describedby={errors.membershipType?'membershipType-error':undefined}>{settings.allowedTypes.map(type=><option key={type} value={type}>{membershipTypeLabels[type]}</option>)}</select></Field>
      <Field label="পেশা" name="occupation" value={values.occupation} onChange={update} error={errors.occupation} required={expatriate} maxLength="120"/>
      <Field label="প্রতিষ্ঠান" name="organization" value={values.organization} onChange={update} maxLength="160"/>
      <Field label="যোগদানের কারণ" name="reasonForJoining" error={errors.reasonForJoining} required><textarea name="reasonForJoining" value={values.reasonForJoining} onChange={update} rows="5" maxLength="1000" aria-invalid={Boolean(errors.reasonForJoining)} aria-describedby={errors.reasonForJoining?'reasonForJoining-error':undefined}/></Field>
    </div>{expatriate&&<p className="conditional-note">প্রবাসী সদস্য হিসেবে দেশ, শহর ও পেশার তথ্য প্রয়োজন।</p>}</fieldset>
    {serverError&&<p className="form-server-error" role="alert"><AlertCircle/>{serverError}</p>}
    <button className="button button--primary membership-submit" disabled={submitting}>{submitting?<><LoaderCircle className="spin"/> আবেদন জমা হচ্ছে...</>:<><CheckCircle2/> আবেদন জমা দিন</>}</button>
  </form></div></section>
}
