import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../App";
import gameSlice from "../../slices/game.slice";
import { GameType, PlayerModeProps, GameMode } from "../../types/game.type";

export const PlayerMode = (props: PlayerModeProps) => {
    const dispatch = useDispatch();
    const game = useSelector((state: GameType) => state.game);

    return (
        <div
            className={game.mode !== props.mode ? "GameMode" : "GameMode selectedMode"}
            onClick={() => {
                dispatch(gameSlice.actions.changeGameMode({ mode: props.mode }));
                socket.emit("send events", {event: 1}, (response: any) => {
                    if (response.event > 2 ) {
                        dispatch(gameSlice.actions.changeGameStatus({status: response.event}))
                    }
                });
            }}
        >
            {props.children}
        </div>
    );
};
