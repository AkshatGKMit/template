import { useEffect } from 'react';
import { AppState, AppStateStatus, LogBox, StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';

import BottomSheet from '@components/bottomSheet';
import Snackbar from '@components/snackBar';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { Colors, ThemeMode } from '@themes';
import { globalStyles } from '@themes/globalStyles';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent
          backgroundColor={Colors.transparent}
        />
        <SafeAreaProvider>
          <Main />
          <BottomSheet />
          <Snackbar />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  function onlineManagerEvent(setOnline: (online: boolean) => void) {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
      onlineManager.setOnline(!!state.isConnected);
    });
  }

  useEffect(() => {
    onlineManager.setEventListener(onlineManagerEvent);

    const appStateSubscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <View style={globalStyles.flex1}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
