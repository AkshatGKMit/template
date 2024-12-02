import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '@reducers/counter';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
