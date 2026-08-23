export const accessLabels={public:'পাবলিক',internal:'অভ্যন্তরীণ',restricted:'সীমিত প্রবেশাধিকার','highly-restricted':'অত্যন্ত সীমিত'}
export const statusLabels={draft:'খসড়া','pending-approval':'অনুমোদনের অপেক্ষায়',approved:'অনুমোদিত',published:'প্রকাশিত',unpublished:'অপ্রকাশিত',archived:'আর্কাইভকৃত'}
export const categoryLabels={constitution:'গঠনতন্ত্র',policy:'নীতিমালা','meeting-minutes':'সভার কার্যবিবরণী','official-letter':'অফিসিয়াল চিঠি',report:'প্রতিবেদন',finance:'আর্থিক নথি','member-document':'সদস্য নথি',committee:'কমিটি',activity:'কার্যক্রম',notice:'নোটিশ',administrative:'প্রশাসনিক',other:'অন্যান্য'}
export const mimeTypes={'application/pdf':'PDF','image/jpeg':'JPEG','image/png':'PNG','application/msword':'DOC','application/vnd.openxmlformats-officedocument.wordprocessingml.document':'DOCX','application/vnd.ms-excel':'XLS','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'XLSX'}
export const extensions=Object.values(mimeTypes).map(v=>v.toLowerCase())
export const accessLevels=Object.keys(accessLabels)
export const documentStatuses=Object.keys(statusLabels)
export const categories=Object.keys(categoryLabels)
export const formatSize=bytes=>{if(!Number.isFinite(bytes))return '—';if(bytes<1024)return `${bytes} B`;if(bytes<1048576)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1048576).toFixed(1)} MB`}
