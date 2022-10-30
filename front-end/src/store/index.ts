import { configureStore } from "@reduxjs/toolkit";
import root from "../slices";

const store = configureStore({
    reducer: root(),
});

export default store;
