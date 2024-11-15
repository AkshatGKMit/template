import { useContext } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ThemeContext from '@config/ThemeContext';
import { GlobalThemedStyles } from '@themes';

const GradientScreen = ({ children, style }: GradientScreenProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const globalStyles = GlobalThemedStyles(colors);

  return (
    <LinearGradient
      colors={colors.screenGradient}
      style={globalStyles.screen}
    >
      <View style={[globalStyles.flex1, style]}>{children}</View>
    </LinearGradient>
  );
};

export default GradientScreen;
