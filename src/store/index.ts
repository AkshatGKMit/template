import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './reducers/counter';
import themeReducer from './reducers/theme';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
