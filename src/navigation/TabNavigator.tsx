import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '@constants';
import BottomTabBar from '@config/bottomTab/BottomTab';

import PracticeStackNavigator from './PracticeStackNavigator';
import ComponentsStackNavigator from './ComponentsStackNavigator';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const { COMPONENTS_TAB: COMPONENTS_ROUTE, PRACTICE_TAB: PRACTICE_ROUTE } = ROUTES.BOTTOM_TABS;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
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
};

export default TabNavigator;
