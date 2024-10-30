import axios from 'axios';

const apiURL = 'https://67225c902108960b9cc422f1.mockapi.io/todo';

// Fetch all tasks (GET)
export const getTasks = () => axios.get(apiURL).then((response) => response.data);

// Add a new task (POST)
export const addTask = (taskText) => axios.post(apiURL, { text: taskText }).then((response) => response.data);

// Update a task (PUT)
export const updateTask = (id, updatedText) => axios.put(`${apiURL}/${id}`, { text: updatedText }).then((response) => response.data);

// Delete a task (DELETE)
export const deleteTask = (id) => axios.delete(`${apiURL}/${id}`).then(() => id);
