export const currencies=['BDT','USD','GBP','EUR','SAR','AED']
export const paymentMethods={cash:'নগদ',bank:'ব্যাংক',bkash:'বিকাশ',nagad:'নগদ',card:'কার্ড','international-transfer':'আন্তর্জাতিক ট্রান্সফার',other:'অন্যান্য'}
export const financeStatuses={pending:'অপেক্ষমাণ',approved:'অনুমোদিত',rejected:'প্রত্যাখ্যাত',voided:'বাতিল'}
export const donationStatuses={pending:'যাচাইয়ের অপেক্ষায়',verified:'যাচাইকৃত',rejected:'প্রত্যাখ্যাত',cancelled:'বাতিল'}
export const incomeCategories={donation:'অনুদান','member-contribution':'সদস্যের অবদান','membership-fee':'সদস্যপদ ফি','other-income':'অন্যান্য আয়'}
export const expenseCategories={'activity-expense':'কার্যক্রম ব্যয়','relief-expense':'ত্রাণ ব্যয়','administrative-expense':'প্রশাসনিক ব্যয়','operational-expense':'পরিচালন ব্যয়','other-expense':'অন্যান্য ব্যয়'}
export const donationPurposes={general:'সাধারণ',education:'শিক্ষা',medical:'চিকিৎসা',relief:'ত্রাণ','community-development':'কমিউনিটি উন্নয়ন',activity:'কার্যক্রম',other:'অন্যান্য'}

const symbols={BDT:'৳',USD:'$',GBP:'£',EUR:'€',SAR:'SAR',AED:'AED'}
export function formatMoney(amount,currency){
  if(amount===undefined||amount===null||amount==='')return '—'
  const raw=String(amount),match=raw.match(/^(-?)(\d+)(?:\.(\d+))?$/)
  if(!match)return `${currency||''} ${raw}`.trim()
  const grouped=match[2].replace(/\B(?=(\d{3})+(?!\d))/g,','),decimal=match[3]?`.${match[3]}`:''
  return `${symbols[currency]||currency||''} ${match[1]}${grouped}${decimal}`.trim()
}
