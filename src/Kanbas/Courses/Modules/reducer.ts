import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Lesson {
  id: string,
  name: string,
  description: string,
  module: string
}

export function isLesson(obj: unknown): obj is Lesson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Lesson).id === "string" &&
    typeof (obj as Lesson).name === "string" &&
    typeof (obj as Lesson).description === "string" &&
    typeof (obj as Lesson).module === "string"
  );
}

export interface Module {
  _id: string,
  lessons: Lesson[],
  name: string,
  course: string,
  description: string,
  editing: boolean
}

export function isModule(obj :unknown): obj is Module {
  return (
    typeof obj === "object" && 
    obj !== null && 
    typeof (obj as Module)._id === "string" && 
    Array.isArray((obj as Module).lessons) && 
    (obj as Module).lessons.every(isLesson) &&
    typeof (obj as Module).name === "string" && 
    typeof (obj as Module).course === "string" &&
    typeof (obj as Module).description === "string" &&
    typeof (obj as Module).editing === "boolean"
  );
}

interface ModuleState {
  modules: Module[]
}

const initialState : ModuleState = {
  modules: [],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action : PayloadAction<Module>) => {
      const module = action.payload;
      const newModule : Module = {
        ...module,
        _id: new Date().getTime().toString(),
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(m => m._id !== action.payload);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const module = action.payload;
      state.modules = state.modules.map(m => m._id === module._id ? module : m);
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map(m => m._id === action.payload ? { ...m, editing: true } : m);
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;