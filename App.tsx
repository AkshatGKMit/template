import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import CustomStatusBar from '@config/customStatusBar';
import { GlobalThemedStyles } from '@themes';
import { FontFamily } from '@themes';
import GradientScreen from '@components/gradientScreen';
import LoadingView from '@components/loadingView';

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
    <GradientScreen>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />
    </GradientScreen>
  );
};

export default App;
