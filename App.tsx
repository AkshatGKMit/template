import { useContext, useEffect, useState } from 'react';
import { Button, ScrollView, StatusBar, Switch, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalThemedStyles } from '@themes/globalStyles';
import Splash from '@screens/splash/Splash';
import { Colors } from '@themes';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
          <Toast />
          <BottomSheet />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const Main = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [s, SS] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 30);
  }, []);

  const globalStyles = GlobalThemedStyles();

  return (
    <GradientScreen showStatusBar={s}>
      <NavigationContainer>
        {showSplashScreen ? (
          <Splash />
        ) : (
          <Switch
            value={s}
            onValueChange={SS}
          />
        )}
      </NavigationContainer>
    </GradientScreen>
  );
};

export default App;
