import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Switch, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StorageContextProvider } from '@config/context/StorageContext';
import ConfigContext, { ConfigContextProvider } from '@config/context/ConfigContext';
import PlatformStatusBar from '@config/components/platformStatusBar';
import ThemedStyles from '@themes/globalStyles';

const App = () => {
  return (
    <StorageContextProvider>
      <ConfigContextProvider>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </ConfigContextProvider>
    </StorageContextProvider>
  );
};

const Main = () => {
  const { theme, isDark, switchTheme } = useContext(ConfigContext);
  const styles = ThemedStyles(theme);

  const [themeSwitcher, setThemeSwitcher] = useState(isDark);

  useEffect(() => {
    setThemeSwitcher(isDark);
  }, [isDark]);

  function _onSwitchTheme(val: boolean) {
    switchTheme(isDark ? 'light' : 'dark');
    setThemeSwitcher(val);
  }

  return (
    <>
      <PlatformStatusBar />
      <SafeAreaView style={styles.screen}>
        <Text>React Native Template App</Text>
        <Switch
          value={themeSwitcher}
          onValueChange={_onSwitchTheme}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
