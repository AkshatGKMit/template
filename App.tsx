import { useContext, useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalThemedStyles } from '@themes/globalStyles';
import Snackbar from '@components/snackBar';
import TextButton from '@components/textButton';
import Swipeable from '@components/swipeable';
import { IconFamily, SwipeDirection } from '@constants';
import FlipCard from '@components/flipCard';
import Shimmer from '@components/shimmer';
import { Colors } from '@themes';
import GradientScreen from '@components/gradientScreen';
import FloatingActionButtonAutoHide from '@components/floatingActionButton';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
          <Toast />
          <BottomSheet />
          <Snackbar />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [isDismissed, setDismissed] = useState(false);

  const globalStyles = GlobalThemedStyles();

  const [data, setData] = useState(['a', 'b', 'c', 'd', 'e']);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: theme.colors.primaryBackground,
        }}
      >
        <FloatingActionButtonAutoHide icon={{ family: IconFamily.materialIcons, name: 'add' }} />
      </View>
    </SafeAreaView>
  );
};

export default App;
