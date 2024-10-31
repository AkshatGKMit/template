import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TOKEN } from '@env';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <Text>{TOKEN}</Text>
    </SafeAreaView>
  );
};

export default App;
