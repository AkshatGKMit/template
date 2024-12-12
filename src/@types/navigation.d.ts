import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';

import { ROUTES } from '@constants';

const { PRACTICE_STACK, BOTTOM_TABS, COMPONENTS_STACK } = ROUTES;

type GetParams<T extends StackScreenNames> = T extends typeof PRACTICE_STACK.Details
  ? { id: number }
  : undefined;

declare global {
  type BottomTabRouteName = (typeof ROUTES.BOTTOM_TABS)[keyof typeof ROUTES.BOTTOM_TABS];

  type BottomTabsScreenNames = (typeof BOTTOM_TABS)[keyof typeof BOTTOM_TABS];
  type RootBottomTabParamList = Record<BottomTabsScreenNames, undefined>;
  type BottomTabNavigation = BottomTabNavigationProp<RootBottomTabParamList>;

  type PracticeStackScreenNames = (typeof PRACTICE_STACK)[keyof typeof PRACTICE_STACK];
  type RootPracticeStackParamList = Record<PracticeStackScreenNames, undefined>;
  type PracticeStackNavigation = NavigationProp<RootPracticeStackParamList>;

  type ComponentsStackScreenNames = (typeof COMPONENTS_STACK)[keyof typeof COMPONENTS_STACK];
  type RootComponentsStackParamList = Record<ComponentsStackScreenNames, undefined>;
  type ComponentsStackNavigation = NavigationProp<RootComponentsStackParamList>;
}
