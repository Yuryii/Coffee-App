import { StyleSheet} from 'react-native';
import Navigation from './data/navigations/Navigations';
import {store} from './store/store'
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

