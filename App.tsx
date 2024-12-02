import { useContext, useEffect } from 'react';
import { Button, StatusBar, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import GradientScreen from '@components/gradientScreen';
import Snackbar from '@components/snackBar';
import store, { useAppDispatch, useAppSelector } from '@config/store';
import { Colors, ThemeMode } from '@themes';
import { switchTheme } from '@reducers/theme';
import { ThunkDispatch } from '@reduxjs/toolkit';

const App = () => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
        <BottomSheet />
        <Snackbar />
      </SafeAreaProvider>
    </Provider>
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.colors);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
      />
      <GradientScreen useSafeArea>
        <View
          style={{
            height: 300,
            width: 300,
            backgroundColor: theme.primary,
          }}
        ></View>
      </GradientScreen>
    </>
  );
};

export default App;
