import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import quizzesReducer from "./Courses/Quizzes/quizzesReducer";
import viewReducer from "./viewReducer"

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    quizzesReducer,
    viewReducer
  },
});
export default store;

export type KanbasStore = typeof store;
export type RootState = ReturnType<KanbasStore['getState']>
export type KanbasDispatch = KanbasStore['dispatch']