import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { list: [], loading: false },
  reducers: {
    fetchTasks: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addTaskSaga: (state, action) => {
      state.loading = true;
    },
    deleteTaskSaga: (state, action) => {
      state.loading = true;
    },
    addTask: (state, action) => {
      state.list.push(action.payload);
      state.loading = false;
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      state.loading = false;
    },
  },
});

export const {
  fetchTasks,
  fetchTasksSuccess,
  addTaskSaga,
  deleteTaskSaga,
  addTask,
  deleteTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
