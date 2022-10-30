import { createSlice } from "@reduxjs/toolkit";
import { PLAYER_RESPONSE_DELAY } from "../constants/game.constants";
import { CurrentPlayer, GameMode, IGame, PlayerType } from "../types/game.type";
import { checkWinner, getRandomOption } from "../utils/logic.util";

const init: IGame = {
    stopUserInteraction: false,
    mode: GameMode.UserToComputer,
    currentPlayer: CurrentPlayer.PlayerOne,
    winningPlayer: null,
    playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne, displaySelection: true },
    playerTwo: { name: "Computer", point: 0, selection: "", playerType: PlayerType.PlayerTwo, displaySelection: true },
    message: "",
    status: 0,
};

export const gameSlice = createSlice({
    name: "game",
    initialState: init,
    reducers: {
        userSelection: (state, action) => {
            if (action.payload.player.playerType == PlayerType.PlayerOne) {
                state.playerOne.selection = action.payload.selection;
            } else {
                state.playerTwo.selection = action.payload.selection;
            }

            state.currentPlayer = CurrentPlayer.PlayerOne;
            state.stopUserInteraction = true;
            if (action.payload.event === 7) {
                state.stopUserInteraction = false;
                state.currentPlayer = CurrentPlayer.PlayerTwo;
                state.playerTwo.displaySelection = false;
                console.log("here");
            } else {
                if (state.playerOne.displaySelection && state.playerOne.selection != "") {
                    state.playerTwo.displaySelection = true;
                }
            }
        },
        updateUserInteraction: (state, action) => {
            state.stopUserInteraction = action.payload.stopUserInteraction;
            if (action.payload.event === 7) {
                state.message = "Please select your option";
            }
        },
        setAutomatedSelection: (state, action) => {
            state.playerTwo.selection = getRandomOption();
        },
        changeGameStatus: (state, action) => {
            console.log(action.payload);
            state.status = action.payload.status;
            if (action.payload.status === 3) {
                state.message = "Waiting for network user";

                state.playerOne.selection = "";
                state.playerTwo.selection = "";
                state.winningPlayer = null;
                state.playerOne.point = 0;
                state.playerTwo.point = 0;
            }
            if (action.payload.status === 4) {
                state.message = "You got network user you can start";
                state.stopUserInteraction = false;
            }

            if (action.payload.status === 5) {
                state.message = "You got network user. That user will start";
                state.stopUserInteraction = true;
            }
        },
        checkWinnerWithReset: (state, action) => {
            const winner = checkWinner(state.playerOne.selection!, state.playerTwo.selection!);

            if (winner === "tie") {
                state.message = "Tie";
            } else {
                if (winner === state.playerOne.selection) {
                    state.winningPlayer = state.playerOne;
                    state.playerOne.point = state.playerOne.point + 1;
                    state.message = state.playerOne.name + ": Winner";
                } else {
                    state.winningPlayer = state.playerTwo;
                    state.playerTwo.point = state.playerTwo.point + 1;
                    state.message = state.playerTwo.name + ": Winner";
                }
            }

            state.playerOne.selection = "";
            state.playerTwo.selection = "";
            state.winningPlayer = null;
        },
        resetToNextRound: (state, action) => {
            state.message = "please start next round";
            if (state.mode !== GameMode.ComputerToComputer) {
                state.stopUserInteraction = false;
                state.winningPlayer = null;
            }

            if (state.mode == GameMode.UserToUser) {
                state.stopUserInteraction = state.currentPlayer == 1;
                state.message = state.currentPlayer == 2 ? "you need start next round" : "other use will start next round";
            }
        },
        changeGameMode: (state, action) => {
            state.mode = action.payload.mode;
            if (state.mode === GameMode.ComputerToComputer) {
                state.playerOne.name = "Player 1";
                state.playerTwo.name = "Player 2";
                state.stopUserInteraction = true;
            } else if (state.mode === GameMode.UserToUser) {
                state.playerOne.name = "You";
                state.playerTwo.name = "Network User";
                state.stopUserInteraction = true;
            } else {
                state.playerOne.name = "You";
                state.playerTwo.name = "Computer";
                state.stopUserInteraction = false;
            }
            state.playerOne.point = 0;
            state.playerTwo.point = 0;
            state.playerOne.selection = "";
            state.playerTwo.selection = "";
        },
        updateUserTwoDisply: (state, action) => {
            state.playerTwo.displaySelection = true;
        },
    },
});

export default gameSlice;
