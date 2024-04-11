class GameController {

    private static _instance: GameController;

    public get instance(): GameController {
        if (!GameController._instance) {
            GameController._instance = new GameController();
        }
        return GameController._instance;
    }

    private constructor() {
    }

}