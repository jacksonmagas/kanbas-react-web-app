import { createSlice } from "@reduxjs/toolkit";

export interface Enrollment {
    _id : string,
    user : string,
    course : string
}

const initialState : {enrollments: Enrollment[]} = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: enrollment } : { payload: Enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as Enrollment[];
    },
    deleteEnrollment: (state, { payload: enrollment } : { payload: Enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (a: Enrollment) => a._id !== enrollment._id || a.user != enrollment.user);
    },
  },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;