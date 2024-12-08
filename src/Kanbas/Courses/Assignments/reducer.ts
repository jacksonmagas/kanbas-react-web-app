import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Assignment = {
  _id : string,
  course : string,
  name : string,
  description : string,
  sttime : string,
  duetime : string,
  endtime : string,
  pts : number,
}

export function isAssignment(obj: unknown): obj is Assignment {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Assignment)._id === "string" &&
    typeof (obj as Assignment).course === "string" &&
    typeof (obj as Assignment).name === "string" &&
    typeof (obj as Assignment).description === "string" &&
    typeof (obj as Assignment).sttime === "string" &&
    typeof (obj as Assignment).duetime === "string" &&
    typeof (obj as Assignment).endtime === "string" &&
    typeof (obj as Assignment).pts === "number"
  );
}

interface AssignmentState {
  assignments: Assignment[];
}

const initialState: AssignmentState = {
  assignments: []
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      const newAssignment = {
        ...action.payload,
        _id: new Date().getTime().toString()
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(a => a._id !== action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const assignment = action.payload;
      state.assignments = state.assignments.map(a => a._id === assignment._id ? assignment : a);
    },
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map(a =>
        a._id === action.payload ? { ...a, editing: true } : a);
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;