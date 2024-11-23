import { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { FloatingActionButtonAutoHide } from '@components/floatingActionButton';

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

  const [visible, setVisible] = useState(true);

  const globalStyles = GlobalThemedStyles();

  const [data, setData] = useState(['a', 'b', 'c', 'd', 'e']);

  const scrollY = useRef(new Animated.Value(0)).current;
  let scrollTimeout = useRef<any>(null);

  const [isFabVisible, setIsFabVisible] = useState(true);

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false,
    listener: (event) => {
      // Show FAB when scrolling starts
      if (isFabVisible === false) {
        setIsFabVisible(true);
      }

      // Clear the timeout if user is still scrolling
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a timeout to hide the FAB after 3 seconds of no scrolling
      scrollTimeout.current = setTimeout(() => {
        setIsFabVisible(false);
      }, 3000);
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={styles.container}> */}
      {/* <ScrollView onScroll={handleScroll}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View
            key={i}
            style={styles.box}
          />
        ))}
      </ScrollView>

      {isFabVisible && (
        <Animated.View style={styles.fabContainer}>
          <Button title="FAB" />
        </Animated.View>
      )} */}
      {/* </View> */}
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: theme.colors.primaryBackground,
        }}
      >
        <ScrollView
          onScrollBeginDrag={() => setVisible(true)}
          onMomentumScrollEnd={() => setVisible(false)}
          scrollEventThrottle={20}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: theme.colors.primaryBackground,
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <Text
              key={i}
              style={{ marginBottom: 30 }}
            >
              {i}
            </Text>
          ))}
        </ScrollView>
        <FloatingActionButtonAutoHide
          icon={{ family: IconFamily.materialIcons, name: 'add' }}
          visible={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  content: {
    height: 1000, // Example height to allow scrolling
    justifyContent: 'space-around',
  },
  box: {
    height: 100,
    width: '100%',
    backgroundColor: 'lightblue',
    marginVertical: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
});

export default App;
