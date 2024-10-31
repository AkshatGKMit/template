import React, { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContext, { ThemeContextProvider } from '@config/context/ThemeContext';
import PlatformStatusBar from '@config/components/platformStatusBar';
import ThemedStyles from '@themes/globalStyles';

const App = () => {
  return (
    <ThemeContextProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </ThemeContextProvider>
  );
};

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const styles = ThemedStyles(theme);

  return (
    <>
      <PlatformStatusBar />
      <SafeAreaView style={styles.screen}>
        <Text>React Native Template App</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
