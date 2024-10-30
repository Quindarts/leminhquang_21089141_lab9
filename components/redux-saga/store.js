import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import tasksReducer from './taskSlice';
import { watchTasksSaga } from './taskSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { tasks: tasksReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchTasksSaga);

export default store;
