

//String to title
export function title(str) {
  const regex = /\w\S*/g
  const titleParts = str.match(regex)
  return titleParts?.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ')
}