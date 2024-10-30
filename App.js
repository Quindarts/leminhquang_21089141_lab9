// App.js
import { View, ScrollView } from 'react-native';
import TodoSaga from './components/redux-saga/TodoSaga';
import TodoToolkit from './components/redux-toolkit/TodoToolKit';
import RecollApp from "./components/recoll/RecollApp"
export default function App() {
  return (
    <ScrollView style={{ height: 500 }}>
      <View>
        <TodoSaga />
        <TodoToolkit />
        <RecollApp/>
      </View>
    </ScrollView>
  );
}
