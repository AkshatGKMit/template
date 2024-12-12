import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '@constants';

import PracticeStackNavigator from './PracticeStackNavigator';
import ComponentsStackNavigator from './ComponentsStackNavigator';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const { COMPONENTS_TAB: COMPONENTS_ROUTE, PRACTICE_TAB: PRACTICE_ROUTE } = ROUTES.BOTTOM_TABS;

const Navigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name={PRACTICE_ROUTE}
      component={PracticeStackNavigator}
    />
    <Tab.Screen
      name={COMPONENTS_ROUTE}
      component={ComponentsStackNavigator}
    />
  </Tab.Navigator>
);

export default Navigator;
