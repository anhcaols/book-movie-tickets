import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { onSignIn } from '@redux/actions/auth.action';
import { onUpdateUser } from '@redux/actions/accounts.action';

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
    onSignOut: state => {
      state.isLoggedIn = false;
      state.account = initialState.account;
    },
  },
  extraReducers(builder) {
    builder.addCase(onSignIn.fulfilled, (state, action) => {
      const { account } = action.payload;
      (state.isLoggedIn = true), (state.account = account);
    });
    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      state.account = { ...state.account, ...action.payload.updateValues };
    });
  },
});

export const { onSignInSuccess, onSignOut } = authSlice.actions;

export default authSlice.reducer;
