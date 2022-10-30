import authSlice, { gameSlice } from "../../slices/game.slice";
import { GameMode, IGame, PlayerType,CurrentPlayer } from "../../types/game.type";

const init: IGame = {
    stopUserInteraction: false,
    mode: GameMode.UserToComputer,
    currentPlayer: CurrentPlayer.PlayerOne,
    winningPlayer: null,
    playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
    playerTwo: { name: "Player 1", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
    message: "",
    status: 0,
};
describe("Game Slice testing", () => {
    test("test the player selection and stop useriteraction", () => {
        expect(authSlice.reducer(init, gameSlice.actions.userSelection({ selection: "rock", player: init.playerOne }))).toEqual({
            stopUserInteraction: true,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        });
    });

    test("test the player selection with player 2", () => {
        expect(authSlice.reducer(init, gameSlice.actions.userSelection({ selection: "rock", player: init.playerTwo }))).toEqual({
            stopUserInteraction: true,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 0, selection: "rock", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        });
    });

    test("test the game status changes", () => {
        expect(authSlice.reducer(init, gameSlice.actions.changeGameStatus({ status: 2 }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 2,
        });
    });

    test("test the automated selection", () => {
        const value = authSlice.reducer(init, gameSlice.actions.setAutomatedSelection({ selection: "rock" }));
        expect(value.playerTwo.selection).not.toEqual("");
    });

    test("test the tie", () => {
        expect(authSlice.reducer({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer:null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "rock", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        }, gameSlice.actions.checkWinnerWithReset({ }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "", playerType: PlayerType.PlayerTwo },
            message: "Tie",
            status: 0,
        });
    });

    
    test("test check  rock and paper", () => {
        expect(authSlice.reducer({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "paper", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "rock", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        }, gameSlice.actions.checkWinnerWithReset({ }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 1, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "", playerType: PlayerType.PlayerTwo },
            message: "You: Winner",
            status: 0,
        });
    });

    test("test check paper and rock", () => {
        expect(authSlice.reducer({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        }, gameSlice.actions.checkWinnerWithReset({}))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 2, selection: "", playerType: PlayerType.PlayerTwo },
            message: "Player 1: Winner",
            status: 0,
        });
    });

    test("test reset to next round", () => {
        expect(authSlice.reducer({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            message: "please start next round",
            status: 0,
        }, gameSlice.actions.resetToNextRound({ }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            message: "please start next round",
            status: 0,
        });
    });

    test("test reset to next round - computer to computer mode", () => {
        expect(authSlice.reducer({
            stopUserInteraction: false,
            mode: GameMode.ComputerToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            message: "please start next round",
            status: 0,
        }, gameSlice.actions.resetToNextRound({ }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.ComputerToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer:null,
            playerOne: { name: "You", point: 0, selection: "rock", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 1", point: 1, selection: "paper", playerType: PlayerType.PlayerTwo },
            message: "please start next round",
            status: 0,
        });
    });

    test("test after change game mode computer to computer ", () => {
        expect(authSlice.reducer(init, gameSlice.actions.changeGameMode({ mode: GameMode.ComputerToComputer }))).toEqual({
            stopUserInteraction: true,
            mode: GameMode.ComputerToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "Player 1", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Player 2", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        });
    });

    test("test after change game mode  user to computer", () => {
        expect(authSlice.reducer(init, gameSlice.actions.changeGameMode({ mode: GameMode.UserToComputer }))).toEqual({
            stopUserInteraction: false,
            mode: GameMode.UserToComputer,
            currentPlayer: CurrentPlayer.PlayerOne,
            winningPlayer: null,
            playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
            playerTwo: { name: "Computer", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
            message: "",
            status: 0,
        });
    });
});
