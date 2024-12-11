import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ReactElement, useEffect } from 'react';

const useHeader = <T extends NavigationProp<any>>(header: ReactElement<AppBarProps>) => {
  const { setOptions } = useNavigation<T>();

  useEffect(() => {
    setOptions({ headerShown: true, header: () => header });
  }, []);

  return;
};

export default useHeader;
