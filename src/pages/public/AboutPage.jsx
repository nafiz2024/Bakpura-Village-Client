import { useEffect, useState } from 'react'
import AboutHero from '../../components/about/AboutHero'
import { LocalConnection, OurStory, WhoWeAre, WhyWeExist } from '../../components/about/AboutNarrative'
import { CoreValues, MissionVision, Objectives, Transparency } from '../../components/about/AboutPrinciples'
import { AboutCTA, InspirationalMessage } from '../../components/about/AboutClosing'
import { homeService, payload } from '../../services/homeService'
import '../../styles/about.css'

export default function AboutPage() {
  const [settings,setSettings]=useState({})
  useEffect(()=>{let current=true;homeService.settings().then(value=>{if(current)setSettings(payload(value)||{})}).catch(()=>{});return()=>{current=false}},[])
  const slogan=settings.organization?.sloganBn || settings.organization?.slogan
  return <><AboutHero settings={settings}/><WhoWeAre settings={settings}/><OurStory/><MissionVision settings={settings}/><Objectives/><CoreValues/><LocalConnection/><WhyWeExist/><Transparency/><InspirationalMessage slogan={slogan}/><AboutCTA membership={settings.membership} donation={settings.donation}/></>
}
