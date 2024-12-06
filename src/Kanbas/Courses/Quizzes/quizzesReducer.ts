import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                questionList: quiz.questionList || [],
                title: quiz.title,
                course: quiz.course,
                publish: false,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? module : q
            ) as any;
        },
        togglePublish: (state, { payload: quizId }) => {
            state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, publish: !q.publish } : q
            );
        },
    },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, togglePublish } = quizzesSlice.actions;

export default quizzesSlice.reducer; 