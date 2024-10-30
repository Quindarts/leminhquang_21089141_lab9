import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './taskSlice';

const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export default store;
