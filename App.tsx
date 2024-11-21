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
import Dropdown from '@components/dropdown';
import Icon from '@components/icon';
import { CardSide, FlipDirection, IconFamily, ShimmerDirection } from '@constants';
import PopUpMenu from '@components/popUpMenu';
import Shimmer from '@components/shimmer';
import FlipCard from '@components/flipCard';
import SnackBar from '@components/snackBar/SnackBar';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
          <Toast />
          <BottomSheet />
          <SnackBar />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const Main = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [val, setVal] = useState<DropDownItem | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 30);
  }, []);

  const globalStyles = GlobalThemedStyles();

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <View style={{ margin: 30, flexDirection: 'row', gap: 20 }}></View>
    </SafeAreaView>
  );
};

export default App;
