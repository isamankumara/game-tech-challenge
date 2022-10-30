import { IWinningOptions } from "../types/game.type";

export const PLAYER_RESPONSE_DELAY = 1;
export const WINNER_RESPONSE_DELAY = 2;
export const NEXT_ROUND_RESPONSE_DELAY = 3;

export const options = ["rock", "paper", "scissors"];

export const winningOptions: IWinningOptions = {
    rock_scissors: "rock",
    rock_paper: "paper",
    paper_scissors: "scissors",
};
