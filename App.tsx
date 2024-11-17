import { useContext, useState } from 'react';
import { Button, ScrollView, Switch, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/ThemeContext';
import GradientScreen from '@components/gradientScreen';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';

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
  const { theme, switchThemeMode, safeAreaInsets: insets } = useContext(ThemeContext);

  function _onSwitchTheme() {
    switchThemeMode(theme.isDark ? 'light' : 'dark');
  }

  return (
    <GradientScreen style={{ padding: 20 }}>
      <Switch
        value={theme.isDark}
        onValueChange={_onSwitchTheme}
      />

      <Button
        title="Show Scrolling Bottom Sheet"
        onPress={() =>
          BottomSheet.show({
            child: (
              <ScrollView style={{ backgroundColor: 'red', width: '100%' }}>
                {Array.from({ length: 100 }).map((_: unknown, i) => (
                  <Text
                    key={i}
                    style={{ color: theme.colors.text }}
                  >
                    {i}
                  </Text>
                ))}
              </ScrollView>
            ),
            snap: {
              closingPoint: 0.8,
              points: [0.1, 0.25, 0.5, 0.75],
            },
          })
        }
      />

      <Button
        title="Show Normal Bottom Sheet"
        onPress={() =>
          BottomSheet.show({
            child: (
              <>
                {Array.from({ length: 10 }).map((_: unknown, i) => (
                  <Text style={{ color: theme.colors.text }}>{i}</Text>
                ))}
              </>
            ),
            borderRadius: 12,
          })
        }
      />

      <Button
        title="Toast"
        onPress={() => Toast.show({ text1: 'This is toast' })}
      />

      {/* {showBottomSheet && <BottomSheet />} */}
    </GradientScreen>
  );
};

export default App;
