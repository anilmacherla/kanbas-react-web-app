import { createSlice } from "@reduxjs/toolkit";


const getFormattedDate = (dateToChange: string) => {
    const date = new Date(dateToChange);

    // Extract the parts of the date
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Format the date string
    const formattedDateString = `${month} ${day < 10 ? '0' + day : day} at ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;

    return formattedDateString;
}
const initialState: any = {
    quizzes: [],
    quiz: {
        _id: "0",
        title: "New Title",
        course: "",
        isAvailable: false,
        availableDate: getFormattedDate(new Date().toISOString()),
        availableUntilDate: getFormattedDate(new Date().toISOString()),
        dueDate: getFormattedDate(new Date().toISOString()),
        points: 0,
        questionsCount: 0,
        published: false
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {

        addQuiz: (state, action) => {
            console.log("in action payload for addQuiz", action.payload)
            state.quizzes = [action.payload, ...state.quizzes];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz: { _id: any; }) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((a: { _id: any; }) => {
                if (a._id === action.payload._id) {
                    return action.payload;
                } else {
                    return a;
                }
            });
        },
        selectQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
            console.log("quizzes", state.quizzes)
        },

    },
});


export const { addQuiz, deleteQuiz, selectQuiz, updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;

