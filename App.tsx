import { useEffect } from 'react';
import { LogBox, StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppBar from '@components/appBar';
import BottomSheet from '@components/bottomSheet';
import {
  ElevatedButton,
  FilledButton,
  OutlinedButton,
  TextButton,
  TonalButton,
} from '@components/button';
import Scaffold from '@components/scaffold/Scaffold';
import Snackbar from '@components/snackBar';
import { Icons } from '@constants';
import { Colors, ThemeMode } from '@themes';
import store, { useAppDispatch } from '@store';
import { switchTheme } from '@store/reducers/theme';

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

  useEffect(() => {
    dispatch(switchTheme(colorScheme ?? ThemeMode.light));
  }, [colorScheme]);

  return (
    <Scaffold
      style={{ padding: 12, gap: 10, flex: 1 }}
      appBar={<ScreenAppBar />}
    >
      <ElevatedButton
        label="Elevated Button"
        onPress={() => {}}
      />
      <ElevatedButton
        label="Elevated Button With Icon"
        onPress={() => {}}
        icon={Icons.entypo.addToList}
      />
      <ElevatedButton
        label="Disabled Elevated Button"
        onPress={() => {}}
        disabled
      />

      <FilledButton
        label="Filled Button"
        onPress={() => {}}
      />
      <FilledButton
        label="Filled Button With Icon"
        onPress={() => {}}
        icon={Icons.entypo.addToList}
      />
      <FilledButton
        label="Disabled Filled Button"
        onPress={() => {}}
        disabled
      />

      <OutlinedButton
        label="Outlined Button"
        onPress={() => {}}
      />
      <OutlinedButton
        label="Outlined Button With Icon"
        onPress={() => {}}
        icon={Icons.entypo.addToList}
      />
      <OutlinedButton
        label="Disabled Outlined Button"
        onPress={() => {}}
        disabled
      />

      <TextButton
        label="Text Button"
        onPress={() => {}}
      />
      <TextButton
        label="Text Button With Icon"
        onPress={() => {}}
        icon={Icons.entypo.addToList}
      />
      <TextButton
        label="Disabled Text Button"
        onPress={() => {}}
        disabled
      />

      <TonalButton
        label="Tonal Button"
        onPress={() => {}}
      />
      <TonalButton
        label="Tonal Button With Icon"
        onPress={() => {}}
        icon={Icons.entypo.addToList}
      />
      <TonalButton
        label="Disabled Tonal Button"
        onPress={() => {}}
        disabled
      />
    </Scaffold>
  );
};

export default App;
