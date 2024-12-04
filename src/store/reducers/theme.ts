import {
  ActionCreatorWithPayload,
  ActionReducerMapBuilder,
  CaseReducer,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';
import { ThemeColorModes, ThemeMode } from '@themes';

const { NAME: sliceName, ACTIONS: actions } = STORE_CONSTANTS.THEME;

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: ThemeColorModes[ThemeMode.light],
};

export namespace Switch {
  export const action = createAction<ThemeMode>(`${sliceName}/${actions.SWITCH}`);

  export const reducer: CaseReducer<
    ThemeState,
    ReturnType<ActionCreatorWithPayload<ThemeMode, string>>
  > = (state, actions) => {
    const mode = actions.payload;

    state.mode = mode;
    state.colors = ThemeColorModes[mode];
  };
}

const switchTheme = Switch.action;

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<ThemeState>) => {
  addCase(switchTheme, Switch.reducer);
};

const themeReducer = createReducer<ThemeState>(initialState, reducerBuilder);

export { switchTheme };

export default themeReducer;
