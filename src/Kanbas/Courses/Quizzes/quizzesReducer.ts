import { createSlice } from "@reduxjs/toolkit";
import { QuizQuestion } from "./QuestionEditors";

export enum QuizType {
    GRADED,
    UNGRADED
}

export enum AssignmentGroup {
    ASSIGNMENTS,
    QUIZZES,
    EXAMS
}


export interface Quiz {
    _id: string,
    instructions: string,
    type: QuizType,
    group: AssignmentGroup,
    shuffleAnswers: boolean,
    timeLimit: number,
    multipleAttempts: boolean,
    assignTo: string,
    due: string,
    availableFrom: string,
    availableUntil: string,
    questions: QuizQuestion[]
}

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