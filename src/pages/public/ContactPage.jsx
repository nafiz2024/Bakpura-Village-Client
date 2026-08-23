import { useEffect, useState } from 'react'
import ContactForm from '../../components/contact/ContactForm'
import ContactHero from '../../components/contact/ContactHero'
import { ContactClosing, ContactInfo, PurposeGuide, SocialLinks } from '../../components/contact/ContactSections'
import { homeService, payload } from '../../services/homeService'
import '../../styles/contact.css'

export default function ContactPage(){const [settings,setSettings]=useState({});useEffect(()=>{let current=true;homeService.settings().then(value=>{if(current)setSettings(payload(value)||{})}).catch(()=>{});return()=>{current=false}},[]);return <><ContactHero banner={settings.branding?.banner}/><ContactInfo contact={settings.contact||{}}/><ContactForm/><PurposeGuide/><SocialLinks social={settings.social}/><ContactClosing membershipEnabled={settings.membership?.applicationsEnabled===true}/></>}
