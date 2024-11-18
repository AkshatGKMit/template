import { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CustomStatusBar from '@config/customStatusBar';
import ThemeContext from '@config/ThemeContext';
import { GlobalThemedStyles } from '@themes/globalStyles';
import { isIos } from '@constants';

const GradientScreen = ({ children, style, showStatusBar = false }: GradientScreenProps) => {
  const {
    theme: { colors },
    safeAreaInsets: { top: topInsets },
  } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles();

  const styles = StyleSheet.create({
    statusBarGap: {
      marginTop: isIos && showStatusBar ? 0 : topInsets,
    },
  });

  return (
    <>
      <CustomStatusBar showStatusBar={showStatusBar} />
      <LinearGradient
        colors={colors.screenGradient}
        style={globalStyles.screen}
      >
        <SafeAreaView style={[globalStyles.flex1, style, styles.statusBarGap]}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default GradientScreen;
