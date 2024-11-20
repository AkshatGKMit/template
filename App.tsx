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
import { IconFamily } from '@constants';
import PopUpMenu from '@components/popUpMenu';

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

  const [val, setVal] = useState<DropDownItem | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 30);
  }, []);

  const globalStyles = GlobalThemedStyles();

  const items: PopUpMenuButtons = [
    {
      id: 'dd213f95-6ba1-45e7-a2a2-6c45b48bac3c',
      label: 'South Maureenshire',
      onPress: () => Toast.show({ text1: 'South Maureenshire' }),
    },
    {
      id: '237248ac-819e-4d23-b403-dc4cfec4c809',
      label: 'Lake Rhiannon',
      onPress: () => Toast.show({ text1: 'Lake Rhiannon' }),
    },
    {
      id: '53da0a50-0f9f-4ffb-81df-3b8e2ccac40b',
      label: 'Predovicbury',
      onPress: () => Toast.show({ text1: 'Predovicbury' }),
    },
    {
      id: '12bdcbce-76fe-4c05-9a9d-578a3d82b8b0',
      label: 'Blickburgh',
      onPress: () => Toast.show({ text1: 'Blickburgh' }),
    },
    {
      id: '3ee228c0-729f-4a9a-a4ba-f2e4c17c5fd3',
      label: 'North Roderick',
      onPress: () => Toast.show({ text1: 'North Roderick' }),
    },
    {
      id: 'f442e138-23bd-46b4-88b3-d6f6daf2a643',
      label: 'Port Brooks',
      onPress: () => Toast.show({ text1: 'Port Brooks' }),
    },
    {
      id: 'ffafb753-efcb-4b1e-b9c3-53a8cb2d55be',
      label: 'South Lenoramouth',
      onPress: () => Toast.show({ text1: 'South Lenoramouth' }),
    },
  ];

  const P = () => (
    <PopUpMenu
      items={items}
      onOpened={() => console.log('Opened')}
      onClose={() => console.log('Closed')}
    />
  );

  const PPP = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <P />
      <P />
      <P />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <View style={{ margin: 30, flexDirection: 'row', backgroundColor: 'pink', gap: 20 }}>
        <Text style={{ backgroundColor: 'cyan', flex: 1 }}>More</Text>
        <PPP />
      </View>
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
      <PPP />
    </SafeAreaView>
  );
};

export default App;
