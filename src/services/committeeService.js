import apiClient from '../api/apiClient'

const get = async (url, signal) => (await apiClient.get(url, { signal })).data
export const committeeService = {
  getCommittees: signal => get('/committees', signal),
  getCommittee: (slug, signal) => get(`/committees/${encodeURIComponent(slug)}`, signal),
}
const dataOf = value => value?.data ?? value ?? null
export const committeeList = value => {
  const data=dataOf(value)
  if(Array.isArray(data))return data
  return data?.items ?? data?.results ?? data?.docs ?? data?.committees ?? []
}
const publicMember = member => ({
  id:member._id || member.id, publicName:member.publicName, position:member.position,
  positionBn:member.positionBn, shortBio:member.shortBio, photo:member.photo,
  publicLocation:member.publicLocation, memberType:member.memberType,
  isFeatured:member.isFeatured === true, displayOrder:Number(member.displayOrder) || 0,
})
export const publicCommittee = value => {
  const item=dataOf(value)?.committee ?? dataOf(value)
  if(!item || Array.isArray(item))return null
  const members=(item.members ?? item.committeeMembers ?? []).filter(member=>member?.isPublic!==false&&member?.active!==false).map(publicMember).filter(member=>member.publicName).sort((a,b)=>a.displayOrder-b.displayOrder)
  return { id:item._id || item.id, slug:item.slug, name:item.name, nameBn:item.nameBn, description:item.description, descriptionBn:item.descriptionBn, leadershipMessage:item.leadershipMessage, term:item.term ? { label:item.term.label, startDate:item.term.startDate, endDate:item.term.endDate } : null, members }
}
