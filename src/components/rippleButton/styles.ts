import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.positionRelative,
    overflow: 'hidden',
  },
  rippleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 1000,
  },
  buttonContainer: {
    padding: 4,
    backgroundColor: Colors.greyShades.shade100,
  },
});

export default styles;
