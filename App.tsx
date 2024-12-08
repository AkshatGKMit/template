import { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, Text, useColorScheme, View } from 'react-native';
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
  const theme = useAppSelector(({ theme }) => theme.colors);

  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const dataRes: any = await fetch('https://dummyjson.com/products').then((res) => res.json());
    console.log(dataRes);

    setData(dataRes.products[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  const num = 3;

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1, flexDirection: 'row' }}
      appBar={<ScreenAppBar />}
    >
      {/* {data && (
        <FastImage
          source={{ uri }}
          resizeMode="contain"
          style={{ width: '100%', aspectRatio: 3 / 2, position: 'relative' }}
        >
          <View style={{ backgroundColor: '#00000099', flex: 1 }} />
          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextBlock>This is an Overlayed Image</TextBlock>
          </View>
        </FastImage>
      )} */}
      <ImageOverlay
        source={{ uri }}
        resizeMode="contain"
        style={{ width: '100%', aspectRatio: 3 / 2, position: 'relative' }}
        overlayColor="#00ff00"
        overlayOpacity={0.1}
        containerStyle={globalStyles.columnCenter}
      >
        <TextBlock>This Is Overlayed Image</TextBlock>
      </ImageOverlay>
    </Scaffold>
  );
};

export default App;

const uri =
  'https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg';
