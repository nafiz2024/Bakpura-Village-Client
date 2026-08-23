import { CalendarDays } from 'lucide-react'
import ImageWithFallback from '../common/ImageWithFallback'
import { formatBengaliDate } from '../../utils/formatDate'

export default function GalleryAlbums({albums,selected,onSelect}){if(!albums.length)return null;return <section className="gallery-section albums-section"><div className="container"><header className="gallery-heading"><p className="gallery-eyebrow">সংগঠিত সংগ্রহ</p><h2>অ্যালবাম</h2></header><div className="album-grid">{albums.map(x=><button type="button" key={x.slug||x._id} className={selected===(x.slug||x._id)?'selected':''} onClick={()=>onSelect(x.slug||x._id)}><ImageWithFallback src={x.coverImage?.url||x.coverImage} alt={`${x.titleBn||x.title} অ্যালবামের কভার`} className="album-cover"/><span><strong>{x.titleBn||x.title}</strong>{x.description&&<p>{x.description}</p>}{formatBengaliDate(x.publishedAt)&&<small><CalendarDays size={13}/>{formatBengaliDate(x.publishedAt)}</small>}</span></button>)}</div></div></section>}
