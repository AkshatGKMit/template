import store from '@config/store';

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
  type AppStore = typeof store;
}
