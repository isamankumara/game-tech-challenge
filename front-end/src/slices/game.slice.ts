import { createSlice } from "@reduxjs/toolkit";
import { PLAYER_RESPONSE_DELAY } from "../constants/game.constants";
import { GameMode, IGame, PlayerType } from "../types/game.type";
import { checkWinner, getRandomOption } from "../utils/logic.util";

const init: IGame = {
    stopUserInteraction: false,
    mode: GameMode.UserToComputer,
    winningPlayer: null,
    playerOne: { name: "You", point: 0, selection: "", playerType: PlayerType.PlayerOne },
    playerTwo: { name: "Computer", point: 0, selection: "", playerType: PlayerType.PlayerTwo },
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
            state.stopUserInteraction = true;
        },
        setAutomatedSelection: (state, action) => {
            state.playerTwo.selection = getRandomOption();
        },
        changeGameStatus: (state, action) => {
            state.status = action.payload.status;
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
        },
        changeGameMode: (state, action) => {
            state.mode = action.payload.mode;
            if (state.mode === GameMode.ComputerToComputer) {
                state.playerOne.name = "Player 1";
                state.playerTwo.name = "Player 2";
                state.stopUserInteraction = true;
            }else if (state.mode === GameMode.UserToUser) {
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
    },
});

export default gameSlice;
