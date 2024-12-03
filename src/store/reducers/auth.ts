import { StorageKey, StoreConstants } from '@constants';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageManager } from '@utility/helpers';
import axios from 'axios';

const { name, thunk } = StoreConstants.user;

const initialState: AuthState = {
  loading: false,
  user: null,
};

export const loginThunk = createAsyncThunk(
  thunk.login,
  async (loginRequestData: UserLoginRequestType) => {
    const loginResponse = await axios.post<User>(
      'https://dummyjson.com/auth/login',
      loginRequestData,
      { withCredentials: true },
    );

    return loginResponse;
  },
);

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<AuthState>) => {
  addCase(loginThunk.pending, (state) => {
    state.loading = true;
  });
  addCase(loginThunk.fulfilled, (state, actions) => {
    const { data } = actions.payload;

    state.user = actions.payload.data;
    state.loading = false;

    StorageManager.saveStoreValue(StorageKey.user, data);
  });
  addCase(loginThunk.rejected, (state, actions) => {
    state.error = actions.error;
    state.loading = false;
  });
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: reducerBuilder,
});

const authReducer = authSlice.reducer;

export default authReducer;
