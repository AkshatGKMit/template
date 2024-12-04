import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  ActionReducerMapBuilder,
  CaseReducer,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';

import { STORE_CONSTANTS } from '@constants';

const { NAME: sliceName, ACTIONS: actions } = STORE_CONSTANTS.COUNTER;

const initialState: CounterState = {
  value: 0,
};

export module Case {
  export namespace Increment {
    export const action = createAction<number | undefined>(`${sliceName}/${actions.INCREMENT}`);

    export const reducer: CaseReducer<
      CounterState,
      ReturnType<ActionCreatorWithOptionalPayload<number | undefined, string>>
    > = (state, action) => {
      state.value += action.payload ?? 1;
    };
  }

  export namespace Decrement {
    export const action = createAction(`${sliceName}/${actions.DECREMENT}`);

    export const reducer: CaseReducer<CounterState, ReturnType<ActionCreatorWithoutPayload>> = (
      state,
      action,
    ) => {
      state.value -= action.payload ?? 1;
    };
  }
}

const { Increment, Decrement } = Case;
const increment = Increment.action;
const decrement = Decrement.action;

const reducerBuilder = ({ addCase }: ActionReducerMapBuilder<CounterState>) => {
  addCase(increment, Increment.reducer);
  addCase(decrement, Decrement.reducer);
};

const counterReducer = createReducer<CounterState>(initialState, reducerBuilder);

export { increment, decrement };

export default counterReducer;
