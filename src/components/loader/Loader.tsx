import { ActivityIndicator } from 'react-native';

import { useAppSelector } from '@config/store';

const Loader = ({ color, size }: LoaderProps) => {
  const theme = useAppSelector((state) => state.theme.colors);

  return (
    <ActivityIndicator
      color={color ?? theme.primary}
      size={size ?? 'small'}
      animating
    />
  );
};

export default Loader;
