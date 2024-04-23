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
        availableFromDate: '2024-02-02',
        availableUntilDate: '2024-05-05',
        dueDate: '2024-04-28',
        points: 0,
        questionsCount: 0,
        published: false,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        accessCode: "",
        instructions: "",
        options: {
            oneQAtATime: true,
            requireWebCam: false,
            lockAnswersAfterFinalSubmission: false,
            showCorrectAnswers: false,
            whenCorrectAnswer: "Immediately",
            shuffleAnswers: true,
            doesHaveTimer: false,
            timeLimit: 20,
            allowMultipleAttempts: false,
        },
        queAndAns: [{
            questionTitle: "",
            questionContent: "",
            answers: [],
            questionType: "",
            blanks: [],
            points: ""
        }]
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
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
        },

    },
});


export const { addQuiz, deleteQuiz, selectQuiz, updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;

