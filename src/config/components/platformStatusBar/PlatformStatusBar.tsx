import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import ThemeContext from '@config/context/ThemeContext';
import { isIos } from '@constants/constants';
import ThemedStyles from './styles';

const PlatformStatusBar = () => {
  const { theme } = useContext(ThemeContext);
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
