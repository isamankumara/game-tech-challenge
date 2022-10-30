import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import { Player } from "./components/player/Player";
import { PlayerMode } from "./components/mode/PlayerMode";
import { GameMode, PlayerType } from "./types/game.type";
import { Info } from "./components/info/Infor";
const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <div>
                    <div>Select the Type</div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <PlayerMode mode={GameMode.UserToComputer}> As Player </PlayerMode>
                        <PlayerMode mode={GameMode.ComputerToComputer}> As a Viewer </PlayerMode>
                        <PlayerMode mode={GameMode.UserToUser}> User To User </PlayerMode>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <Player playerType={PlayerType.PlayerOne} />
                    </div>
                    <div>
                        <Player playerType={PlayerType.PlayerTwo} />
                    </div>
                </div>
                <Info/>
            </div>
        </Provider>
    );
}

export default App;
