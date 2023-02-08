import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import LoginPage from './src/components/pages/login.page';
import { store } from './src/redux/store';
// import LoginScreenGoogle from './src/components/auth/google/getGoogleUrl';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <LoginPage/>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
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
