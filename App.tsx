import { useEffect, useState } from 'react';
import { AppState, AppStateStatus, LogBox, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BottomSheet from '@components/bottomSheet';
import Dialog from '@components/dialog';
import Snackbar from '@components/snackBar';
import useFavorite from '@config/useFavorite';
import Navigator from '@navigation/Navigator';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { ThemeMode } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { SPLASH_SCREEN_DURATION } from '@constants';
import Splash from '@screens/splash/Splash';

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

  const [showSplash, setShowSplash] = useState(true);

  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_SCREEN_DURATION);

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
      <NavigationContainer>{showSplash ? <Splash /> : <Navigator />}</NavigationContainer>
    </View>
  );
};

export default App;
