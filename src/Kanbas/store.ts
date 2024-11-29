import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./enrollmentsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
  },
});
export default store;

export type KanbasStore = typeof store;
export type RootState = ReturnType<KanbasStore['getState']>
export type KanbasDispatch = KanbasStore['dispatch']