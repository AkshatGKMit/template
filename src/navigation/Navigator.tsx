import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cache from '@screens/cache/Cache';
import Home from '@screens/home/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cache"
        component={Cache}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
