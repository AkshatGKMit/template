import React, { useContext, useEffect, useState } from 'react';
import { Button, Keyboard, SafeAreaView, Switch, Text, TextInput, View } from 'react-native';
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

  const styles = GlobalThemedStyles(theme.colors);

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.screen}>
        <GradientScreen>
          <Text style={{ fontFamily: FontFamily.lato.normal.hairline }}>Lato-Hairline</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.thin }}>Lato-Thin</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.light }}>Lato-Light</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.regular }}>Lato-Regular</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.medium }}>Lato-Medium</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.semibold }}>Lato-Semibold</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.bold }}>Lato-Bold</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.heavy }}>Lato-Heavy</Text>
          <Text style={{ fontFamily: FontFamily.lato.normal.black }}>Lato-Black</Text>

          <View style={{ height: 30 }} />

          <Text style={{ fontFamily: FontFamily.lato.italic.hairline }}>Lato-HairlineItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.thin }}>Lato-ThinItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.light }}>Lato-LightItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.regular }}>Lato-Italic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.medium }}>Lato-MediumItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.semibold }}>Lato-SemiboldItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.bold }}>Lato-BoldItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.heavy }}>Lato-HeavyItalic</Text>
          <Text style={{ fontFamily: FontFamily.lato.italic.black }}>Lato-BlackItalic</Text>
          <Switch
            value={theme.isDark}
            onValueChange={_onSwitchTheme}
          />
        </GradientScreen>
      </SafeAreaView>
    </>
  );
};

export default App;
