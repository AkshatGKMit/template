import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import ThemeContext from '@config/ThemeContext';

const Loader = ({ color, size }: LoaderProps) => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <ActivityIndicator
      color={color ?? colors.primary}
      size={size ?? 'small'}
      animating
    />
  );
};

export default Loader;
