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
import { Colors, FontFamily, ThemeMode } from '@themes';
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
import Icons from '@constants/icons';
import Icon from '@components/icon';
import IconButton from '@components/iconButton';

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
    // console.log(dataRes);

    setData(dataRes.products[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  const num = 0;

  const DATA: any[] = Object.keys(Icons)
    .slice(num, num + 1)
    .map((family) => ({
      title: family, // Family name
      data: Object.values(Icons[family] as any), // Array of icons in this family
    }));

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1, flexDirection: 'row' }}
      appBar={<ScreenAppBar />}
    >
      <IconButton icon={Icons.materialIcons.menu} />
      <SectionList
        sections={DATA}
        keyExtractor={(item: any, index) => item.name + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Icon
              icon={item}
              size={25}
            />
            <TextBlock style={styles.iconName}>{item.name}</TextBlock>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </Scaffold>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 15,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'column',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 15,
  },
  iconName: {
    marginLeft: 10,
    fontSize: 18,
  },
});
