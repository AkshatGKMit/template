import { useContext, useState } from 'react';
import { Button, Switch } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';
import BottomSheet from '@config/bottomSheet/BottomSheet';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const Main = () => {
  const { theme, switchThemeMode, safeAreaInsets: insets } = useContext(ThemeContext);

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <GradientScreen style={{ padding: 20 }}>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />

      <Button
        title="Show Bottom Sheet"
        onPress={() => setShowBottomSheet(true)}
      />

      {showBottomSheet && <BottomSheet />}
    </GradientScreen>
  );
};

export default App;
