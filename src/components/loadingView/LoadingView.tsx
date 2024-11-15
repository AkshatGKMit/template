import { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';

import Loader from '@components/loader';
import ThemeContext from '@config/ThemeContext';

import ThemedStyles from './styles';

const LoadingView = ({ processInfo, invertedStyle }: LoadingViewProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = ThemedStyles();

  const parentStyle = useMemo(
    () => [styles.loaderView, invertedStyle ? styles.invertedView : null],
    [invertedStyle, styles],
  );

  const loaderColor = invertedStyle ? colors.inverted.primaryBackground : colors.primaryBackground;

  return (
    <View style={parentStyle}>
      <Loader
        color={loaderColor}
        size={'large'}
      />
      <Text style={styles.processInfo}>{processInfo}</Text>
    </View>
  );
};

export default LoadingView;
