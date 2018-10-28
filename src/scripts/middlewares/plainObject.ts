export const plainObject = () => (next: Function) => (action: any) => next({ ...action })
