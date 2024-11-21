import { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContextProvider } from '@config/ThemeContext';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalThemedStyles } from '@themes/globalStyles';
import Snackbar from '@components/snackBar';
import TextButton from '@components/textButton';
import Swipeable from '@components/swipeable';
import { SlideDirection } from '@constants';

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

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const Main = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [isDismissed1, setIsDismissed1] = useState(false);
  const [isDismissed2, setIsDismissed2] = useState(false);

  const globalStyles = GlobalThemedStyles();

  const [data, setData] = useState(['a', 'b', 'c', 'd', 'e']);

  return (
    <SafeAreaView style={{ flex: 1, gap: 20 }}>
      <Button
        title="Bottom Sheet"
        onPress={() => {
          BottomSheet.show({
            child: <View style={{ backgroundColor: 'red', height: 300 }} />,
          });
        }}
      />
      <Button
        title="Snackbar"
        onPress={() => {
          Snackbar.show({
            heading: 'Snackbar2',
            text: 'This is Second snackbar',
          });
        }}
      />
      <Button
        title="Un Dismiss"
        onPress={() => {
          setIsDismissed1(false);
          Snackbar.show({ text: 'Un dismissed' });
        }}
      />

      {!isDismissed2 && (
        <Swipeable
          leftChild={<View style={{ flex: 1, backgroundColor: 'cyan' }} />}
          rightChild={<View style={{ flex: 1, backgroundColor: 'red' }} />}
          dismissDirection={SlideDirection.right}
          onDismiss={() => {
            setIsDismissed2(true);
            Snackbar.show({
              text: 'Dismissed',
              action: (
                <Button
                  title="Un Dismiss"
                  onPress={() => {
                    setIsDismissed2(false);
                    Snackbar.show({ text: 'Un dismissed' });
                  }}
                />
              ),
            });
          }}
        >
          <View style={{ width: '100%', height: 70, backgroundColor: 'grey' }} />
        </Swipeable>
      )}
    </SafeAreaView>
  );
};

export default App;
