import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = "https://67225c902108960b9cc422f1.mockapi.io/todoToolkit"
// Thunks cho các thao tác CRUD
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(apiURL);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskText) => {
  const response = await axios.post(apiURL, { text: taskText });
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${apiURL}/${id}`);
  return id;
});

// Tạo slice với reducers và extraReducers để xử lý trạng thái async
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
