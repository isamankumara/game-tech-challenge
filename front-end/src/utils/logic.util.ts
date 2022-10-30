import { options, winningOptions } from "../constants/game.constants";

export const getRandomOption = (): string => {
    const rand = Math.floor(0 + Math.random() * (options.length - 0));
    return options[rand];
};

export const checkWinner = (userOneSelection: string, userTwoSelection: string) => {
    var winner = winningOptions[userOneSelection + "_" + userTwoSelection];

    if (userOneSelection === userTwoSelection) {
        return "tie"
    }

    if (winner != undefined) {
        return winner;
    }

    winner = winningOptions[userTwoSelection + "_" + userOneSelection];
    if (winner != undefined) {
       return winner;
    }
};
