import { useContext, useEffect, useState } from 'react';
import { Button, StatusBar, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import GradientScreen from '@components/gradientScreen';
import Snackbar from '@components/snackBar';
import { Colors, FontFamily, ThemeMode } from '@themes';
import Scaffold from '@components/scaffold/Scaffold';
import TextBlock from '@components/textBlock/TextBlock';
import { globalStyles } from '@themes/globalStyles';
import RippleButton from '@components/rippleButton';
import Icon from '@components/icon';
import store, { useAppDispatch, useAppSelector } from '@store';
import { switchTheme } from '@store/reducers/theme';
import TextField from '@components/textField';
import Loader from '@components/loader';
import { loginUser } from '@store/reducers/auth';
// import { switchTheme } from '@store/reducers/theme';

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

  const { loading, error } = useAppSelector(({ auth }) => auth);
  const theme = useAppSelector(({ theme }) => theme.colors);

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  const _onLogin = async () => {
    const dispatchResult = await dispatch(loginUser({ username, password }));
    console.log('Dispatch Result: ', dispatchResult);
  };

  return (
    <Scaffold
      style={{ padding: 12, gap: 10 }}
      useSafeAreaInPortrait
    >
      {error && (
        <TextBlock
          fontFamily={'Lato-Semibold'}
          fontSize={14}
          color={theme.error}
        >
          {error.message}
        </TextBlock>
      )}
      <TextField
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      <TouchableOpacity
        style={[globalStyles.rowCenter]}
        onPress={_onLogin}
      >
        {loading ? (
          <Loader />
        ) : (
          <TextBlock
            fontFamily={'Lato-Heavy'}
            fontSize={20}
            color={theme.primaryText}
          >
            Login
          </TextBlock>
        )}
      </TouchableOpacity>
    </Scaffold>
  );
};

export default App;
