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
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={{ height: '100%', width: '100%', flex: 1 }}>
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
          onScrollEndDrag={() => setVisible(false)}
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
        <FloatingActionButton.Expanded
          icon={{ family: IconFamily.materialIcons, name: 'add' }}
          // visible={visible}
          size={FabSize.mini}
          text="Compose"
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
    height: 1000,
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
