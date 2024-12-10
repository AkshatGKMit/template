import { STORAGE_KEY, STORE_CONSTANTS } from '@constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageManager } from '@utility/helpers';

const { THUNK: thunk } = STORE_CONSTANTS.FAVORITE;

const getFavoriteFromStorage = createAsyncThunk(thunk.GET_FROM_STORAGE, async () => {
  const favoriteMovies =
    (await StorageManager.getStoreValue<number[]>(STORAGE_KEY.FAVORITE_MOVIES_ID)) ?? [];

  return favoriteMovies;
});

const saveFavoriteToStorage = createAsyncThunk(thunk.SAVE_TO_STORAGE, async (ids: number[]) => {
  await StorageManager.saveStoreValue(STORAGE_KEY.FAVORITE_MOVIES_ID, ids);

  return ids;
});

export { getFavoriteFromStorage, saveFavoriteToStorage };
