export class Game{
	constructor(public store: any){

	}

	run(){
		// setInterval(()=>{
			
		// }, 2000)
		this.gameLoop()
	}

	gameLoop(){
		this.store.dispatch({type: 'tick'})
		requestAnimationFrame(this.gameLoop.bind(this));
	}
}