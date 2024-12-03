import { useContext, useEffect } from 'react';
import { Button, StatusBar, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import GradientScreen from '@components/gradientScreen';
import Snackbar from '@components/snackBar';
import store, { useAppDispatch, useAppSelector } from '@config/store';
import { Colors, FontFamily, ThemeMode } from '@themes';
import { switchTheme } from '@reducers/theme';
import Scaffold from '@components/scaffold/Scaffold';
import TextBlock from '@components/textBlock/TextBlock';
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

const Main = () => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.colors);

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <Scaffold useSafeAreaInPortrait>
      <View
        style={{
          height: 300,
          width: 300,
          backgroundColor: theme.cardColor,
          ...globalStyles.columnCenter,
        }}
      >
        <TextBlock
          fontFamily={FontFamily.italic.black}
          fontSize={30}
        >
          Hello World
        </TextBlock>
      </View>
    </Scaffold>
  );
};

export default App;
