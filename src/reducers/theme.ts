import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from '@constants';
import { ThemeColorModes, ThemeMode } from '@themes';

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: ThemeColorModes[ThemeMode.light],
};

export const themeSlice = createSlice({
  name: Slice.theme,
  initialState,
  reducers: {
    switch: (state, actions: PayloadAction<ThemeMode>) => {
      const mode = actions.payload;

      state.mode = mode;
      state.colors = ThemeColorModes[mode];
    },
  },
});

export const { switch: switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
