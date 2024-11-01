import React, { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConfigContext, { ConfigContextProvider } from '@config/context/ConfigContext';
import PlatformStatusBar from '@config/components/platformStatusBar';
import ThemedStyles from '@themes/globalStyles';

const App = () => {
  return (
    <ConfigContextProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </ConfigContextProvider>
  );
};

const Main = () => {
  const { theme } = useContext(ConfigContext);
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
