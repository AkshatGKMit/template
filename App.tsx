import React, { useContext, useEffect, useState } from 'react';
import { Switch } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';
import TextField from '@components/textField';
import { IconFamily } from '@constants';

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

  const [v, setV] = useState('kejfier');

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <GradientScreen style={{ padding: 20 }}>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />
      <TextField
        onChangeText={() => {}}
        placeholder="Enter Text"
        value=""
        label="label"
        prefixIcon={{ family: IconFamily.antDesign, name: 'plus' }}
        suffixIconButton={{ family: IconFamily.antDesign, name: 'plus' }}
      />
      <TextField
        onChangeText={() => {}}
        placeholder="Enter Text"
        value="This Is Value"
        label="label"
        prefixIcon={{ family: IconFamily.antDesign, name: 'plus' }}
        suffixIconButton={{ family: IconFamily.antDesign, name: 'plus' }}
      />
      <TextField
        onChangeText={() => {}}
        placeholder="Enter Text"
        value="This Is Value"
        errorMsg="This is error"
        label="label"
        prefixIcon={{ family: IconFamily.antDesign, name: 'plus' }}
        suffixIconButton={{ family: IconFamily.antDesign, name: 'plus' }}
      />
      <TextField
        onChangeText={setV}
        placeholder="Enter Text"
        value={v}
        label="label"
        prefixIcon={{ family: IconFamily.antDesign, name: 'plus' }}
        suffixIconButton={{ family: IconFamily.antDesign, name: 'plus' }}
        autoFocus
        multiline
        addOns={{ numberOfLines: 5 }}
      />
    </GradientScreen>
  );
};

export default App;
