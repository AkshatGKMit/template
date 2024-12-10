import { NavigationProp } from '@react-navigation/native';

import { ROUTES } from '@constants';

const { STACK: Stack } = ROUTES;

type GetParams<T extends StackScreenNames> = T extends typeof Stack.Details
  ? { id: number }
  : undefined;
declare global {
  type StackScreenNames = (typeof Stack)[keyof typeof Stack];
  type RootStackParamList = {
    [K in StackScreenNames]: GetParams<K>;
  };
  type StackNavigation = NavigationProp<RootStackParamList>;
}
