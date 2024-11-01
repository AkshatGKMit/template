import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import ConfigContext from '@config/context/ConfigContext';
import { isIos } from '@constants/constants';
import ThemedStyles from './styles';

const PlatformStatusBar = () => {
  const { theme } = useContext(ConfigContext);
  const styles = ThemedStyles(theme);

  if (!isIos) {
    return (
      <StatusBar
        animated
        barStyle={'light-content'}
        backgroundColor={theme.statusBarColor}
      />
    );
  }

  return <View style={styles.iosStatusBar} />;
};

export default PlatformStatusBar;
