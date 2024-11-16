import React, { useContext, useEffect, useState } from 'react';
import { Switch } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';

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

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <GradientScreen style={{ padding: 20 }}>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />
    </GradientScreen>
  );
};

export default App;
