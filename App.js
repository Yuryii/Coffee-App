import { StyleSheet } from 'react-native';
import Navigation from './data/navigations/Navigations';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInWithOAuth from './data/screens/SignInWithOAuth';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ClerkProvider publishableKey='pk_test_dW5pZmllZC1tdWxlLTI2LmNsZXJrLmFjY291bnRzLmRldiQ'>
        <SignedIn>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth/>
        </SignedOut>
      </ClerkProvider>
    </SafeAreaView>
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

