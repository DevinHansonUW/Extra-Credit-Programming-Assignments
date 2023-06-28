const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(new Automata(ctx));

	//Restart the simulation by making a new Automata entity
	document.getElementById("restart").addEventListener("click", function() {
		gameEngine.removeEntity();
		gameEngine.addEntity(new Automata(ctx));
	})

	gameEngine.start();
});
