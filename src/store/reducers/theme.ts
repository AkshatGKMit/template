import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';

import { Slice } from '@constants';
import { ThemeColorModes, ThemeMode } from '@themes';

const { name: sliceName, actions } = Slice.theme;

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: ThemeColorModes[ThemeMode.light],
};

const switchAction = createAction<ThemeMode>(`${sliceName}/${actions.switch}`);

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<ThemeState>) => {
  addCase(switchAction, (state, actions) => {
    const mode = actions.payload;

    state.mode = mode;
    state.colors = ThemeColorModes[mode];
  });
};

const themeReducer = createReducer<ThemeState>(initialState, reducerBuilder);

export { switchAction as switchTheme };

export default themeReducer;
