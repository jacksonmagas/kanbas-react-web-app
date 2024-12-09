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
    if (typeof quiz._id !== 'string') {
        console.log(`id ${quiz._id} not string`)
        return false;
    }
    if (typeof quiz.course !== 'string') {
        console.log(`course ${quiz.course} not string`)
        return false;
    }
    if (typeof quiz.title !== 'string') {
        console.log(`title ${quiz.title} not string`)
        return false;
    }
    if (typeof quiz.description !== 'string') {
        console.log(`description ${quiz.description} not string`)
        return false;
    }
    if (!isQuizType(quiz.type)) {
        console.log(`type ${quiz.type} not quiz type`)
        return false;
    }
    if (!isAssignmentGroup(quiz.group)) {
        console.log(`group ${quiz.group} not assignment group`)
        return false;
    }
    if (typeof quiz.shuffleAnswers !== 'boolean') {
        console.log(`shuffle answers ${quiz.shuffleAnswers} not boolean`)
        return false;
    }
    if (typeof quiz.timeLimit !== 'number') {
        console.log(`time limit ${quiz.timeLimit} not number`)
        return false;
    }
    if (typeof quiz.attempts !== 'number') {
        console.log(`attempts ${quiz.attempts} not number`)
        return false;
    }
    if (typeof quiz.assignTo !== 'string') {
        console.log(`assignt to ${quiz.assignTo} not string`)
        return false;
    }
    if (typeof quiz.due !== 'string') {
        console.log(`due ${quiz.due} not string`)
        return false;
    }
    if (typeof quiz.availableFrom !== 'string') {
        console.log(`available from ${quiz.availableFrom} not string`)
        return false;
    }
    if (typeof quiz.availableUntil !== 'string') {
        console.log(`available until ${quiz.availableFrom} not string`)
        return false;
    }
    if (!Array.isArray(quiz.questions) || !quiz.questions.every(isQuizQuestion)) {
        console.log(`questions ${quiz.questions} not questions`)
        return false;
    }
    if (typeof quiz.published !== 'boolean') {
        console.log(`published ${quiz.published} not boolean`)
        return false;
    }
    return true;
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
            state.quizzes = [...state.quizzes, quiz];
            console.log(state.quizzes);
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