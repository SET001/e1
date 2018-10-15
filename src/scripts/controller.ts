export class Action{
  state: boolean = false
  constructor(public name: string, public keys: string[]){}
}


export class KeyboardController{
	constructor(public store: any, public actions: Action[]){

	}

	init(){
		document.addEventListener('keydown', (event) => {
			const actions = this.actions.filter((action: Action)=>action.keys.includes(event.code))
			const states = actions.reduce((acc:any, action)=>{
				acc[action.name] = true
				return acc
			} ,{})
			this.store.dispatch({type: 'controllerAction', states})
		});
		document.addEventListener('keyup', (event) => {
			const actions = this.actions.filter((action: Action)=>action.keys.includes(event.code))
			const states = actions.reduce((acc:any, action)=>{
				acc[action.name] = false
				return acc
			} ,{})
			this.store.dispatch({type: 'controllerAction', states})
		});
	}
}