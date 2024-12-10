import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import AppBarSmall from '@components/appBar/AppBarSmall';
import Home from '@screens/home/Home';
import InfinitePagination from '@screens/infinitePagination/InfinitePagination';
import Pagination from '@screens/pagination/Pagination';
import { Icons, ROUTES } from '@constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const {
  HOME: HOME_ROUTE,
  PAGINATION: PAGINATION_ROUTE,
  INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE,
} = ROUTES.STACK;

const Navigator = () => {
  const { goBack } = useNavigation<StackNavigation>();

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
        options={{
          header: () => (
            <AppBarSmall
              title={PAGINATION_ROUTE}
              leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={INFINITE_PAGINATION_ROUTE}
        component={InfinitePagination}
        options={{
          header: () => (
            <AppBarSmall
              title={INFINITE_PAGINATION_ROUTE}
              leading={{ icon: Icons.materialIcons.arrowBack, onPress: goBack }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
