import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InfinitePagination from '@screens/infinitePagination/InfinitePagination';
import Home from '@screens/home/Home';
import { Icons, ROUTES } from '@constants';
import AppBarSmall from '@components/appBar/AppBarSmall';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const { HOME: HOME_ROUTE, INFINITE_PAGINATION: INFINITE_PAGINATION_ROUTE } = ROUTES.STACK;

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
