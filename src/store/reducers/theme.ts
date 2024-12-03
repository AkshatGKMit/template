import {
  ActionCreatorWithPayload,
  ActionReducerMapBuilder,
  CaseReducer,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';

import { ReducerConstants } from '@constants';
import { ThemeColorModes, ThemeMode } from '@themes';

const { name: sliceName, actions } = ReducerConstants.theme;

const initialState: ThemeState = {
  mode: ThemeMode.light,
  colors: ThemeColorModes[ThemeMode.light],
};

export namespace Switch {
  export const action = createAction<ThemeMode>(`${sliceName}/${actions.switch}`);

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
