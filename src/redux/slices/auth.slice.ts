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
  reducers: {
    onSignInSuccess: (state, action: PayloadAction<AuthState['account']>) => {
      state.isLoggedIn = true;
      state.account = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(onSignIn.fulfilled, (state, action) => {
      const { account } = action.payload;
      (state.isLoggedIn = true), (state.account = account);
    });
  },
});

export const { onSignInSuccess } = authSlice.actions;

export default authSlice.reducer;
