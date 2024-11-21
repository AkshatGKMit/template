import { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
import { SwipeDirection } from '@constants';

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

const SwipeableList = () => {
  const [dismissedItems, setDismissedItems] = useState<any[]>([]);

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    text: `Item ${index + 1}`,
  }));

  const handleDismiss = (id: any) => {
    setDismissedItems((prev) => [...prev, id]);
    Snackbar.show({
      text: 'Dismissed',
      action: (
        <Button
          title="Un Dismiss"
          onPress={() => {
            undoDismiss(id);
          }}
        />
      ),
    });
  };

  const undoDismiss = (id: any) => {
    setDismissedItems((prev) => prev.filter((itemId) => itemId !== id));
    Snackbar.show({ text: 'Undismissed' });
  };

  const renderItem = ({ item }: any) => {
    if (dismissedItems.includes(item.id)) return null;

    return (
      <Swipeable
        leftChild={<View style={styles.leftChild} />}
        rightChild={<View style={styles.rightChild} />}
        dismissDirection={SwipeDirection.right}
        // onDismiss={() => handleDismiss(item.id)}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  leftChild: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  rightChild: {
    flex: 1,
    backgroundColor: 'red',
  },
  itemContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
    fontSize: 18,
  },
});

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
      <SwipeableList />
    </SafeAreaView>
  );
};

export default App;
