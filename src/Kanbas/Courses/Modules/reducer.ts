import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";


const initialState = {
    modules: modules,
    module: { _id: "0", name: "New Module 123", description: "New Description", course: "0" },
};


const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, action) => {
            state.modules = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.modules,
            ];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module._id !== action.payload
            );
        },
        updateModule: (state, action) => {
            console.log("in update method:", action.payload)
            state.modules = state.modules.map((m) => {
                if (m._id === action.payload._id) {
                    console.log("first")
                    return action.payload;
                } else {
                    return m;
                }
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
    },
});


export const { addModule, deleteModule,
    updateModule, setModule } = modulesSlice.actions;
export default modulesSlice.reducer;

