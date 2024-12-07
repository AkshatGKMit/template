import { useContext, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import Snackbar from '@components/snackBar';
import { Colors, FontFamily, ThemeMode } from '@themes';
import Scaffold from '@components/scaffold/Scaffold';
import store, { useAppDispatch, useAppSelector } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { loginUser } from '@store/reducers/auth';
import AppBar from '@components/appBar';

const App = () => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
      />
      <SafeAreaProvider>
        <Main />
        <BottomSheet />
        <Snackbar />
      </SafeAreaProvider>
    </Provider>
  );
};

const ScreenAppBar = () => {
  return (
    <AppBar.Extended
      title={'Template'}
      leading={{ family: 'MaterialIcons', name: 'menu' }}
      trailing={[
        { icon: { family: 'MaterialIcons', name: 'settings' }, title: 'Filter' },
        { icon: { family: 'MaterialIcons', name: 'search' }, title: 'Filter' },
        { icon: { family: 'MaterialIcons', name: 'mood' }, title: 'Filter' },
        { icon: { family: 'MaterialIcons', name: 'favorite' }, title: 'Filter' },
        { icon: { family: 'MaterialIcons', name: 'numbers' }, title: 'Filter' },
      ]}
    />
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <Scaffold
      style={{ padding: 12, gap: 10 }}
      appBar={<ScreenAppBar />}
    ></Scaffold>
  );
};

export default App;
