import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : {currentView: string | null} = {
  currentView: null,
};
const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<string | null>) => {
      state.currentView = action.payload;
    },
  },
});
export const { setCurrentView } = viewSlice.actions;
export default viewSlice.reducer;