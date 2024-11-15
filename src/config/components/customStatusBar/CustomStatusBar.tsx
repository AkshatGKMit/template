import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import ThemeContext from '@config/ThemeContext';
import { isIos } from '@constants';

import ThemedStyles from './styles';

const CustomStatusBar = () => {
  const {
    theme,
    safeAreaInsets: { top: topInset },
  } = useContext(ThemeContext);

  const styles = ThemedStyles(theme, topInset);

  return (
    <View style={isIos ? styles.iosStatusBar : null}>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={theme.colors.statusBar}
        translucent={!isIos}
      />
    </View>
  );
};

export default CustomStatusBar;
