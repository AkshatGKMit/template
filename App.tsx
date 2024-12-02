import { useContext, useEffect, useRef, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import Snackbar from '@components/snackBar';
import Swipeable from '@components/swipeable';
import { FabBorderRadius, FabSize, IconFamily, SwipeDirection } from '@constants';
import { FloatingActionButtonAutoHide } from '@components/floatingActionButton';
import FloatingActionButton from '@components/floatingActionButton/FloatingActionButton';

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

  return <SafeAreaView></SafeAreaView>;
};

export default App;
