import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import { getFavoriteFromStorage, saveFavoriteToStorage } from '@store/actions/favoriteActions';

const { NAME: sliceName } = STORE_CONSTANTS.FAVORITE;

const initialState: FavoriteState = {
  movies: [],
};

const extraReducerBuilder = ({ addCase }: ActionReducerMapBuilder<FavoriteState>) => {
  addCase(getFavoriteFromStorage.fulfilled, (state, { payload }) => {
    state.movies = payload;
  });

  addCase(saveFavoriteToStorage.fulfilled, (state, { payload }) => {
    state.movies = payload;
  });
};

const favoriteSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: extraReducerBuilder,
});

const favoriteReducer = favoriteSlice.reducer;

export default favoriteReducer;
