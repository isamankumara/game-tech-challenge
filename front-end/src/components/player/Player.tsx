import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../App";
import { options } from "../../constants/game.constants";
import gameSlice from "../../slices/game.slice";
import { GameType, ItemProps, IPlayerProps, Item, PlayerType, GameMode } from "../../types/game.type";

const ItemOption = (props: ItemProps) => {
    const dispatch = useDispatch();
    const game = useSelector((state: GameType) => state.game);

    const clickEvent = () => {
        if (game.mode === GameMode.ComputerToComputer || props.player.playerType === PlayerType.PlayerTwo || game.stopUserInteraction) {
            return;
        }

        if (game.mode === GameMode.UserToUser) {
            dispatch(gameSlice.actions.userSelection({ selection: props.name, player: props.player }));
            socket.emit("send events", { event: 6, payload: { selection: props.name, player: props.player } }, (response: any) => {});
        } else {
            dispatch(gameSlice.actions.userSelection({ selection: props.name, player: props.player }));
            setTimeout(() => {
                dispatch(gameSlice.actions.setAutomatedSelection({}));
            }, 1000);
            setTimeout(() => {
                dispatch(gameSlice.actions.checkWinnerWithReset({}));
            }, 2000);
            setTimeout(() => {
                dispatch(gameSlice.actions.resetToNextRound({}));
            }, 3000);
        }
    };

    return (
        <div
            onClick={clickEvent}
            className={props.name === props.player.selection ? props.name + "-item Item selected-item" : props.name + "-item Item"}
            style={{ border: "1px solid red", margin: "10px", padding: "10px" }}
        >
            {props.name}
        </div>
    );
};

export const Player = (props: IPlayerProps) => {
    const dispatch = useDispatch();
    const game = useSelector((state: GameType) => state.game);
    const player = props.playerType == PlayerType.PlayerOne ? game.playerOne : game.playerTwo;
    return (
        <div>
            <div>{player.name}</div>
            <div className="itemWrapper">
                {options.map((item, index) => (
                    <ItemOption name={item} player={player} key={"item_key" + index} />
                ))}
            </div>
            <div className="points">
                <span>Points </span> <h4>{player.point}</h4>
            </div>
        </div>
    );
};
