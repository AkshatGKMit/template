import { globalStyles } from '@themes/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  gradientContainer: {
    ...globalStyles.flex1,
    transform: [{ rotate: '30deg' }, { translateY: '-50%' }],
  },
  highlighter: {
    position: 'absolute',
  },
});

export default styles;
