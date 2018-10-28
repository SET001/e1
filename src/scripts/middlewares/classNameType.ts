import { lowerizeFirstLetter } from '../utils'

export const classNameType = () => (next: Function) => (action: any) => {
  let type = action.type
  if ((!type || type.length === 0) && action.constructor.name !== 'Object') {
    type = lowerizeFirstLetter(action.constructor.name.split('Action').shift())
  }
  next({
    ...action,
    type,
  })
}
