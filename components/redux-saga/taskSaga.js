import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { addTask, deleteTask } from './taskSlice';

const apiURL = 'https://67225c902108960b9cc422f1.mockapi.io/todo';

// Fetch tasks
function* fetchTasks() {
  try {
    const response = yield call(axios.get, apiURL);
    yield put({ type: 'tasks/fetchTasksSuccess', payload: response.data });
  } catch (error) {
    console.error('Fetch tasks failed:', error);
  }
}

// Add a new task
function* addTaskSaga(action) {
  try {
    const response = yield call(axios.post, apiURL, { text: action.payload });
    yield put(addTask(response.data));
  } catch (error) {
    console.error('Add task failed:', error);
  }
}

// Delete a task
function* deleteTaskSaga(action) {
  try {
    yield call(axios.delete, `${apiURL}/${action.payload}`);
    yield put(deleteTask(action.payload));
  } catch (error) {
    console.error('Delete task failed:', error);
  }
}

// Watcher saga
export function* watchTasksSaga() {
  yield takeEvery('tasks/fetchTasks', fetchTasks);
  yield takeEvery('tasks/addTaskSaga', addTaskSaga);
  yield takeEvery('tasks/deleteTaskSaga', deleteTaskSaga);
}
