import { createSlice } from "@reduxjs/toolkit";

export type Assignment = {
  _id : string,
  course : string,
  name : string,
  description : string,
  stday : string,
  sttime : string,
  dueday : string,
  duetime : string,
  endday : string,
  endtime : string,
  pts : number,
}

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment } : { payload: Assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        course: assignment.course,
        name: assignment.name,
        stday: assignment.stday,
        sttime: assignment.sttime,
        dueday: assignment.dueday,
        duetime: assignment.duetime,
        pts: assignment.pts
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId } : { payload: string }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment } : { payload: Assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId } : { payload: string }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;