import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : {currentUser: string | null} = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;