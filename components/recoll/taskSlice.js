import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiURL = 'https://67225c902108960b9cc422f1.mockapi.io/todo';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: () => '',
      providesTags: ['Task'],
    }),
    addTask: builder.mutation({
      query: (text) => ({
        url: '',
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useFetchTasksQuery, useAddTaskMutation, useDeleteTaskMutation } = taskApi;
