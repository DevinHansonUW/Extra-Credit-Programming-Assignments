const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(new Automata());

	document.getElementById("restart").addEventListener("click", function() {
		gameEngine.removeEntity();
		gameEngine.addEntity(new Automata());
	})

	gameEngine.start();
});
