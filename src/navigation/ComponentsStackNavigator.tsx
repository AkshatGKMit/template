import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Components from '@screens/components/Components';
import { ROUTES } from '@constants';

const Stack = createNativeStackNavigator<RootComponentsStackParamList>();

const { COMPONENTS_HOME } = ROUTES.COMPONENTS_STACK;

const ComponentsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={COMPONENTS_HOME}
        component={Components}
      />
    </Stack.Navigator>
  );
};

export default ComponentsStackNavigator;
