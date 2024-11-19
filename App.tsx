import { useContext, useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, Switch, Text, View } from 'react-native';
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
import Onboarding from '@screens/onboarding/Onboarding';

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

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 30);
  }, []);

  const globalStyles = GlobalThemedStyles();

  return (
    <SafeAreaView style={globalStyles.flex1}>
      <Button
        title="Sheet"
        onPress={() => {
          BottomSheet.show({
            child: (
              <ScrollView style={{ backgroundColor: 'red', width: '100%' }}>
                {Array.from({ length: 100 }).map((_: unknown, i) => (
                  <Text
                    key={i}
                    style={{ color: 'black' }}
                  >
                    {i}
                  </Text>
                ))}
              </ScrollView>
            ),
          });
        }}
      />
      {/* <NavigationContainer>{showSplashScreen ? <Splash /> : <Onboarding />}</NavigationContainer> */}
    </SafeAreaView>
  );
};

export default App;
