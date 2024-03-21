import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";


const initialState = {
    assignments: assignments,
    assignment: {
        title: "New Assignment", course: "Course", description: 'New Description',
        points: '100',
        dueDate: '2021-12-11',
        availableFrom: '2021-12-11',
        untilDate: '2021-12-12',
        _id: "0",
    },
};


const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                {
                    title: action.payload.title,
                    course: action.payload.course,
                    _id: Math.random().toString(36).substr(2, 9),
                    points: action.payload.points,
                    dueDate: action.payload.dueDate,
                    availableFrom: action.payload.availableFrom,
                    untilDate: action.payload.untilDate,
                    description: action.payload.description,
                },
                ...state.assignments,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((a) => {
                if (a._id === action.payload._id) {
                    return action.payload;
                } else {
                    return a;
                }
            });
        },
        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
    },
});


export const { addAssignment, deleteAssignment, selectAssignment, updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

