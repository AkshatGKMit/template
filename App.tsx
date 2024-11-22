import { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContextProvider } from '@config/ThemeContext';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalThemedStyles } from '@themes/globalStyles';
import Snackbar from '@components/snackBar';
import TextButton from '@components/textButton';
import Swipeable from '@components/swipeable';
import { SwipeDirection } from '@constants';
import FlipCard from '@components/flipCard';
import Shimmer from '@components/shimmer';
import { Colors } from '@themes';
import GradientScreen from '@components/gradientScreen';

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
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [isDismissed, setDismissed] = useState(false);

  const globalStyles = GlobalThemedStyles();

  const [data, setData] = useState(['a', 'b', 'c', 'd', 'e']);

  return (
    <GradientScreen
      style={{ flex: 1, gap: 20, alignItems: 'center' }}
      showStatusBar
    >
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
      {!isDismissed && (
        <Swipeable
          leftChild={
            <View
              style={{
                flex: 1,
                backgroundColor: 'cyan',
              }}
            />
          }
          rightChild={
            <View
              style={{
                flex: 1,
                backgroundColor: 'red',
              }}
            />
          }
          dismissDirection={SwipeDirection.right}
          onDismiss={() => {
            setDismissed(true);
            Snackbar.show({
              text: 'Dismissed',
              indefinite: true,
              action: (
                <Button
                  title="Un Dismiss"
                  onPress={() => {
                    setDismissed(false);
                  }}
                />
              ),
            });
          }}
        >
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 70,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 30 }}>Swipeable Component</Text>
          </View>
        </Swipeable>
      )}

      <FlipCard
        front={
          <View
            style={{
              height: 150,
              width: 150,
              backgroundColor: 'pink',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '700' }}>Front Side</Text>
          </View>
        }
        back={
          <Shimmer
            baseColor={Colors.grey}
            highlightColor={Colors.greyShades.shade400}
            style={{ height: 150, width: 150, backgroundColor: Colors.white, borderRadius: 12 }}
          />
        }
      />
    </GradientScreen>
  );
};

export default App;
