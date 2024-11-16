import { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ThemeContext from '@config/ThemeContext';
import { GlobalThemedStyles } from '@themes';

const GradientScreen = ({ children, style }: GradientScreenProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles();

  return (
    <LinearGradient
      colors={colors.screenGradient}
      style={globalStyles.screen}
    >
      <SafeAreaView style={[globalStyles.flex1, style]}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default GradientScreen;
