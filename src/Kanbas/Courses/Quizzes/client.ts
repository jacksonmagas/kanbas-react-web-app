import axios from "axios";
import { Quiz } from "./quizzesReducer";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUIZ_ATTEMPTS_API = `${REMOTE_SERVER}/api/quizAttempts`

export const updateQuiz = async (quiz: Quiz) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

interface Answer {
    question: string,
    answer: string
}

export interface QuizAttempt {
    quiz: string,
    user: string,
    answers: Answer[]
}

export const createQuizAttempt = async (quizAttempt: QuizAttempt) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_ATTEMPTS_API}`, quizAttempt);
    return data;
}

export const deleteQuizAttempt = async (attemptId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${attemptId}`);
    return response.data;
}

export const findQuizAttempts = async (uid: string, qid: string) => {
    const response = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${uid}/${qid}`);
    return response.data
}