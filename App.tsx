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

  const items: DropdownItems = [
    {
      id: 'f7c9cfbf-a6a2-4895-9c9f-c31a684c8a62',
      label: 'Armstrongchester',
      value: 'Armstrongchester',
      startNode: {
        family: IconFamily.materialCommunityIcons,
        name: 'dropbox',
      },
    },
    {
      id: 'c288ad69-2861-4ac3-8038-2adf94a76cd3',
      label: 'West Efrain',
      value: 'West Efrain',
    },
    {
      id: '4e92c306-b664-4042-938e-254cdda945a3',
      label: 'Jamisonberg',
      value: 'Jamisonberg',
    },
    {
      id: 'bae5621e-b553-4f88-b316-336cad1677f9',
      label: 'South Ozella',
      value: 'South Ozella',
    },
    {
      id: '7b74befe-cbb4-4714-8992-6de34e393a9b',
      label: 'Allenburgh',
      value: 'Allenburgh',
    },
    {
      id: '5e9b90a4-dab2-4c7d-9c54-52ea98806e2c',
      label: 'Lake Raphael',
      value: 'Lake Raphael',
    },
    {
      id: 'a8c6e28d-a19d-4c1a-9242-706f711bf021',
      label: 'West Kingport',
      value: 'West Kingport',
    },
    {
      id: '5b038321-d92c-47c1-8018-5e271490e3ea',
      label: 'Lake Laury',
      value: 'Lake Laury',
    },
    {
      id: 'a375f646-e2eb-4588-970a-99ff72591259',
      label: 'North Johanna',
      value: 'North Johanna',
    },
    {
      id: 'a2fb360a-a92d-44c2-8806-fa726a6f7c45',
      label: 'Lake Graham',
      value: 'Lake Graham',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 30, flex: 1 }}>
        <Dropdown
          items={items}
          value={val}
          onSelect={(item) => setVal(item)}
          hint="--Select--"
          leftIcon={{
            family: IconFamily.materialCommunityIcons,
            name: 'dropbox',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
