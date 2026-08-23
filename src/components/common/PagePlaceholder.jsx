export default function PagePlaceholder({ title, note = 'এই পেজটি পরবর্তী ধাপে তৈরি করা হবে।' }) {
  return <section className="page-placeholder" aria-labelledby="placeholder-title"><div className="container"><p className="eyebrow">Client Step 01</p><h1 id="placeholder-title">{title}</h1><p>{note}</p></div></section>
}
