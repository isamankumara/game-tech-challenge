import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import io from "socket.io-client";
import store from "./store";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Player } from "./components/player/Player";
import { PlayerMode } from "./components/mode/PlayerMode";
import { GameMode, PlayerType } from "./types/game.type";
import { Info } from "./components/info/Infor";
import gameSlice from "./slices/game.slice";
import { GameType } from "./types/game.type";

export const socket = io(process.env.REACT_APP_SOCKET_HOST || "");

const Wrap = () => {
    const dispatch = useDispatch();
    const game = useSelector((state: GameType) => state.game);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("disconnect", () => {
            console.log("disconnet");
        });

        socket.on("send events", (res) => {
            dispatch(gameSlice.actions.changeGameStatus({ status: res.event }));
        });

        socket.on("pass option", (res) => {
            console.log(res.payload.player);
            var player = res.payload.player;
            player.playerType = 2;

            dispatch(gameSlice.actions.userSelection({ selection: res.payload.selection, player: player, event: res.event }));

            setTimeout(() => {
                dispatch(gameSlice.actions.updateUserInteraction({ stopUserInteraction: false, event: res.event }));
            }, 1000);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("send events");
        };
    }, []);

    useEffect(() => {
        if (game.mode === GameMode.UserToUser) {
            if (game.playerOne.selection != "" && game.playerTwo.selection != "" && game.playerTwo.displaySelection) {
                setTimeout(() => {
                    dispatch(gameSlice.actions.checkWinnerWithReset({}));
                }, 1000);
                setTimeout(() => {
                    dispatch(gameSlice.actions.resetToNextRound({}));
                }, 2000);
            }
        }
    }, [game.stopUserInteraction]);

    return (
        <div className="App">
            <div className="gameWindow">
                <div>
                    <h2>Select the Type</h2>
                    <div className="gameModeWrapper">
                        <PlayerMode mode={GameMode.UserToComputer}> As Player </PlayerMode>
                        <PlayerMode mode={GameMode.ComputerToComputer}> As a Viewer </PlayerMode>
                        <PlayerMode mode={GameMode.UserToUser}> User To User </PlayerMode>
                    </div>
                </div>
                <div className="playArea">
                    <div className="player player-left">
                        <Player playerType={PlayerType.PlayerOne} />
                    </div>
                    <div className="player player-right">
                        <Player playerType={PlayerType.PlayerTwo} />
                    </div>
                </div>
                <Info />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <Wrap />
        </Provider>
    );
};

export default App;
