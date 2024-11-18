import { useContext } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import ThemeContext from '@config/ThemeContext';
import { Colors } from '@themes';

const CustomStatusBar = ({ showStatusBar = false }: { showStatusBar?: boolean }) => {
  const {
    theme: { colors },
    safeAreaInsets: { top: topInsets },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    statusBar: {
      height: showStatusBar ? topInsets : 0,
      width: '100%',
      backgroundColor: showStatusBar ? colors.statusBar : Colors.transparent,
    },
  });

  return (
    <View style={styles.statusBar}>
      <StatusBar
        animated
        backgroundColor={styles.statusBar.backgroundColor}
        translucent={!showStatusBar}
      />
    </View>
  );
};

export default CustomStatusBar;
