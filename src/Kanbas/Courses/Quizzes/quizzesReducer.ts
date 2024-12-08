import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isQuizQuestion, QuestionType, QuizQuestion } from "./QuestionEditors";

export enum QuizType {
    // this is bound to int based enum
    GRADED = 0,
    UNGRADED = 1
}

function isQuizType(obj: unknown): obj is QuizType {
    return Object.values(QuizType).includes(obj as QuizType)
}

export enum AssignmentGroup {
    // this is bound to int based enum
    ASSIGNMENTS = 0,
    QUIZZES = 1,
    EXAMS = 2,
    PROJECTS = 3
}

function isAssignmentGroup(obj: unknown): obj is AssignmentGroup {
    return Object.values(AssignmentGroup).includes(obj as AssignmentGroup);
}


export interface Quiz {
    _id: string,
    course: string,
    title: string,
    description: string,
    type: QuizType,
    group: AssignmentGroup,
    shuffleAnswers: boolean,
    timeLimit: number,
    attempts: number,
    assignTo: string,
    due: string,
    availableFrom: string,
    availableUntil: string,
    questions: QuizQuestion[],
    published: boolean,
    points: number
}

export function isQuiz(obj: unknown): obj is Quiz {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const quiz = obj as Quiz;

    return typeof quiz._id === 'string' &&
        typeof quiz.course === 'string' &&
        typeof quiz.title === 'string' &&
        typeof quiz.description === 'string' &&
        isQuizType(quiz.type) &&
        isAssignmentGroup(quiz.group) &&
        typeof quiz.shuffleAnswers === 'boolean' &&
        typeof quiz.timeLimit === 'number' &&
        typeof quiz.attempts === 'number' &&
        typeof quiz.assignTo === 'string' &&
        typeof quiz.due === 'string' &&
        typeof quiz.availableFrom === 'string' &&
        typeof quiz.availableUntil === 'string' &&
        Array.isArray(quiz.questions) && quiz.questions.every(isQuizQuestion) &&
        typeof quiz.published === 'boolean';
}

interface QuizState {
    quizzes: Quiz[]
}

const initialState : QuizState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuiz: (state, action : PayloadAction<Quiz>) => {
            const quiz = action.payload;
            const newQuiz: Quiz = {
                _id: new Date().getTime().toString(),
                course: quiz.course,
                title: quiz.title,
                description: quiz.description,
                type: quiz.type,
                group: quiz.group,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                attempts: quiz.attempts,
                assignTo: quiz.assignTo,
                due: quiz.due,
                availableFrom: quiz.availableFrom,
                availableUntil: quiz.availableUntil,
                questions: quiz.questions,
                published: quiz.published,
                points: quiz.questions.map(q => q.pts).reduce((l, r) => l + r, 0)
            };
            state.quizzes = [...state.quizzes, newQuiz];
        },
        deleteQuiz: (state, action: PayloadAction<string>) => {
            const quizId = action.payload;
            state.quizzes = state.quizzes.filter(
                q => q._id !== quizId);
        },
        updateQuiz: (state, action : PayloadAction<Quiz>) => {
            const quiz = action.payload;
            state.quizzes = state.quizzes.map(q =>
                q._id === quiz._id ? quiz : q
            );
        },
        togglePublish: (state, action : PayloadAction<string>) => {
            const quizId = action.payload;
            state.quizzes.map(q =>
                q._id === quizId ? { ...q, published: !q.published } : q
            );
        },
    },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, togglePublish } = quizzesSlice.actions;

export default quizzesSlice.reducer; 