import { useEffect } from 'react';
import { AppState, AppStateStatus, LogBox, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BottomSheet from '@components/bottomSheet';
import Dialog from '@components/dialog';
import Snackbar from '@components/snackBar';
import ToggleWifi from '@config/ToggleWifi';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { Colors, ThemeMode } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import useFavorite from '@config/useFavorite';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Main />
          <BottomSheet />
          <Snackbar />
          <Dialog />
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  useFavorite();

  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useEffect(() => {
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
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        }}
      >
        <ToggleWifi />
      </View>
    </View>
  );
};

export default App;
