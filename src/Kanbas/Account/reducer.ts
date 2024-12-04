import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as User)._id === 'string' &&
        typeof (value as User).username === 'string' &&
        typeof (value as User).password === 'string' &&
        typeof (value as User).firstName === 'string' &&
        typeof (value as User).lastName === 'string' &&
        typeof (value as User).email === 'string' &&
        typeof (value as User).dob === 'string' &&
        typeof (value as User).role === 'string' &&
        typeof (value as User).loginId === 'string' &&
        typeof (value as User).section === 'string' &&
        typeof (value as User).lastActivity === 'string' &&
        typeof (value as User).totalActivity === 'string'
    );
}

const initialState : {currentUser: User | null} = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;