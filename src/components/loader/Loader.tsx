import { ActivityIndicator } from 'react-native';

import { useAppSelector } from '@store';

const Loader = ({ color, size }: LoaderProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActivityIndicator
      color={color ?? theme.primary}
      size={size ?? 'small'}
      animating
    />
  );
};

export default Loader;
