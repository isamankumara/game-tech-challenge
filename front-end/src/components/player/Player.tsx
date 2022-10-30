import { useSelector, useDispatch } from "react-redux";
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
        dispatch(gameSlice.actions.userSelection({ selection: props.name, player: props.player }));
        setTimeout(() => {
            dispatch(gameSlice.actions.setAutomatedSelection({}));
        }, 2000);
        setTimeout(() => {
            dispatch(gameSlice.actions.checkWinnerWithReset({}));
        }, 4000);
        setTimeout(() => {
            dispatch(gameSlice.actions.resetToNextRound({}));
        }, 6000);
    };

    return (
        <div
            onClick={clickEvent}
            className={props.name === props.player.selection ? "Item selected-item" : "Item"}
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
        <div style={{ border: "1px solid red", margin: "10px" }}>
            <div>{player.name}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {options.map((item, index) => (
                    <ItemOption name={item} player={player} key={"item_key" + index} />
                ))}
            </div>
            <div>Points : {player.point}</div>
        </div>
    );
};
