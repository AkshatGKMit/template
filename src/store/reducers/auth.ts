import { STORAGE_KEY, STORE_CONSTANTS } from '@constants';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageManager } from '@utility/helpers';
import axios from 'axios';

const { NAME: name, THUNK: thunk } = STORE_CONSTANTS.USER;

const initialState: AuthState = {
  loading: false,
  user: null,
};

export const loginUser = createAsyncThunk(
  thunk.LOGIN,
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
  addCase(loginUser.pending, (state) => {
    state.loading = true;
  });
  addCase(loginUser.fulfilled, (state, actions) => {
    const { data } = actions.payload;

    state.user = actions.payload.data;
    state.loading = false;

    StorageManager.saveStoreValue(STORAGE_KEY.USER, data);
  });
  addCase(loginUser.rejected, (state, actions) => {
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
