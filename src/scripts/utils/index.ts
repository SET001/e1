export function lowerizeFirstLetter(s: string) {
  return s[0].toLowerCase() + s.slice(1)
}

export type ObjectOf<T> = { [field in keyof T]: T[field] }
