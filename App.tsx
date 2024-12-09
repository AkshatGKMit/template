import { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import Snackbar from '@components/snackBar';
import { Colors, FontFamily, FontWeight, ThemeMode, Typography } from '@themes';
import Scaffold from '@components/scaffold/Scaffold';
import store, { useAppDispatch, useAppSelector } from '@store';
import { switchTheme } from '@store/reducers/theme';
import { loginUser } from '@store/reducers/auth';
import AppBar from '@components/appBar';
import FastImage from 'react-native-fast-image';
import GridView from '@components/gridView/GridView';
import TextBlock from '@components/textBlock';
import ImageOverlay from '@components/imageOverlay';
import { globalStyles } from '@themes/globalStyles';
import { Icons } from '@constants';
import Icon from '@components/icon';
import IconButton from '@components/iconButton';
import { ActionButton, ElevatedButton } from '@components/button';

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
      leading={{ icon: Icons.materialIcons.menu }}
      trailing={[
        { icon: Icons.materialIcons.settings, label: 'Filter' },
        { icon: Icons.materialIcons.search, label: 'Filter' },
        { icon: Icons.materialIcons.mood, label: 'Filter' },
        { icon: Icons.materialIcons.favorite, label: 'Filter' },
        { icon: Icons.materialIcons.numbers, label: 'Filter' },
      ]}
    />
  );
};

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(({ theme }) => theme.colors);

  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const dataRes: any = await fetch('https://dummyjson.com/products').then((res) => res.json());

    setData(dataRes.products[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  const num = 0;

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      appBar={<ScreenAppBar />}
    ></Scaffold>
  );
};

export default App;
