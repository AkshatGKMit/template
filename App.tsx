import React, { useContext, useEffect, useState } from 'react';
import { Button, SafeAreaView, Switch, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import CustomStatusBar from '@config/components/customStatusBar';
import GlobalThemedStyles from '@themes/globalStyles';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <Main />
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const Main = () => {
  const { theme, switchThemeMode } = useContext(ThemeContext);

  const [count, setCOunt] = useState(0);

  const styles = GlobalThemedStyles(theme.colors);

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.screen}>
        <Text>React Native Template App</Text>
        <Switch
          value={theme.isDark}
          onValueChange={_onSwitchTheme}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
