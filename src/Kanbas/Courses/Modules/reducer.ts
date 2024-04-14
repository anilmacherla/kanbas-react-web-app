import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    modules: [],
    module: { _id: "0", id: "0", name: "New Module 123", description: "New Description", course: "0" },
};


const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, action) => {
            state.modules = [action.payload, ...state.modules];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module: { _id: any; }) => module._id !== action.payload
            );
        },
        updateModule: (state, action) => {
            console.log("in update method:", action.payload)
            state.modules = state.modules.map((m: { _id: any; }) => {
                if (m._id === action.payload._id) {
                    return action.payload;
                } else {
                    return m;
                }
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },
        setModules: (state, action) => {
            state.modules = action.payload;
            console.log("modules", state.modules)
        },

    },
});


export const { addModule, deleteModule, setModules,
    updateModule, setModule } = modulesSlice.actions;
export default modulesSlice.reducer;

