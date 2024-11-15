import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import ThemeContext from '@config/ThemeContext';
import { isIos } from '@constants';

import ThemedStyles from './styles';

const CustomStatusBar = () => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = ThemedStyles();

  return (
    <View style={styles.statusBar}>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={colors.statusBar}
        translucent={!isIos}
      />
    </View>
  );
};

export default CustomStatusBar;
