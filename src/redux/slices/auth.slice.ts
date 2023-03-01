import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { onSignIn } from '@redux/actions/auth.action';

interface AuthState {
  isLoggedIn: boolean;
  account: AccountEntity;
}

const initialState: AuthState = {
  isLoggedIn: false,
  account: {
    id: 0,
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    avatar: '',
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
