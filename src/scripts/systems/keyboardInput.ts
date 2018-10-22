export class Action{
  state: boolean = false;
  constructor(public name: string, public keys: string[]) {}
}

export class KeyboardInput{
  constructor(public actions: Action[]) {

}

  init(store: any) {
  document.addEventListener('keydown', (event) => {
  const actions = this.actions.filter((action: Action) => action.keys.includes(event.code));
  const states = actions.reduce((acc:any, action) => {
  acc[action.name] = true;
  return acc;
} ,                           {});
  store.dispatch({ type: 'controllerAction', states });
});
  document.addEventListener('keyup', (event) => {
  const actions = this.actions.filter((action: Action) => action.keys.includes(event.code));
  const states = actions.reduce((acc:any, action) => {
  acc[action.name] = false;
  return acc;
} ,                           {});
  store.dispatch({ type: 'controllerAction', states });
});
}

  reducer(action:any, state: any) {
  switch (action.type){
  case 'controllerAction':
    const newState = {
  ...state,
  ...(action.states),
};
    return newState;
  default:
    return state;
}
}
}
