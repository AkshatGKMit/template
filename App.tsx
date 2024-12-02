import { useContext, useEffect } from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@components/bottomSheet';
import GradientScreen from '@components/gradientScreen';
import Snackbar from '@components/snackBar';
import store, { useAppDispatch, useAppSelector } from '@config/store';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import { Colors } from '@themes';
import { decrement, decrementByAmount, increment, incrementByAmount } from '@reducers/counter';

const App = () => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeContextProvider>
          <Main />
          <BottomSheet />
          <Snackbar />
        </ThemeContextProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const Main = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
      />
      <GradientScreen useSafeArea>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: '900' }}>{count}</Text>
          <Button
            title="Increment 1"
            onPress={() => dispatch(increment())}
          />
          <Button
            title="Decrement 1"
            onPress={() => dispatch(decrement())}
          />
          <Button
            title="Increment 10"
            onPress={() => dispatch(incrementByAmount(10))}
          />
          <Button
            title="Decrement 10"
            onPress={() => dispatch(decrementByAmount(10))}
          />
        </View>
      </GradientScreen>
    </>
  );
};

export default App;
