import { StyleSheet } from 'react-native';

import useScalingMetrics from '@config/useScalingMetrics';

const Styles = () => {
  const { wp, hp } = useScalingMetrics();

  return StyleSheet.create({
    dialog: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    container: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      flex: 1,
      maxHeight: hp(70),
      maxWidth: wp(90),
    },
  });
};

export default Styles;
