import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {
  useFetchTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
} from './taskSlice';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const RecollApp = () => {
  const [task, setTask] = useState('');
  const { data: tasks = [], isLoading } = useFetchTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const addTaskHandler = async () => {
    if (task.trim()) {
      await addTask(task);
      setTask('');
    }
  };

  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTaskHandler(item.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do App with RTK Query</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTaskHandler}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet!</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default function TodoRecoll() {
  return (
    <Provider store={store}>
      <RecollApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  addButton: { backgroundColor: '#1e90ff', padding: 10, borderRadius: 5 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
  },
  taskText: { fontSize: 16 },
  emptyText: { textAlign: 'center', color: '#aaa', marginTop: 20 },
});