import { combineReducers } from "@reduxjs/toolkit";
import GameSlice from "./game.slice";

const index = () => {
    return combineReducers({
        game: GameSlice.reducer,
    });
};

export default index;
