import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Favorites from '@screens/favorites/Favorites';
import Home from '@screens/home/Home';
import InfinitePagination from '@screens/infinitePagination/InfinitePagination';
import Pagination from '@screens/pagination/Pagination';
import Saga from '@screens/saga/Saga';
import { ROUTES } from '@constants';

const Stack = createNativeStackNavigator<RootPracticeStackParamList>();

const {
  PRACTICE_HOME: HOME_ROUTE,
  PAGINATION: PAGINATION_ROUTE,
  INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE,
  FAVORITES: FAVORITES_ROUTE,
  SAGA: SAGA_ROUTE,
} = ROUTES.PRACTICE_STACK;

const PracticeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_ROUTE}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PAGINATION_ROUTE}
        component={Pagination}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={INFINITE_PAGINATION_ROUTE}
        component={InfinitePagination}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={FAVORITES_ROUTE}
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SAGA_ROUTE}
        component={Saga}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStackNavigator;
