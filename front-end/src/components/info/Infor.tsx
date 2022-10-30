import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { GameMode, GameType } from "../../types/game.type";
import gameSlice from "../../slices/game.slice";
import { getRandomOption } from "../../utils/logic.util";
import { PLAYER_RESPONSE_DELAY, WINNER_RESPONSE_DELAY, NEXT_ROUND_RESPONSE_DELAY } from "../../constants/game.constants";

export const Info = () => {
    const dispatch = useDispatch();
    const timerRef = useRef<number>(0);
    const timerRef2 = useRef<number>(0);
    const timerRef3 = useRef<number>(0);

    const game = useSelector((state: GameType) => state.game);

    const autoStact = () => {
        if (game.status == 1) {
            dispatch(gameSlice.actions.changeGameStatus({ status: 2 }));
            return;
        }

        dispatch(gameSlice.actions.changeGameStatus({ status: 1 }));
        dispatch(gameSlice.actions.userSelection({ selection: getRandomOption(), player: game.playerOne }));
        timerRef.current = window.setTimeout(() => {
            dispatch(gameSlice.actions.setAutomatedSelection({}));
        }, 1000 * PLAYER_RESPONSE_DELAY);

        timerRef2.current = window.setTimeout(() => {
            dispatch(gameSlice.actions.checkWinnerWithReset({}));
        }, 1000 * WINNER_RESPONSE_DELAY);

        timerRef3.current = window.setTimeout(() => {
            dispatch(gameSlice.actions.resetToNextRound({}));
            autoStact();
        }, 1000 * NEXT_ROUND_RESPONSE_DELAY);
    };

    const reset = () => {
        if (game.status == 2) {
            dispatch(gameSlice.actions.changeGameMode({ mode: GameMode.UserToComputer }));
        }
    };

    useEffect(() => {
        if (game.status == 2) {
            window.clearTimeout(timerRef.current);
            window.clearTimeout(timerRef2.current);
            window.clearTimeout(timerRef3.current);
        }
    }, [game.status]);

    return (
        <>
            <div className="resultDisplay">{game.message}</div>
            {game.mode === GameMode.ComputerToComputer && (
                <div className="gameActions" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {game.status != 3 && (
                        <>
                            <div data-testid={"callAutoStart"} onClick={autoStact} style={{ margin: 10 }}>
                                {game.status == 1 ? "Stop" : "Start"}
                            </div>
                            <div onClick={reset} style={{ margin: 10 }}>
                                reset
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
