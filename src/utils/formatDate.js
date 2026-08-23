export function formatBengaliDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return ''
  return new Intl.DateTimeFormat('bn-BD', { day:'numeric', month:'long', year:'numeric' }).format(date)
}

export function scheduleState(activity, now = new Date()) {
  const start = activity?.startDate ? new Date(activity.startDate) : null
  const end = activity?.endDate ? new Date(activity.endDate) : null
  if (!start || Number.isNaN(start.valueOf())) return null
  if (start > now) return 'upcoming'
  if (!end || (!Number.isNaN(end.valueOf()) && end >= now)) return 'ongoing'
  return null
}
