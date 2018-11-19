export function lowerizeFirstLetter(s: string) {
  return s[0].toLowerCase() + s.slice(1)
}

export function lowerizeFirstLetterEx(s: string) {
  const ns = []
  for (let i = 0; i < s.length; i++) {
    let char = ''
    if (i === 0 || i === s.length - 1 || s.charCodeAt(i + 1) < 97) {
    	char = s[i].toLowerCase()
    } else char = s[i]
    ns.push(char)
  }
  return ns.join('')
}

export type ObjectOf<T> = { [field in keyof T]: T[field] }
